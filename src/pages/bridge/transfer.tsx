import React from 'react'
import styled from 'styled-components'
import { useTranslation, Trans } from 'react-i18next'
import { Input } from 'antd'
import SelectToken from '../../components/SelectToken/SelectToken'
import ChainBridge from '../../components/ChainBridge'
import AmountInput from '../../components/AmountInput'
import Row from '../../components/Row'
import { useWeb3React } from '@web3-react/core'
import TransferButton from '../../components/TransferButton'
import { ChainBridgeType } from './confirm'
import TransferLimit from '../../components/TransferLimit'
import { useDispatch } from 'react-redux'
import {
  useTokenList,
  useCurrentCurrency,
  useTokenSupporChain,
  usePariList,
  useCurrentPairId,
} from '../../state/bridge/hooks'
import { Currency, PairChainInfo } from '../../state/bridge/reducer'
import { updateCurrentCurrency, updateCurrentPairId } from '../../state/bridge/actions'
import { getApproveStatus, getNetworkInfo, wei2eth, getPairInfo } from '../../utils'
import { getErc20Contract } from '../../utils/contract'
import { updateBridgeLoading } from '../../state/application/actions'

export interface BridgeTransferPageProps {}

export interface TransferOrder {
  srcId: number
  distId: number
  amount: number
  fee: number
  from: string
  receiver: string
  timestamp: string
}

export const BridgeTransferWrap = styled.div`
  color: #fff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-subtract;
  align-items: center;
  height: auto;
  min-height: calc(100vh - 400px);
`

export const TransferWrap = styled.div`
  margin-top: 156px;
  background: #fff;
  width: 516px;
  backgroud: #fff;
  padding: 32px;
  border-radius: 8px;
  position: relative;
  background: #f2fffd;
`
export const BridgeTitle = styled.div`
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: rgba(1, 8, 30, 0.6);
`
const ReceiveText = styled.span`
  height: 14px;
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #00003a;
`
const ReceiveAmountText = styled(ReceiveText)`
  font-weight: bold;
`

export const ChainTag = styled.div`
  padding: 0 8px;
  background: rgba(49, 215, 160, 0.08);
  border-radius: 2px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`
export const ChainText = styled.span`
  padding-top: 2px;
  font-size: 12px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #31d7a0;
`

export const ReceiveAddressWrap = styled.div`
  margin-top: 17px;
  .ant-input {
    background: #f3f5f6;
    height: 48px;
  }
`

const NoticeText = styled.div`
  margin-top: 8px;
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #000132;
  line-height: 20px;
`

const BridgeTransferPage: React.FunctionComponent<BridgeTransferPageProps> = () => {
  const { t } = useTranslation()
  const { account, chainId, library } = useWeb3React()
  const [srcId, changeSrcId] = React.useState(0)
  const [distId, changeDistId] = React.useState(0)
  const [receiveAddress, setReceiveAddress] = React.useState<any>(account)
  const [amount, setAmount] = React.useState<number>(0)
  const [available, setAvailable] = React.useState<string>('0')
  const [approved, setApproved] = React.useState<boolean>(false)

  const currency = useCurrentCurrency()

  const { srcChainIds, distChainIds } = useTokenSupporChain()

  const [order, setOrder] = React.useState<TransferOrder>({
    srcId: 0,
    distId: 0,
    amount: 0,
    fee: 0,
    from: '',
    receiver: '',
    timestamp: '',
  })

  React.useEffect(() => {
    if (srcChainIds.length && srcId === 0) {
      changeSrcId(srcChainIds[0])
    }
    if (distChainIds.length && distId === 0) {
      changeSrcId(distChainIds[0])
    }
  }, [srcChainIds, distChainIds])

  React.useEffect(() => {
    setReceiveAddress(() => account)
  }, [account])

  const isSelectedNetwork = React.useMemo(() => {
    return chainId === srcId
  }, [chainId, srcId])

  const changeReceiveAddress = (e: any) => {
    setReceiveAddress(() => e.target.value)
  }

  const dispatch = useDispatch()

  const tokenList = useTokenList()
  const pairList = usePariList()

  // init the asset selected
  React.useEffect(() => {
    if (currency.symbol === '' && tokenList.length) {
      dispatch(updateCurrentCurrency({ currency: tokenList[0] }))
    }
  }, [tokenList])

  const currentPairId = useCurrentPairId()

  const selectedPairInfo = React.useMemo(() => {
    if (currentPairId !== -1) {
      return getPairInfo(currentPairId)
    }
  }, [currentPairId])

  // update selected pairId
  React.useEffect(() => {
    if (srcId && distId && currency.name) {
      for (let i = 0; i < pairList?.length; i++) {
        const chain = pairList[i]
        const srcChainInfo = chain.srcChainInfo
        const distChainInfo = chain.dstChainInfo
        if (
          srcChainInfo.currency === currency.symbol &&
          srcChainInfo.chainId === srcId &&
          distChainInfo.chainId === distId
        ) {
          dispatch(updateCurrentPairId(chain.id))
          break
        }
      }
    } else {
      dispatch(updateCurrentPairId(-1))
    }
  }, [srcId, distId, currency])

  const setSelectedCurrency = (currency: Currency) => {
    dispatch(updateCurrentCurrency({ currency: currency }))
  }

  React.useEffect(() => {
    if (isSelectedNetwork && account && currentPairId !== -1) {
      console.log('selectedPairInfo', selectedPairInfo)
      const selectedSrcChainInfo = selectedPairInfo?.srcChainInfo as PairChainInfo
      const contract = getErc20Contract(selectedSrcChainInfo.contract, library)
      // chain token
      if (selectedSrcChainInfo.tag === 0) {
        library.getBalance(account).then((res: any) => {
          setAvailable(() => res.toString())
        })
      } else {
        contract.methods
          .balanceOf(account)
          .call()
          .then((r: any) => {
            console.log(r)
            setAvailable(() => r)
          })
      }
    }
  }, [isSelectedNetwork, account, currentPairId])

  const amountText = () => {
    const srcChainInfo = getNetworkInfo(srcId as any)
    if (account) {
      if (isSelectedNetwork) {
        return (
          <>
            <ReceiveText style={{ marginLeft: '10px' }}>Available:</ReceiveText>
            <ReceiveAmountText>
              {t(`  ${wei2eth(available, selectedPairInfo?.srcChainInfo.decimals as any)} `)}
              {currency.symbol.toUpperCase()}
            </ReceiveAmountText>
          </>
        )
      }
      return (
        <>
          <ReceiveText style={{ marginLeft: '10px' }}>Available:</ReceiveText>
          <ReceiveText style={{ marginLeft: '10px' }}>
            {t(`Switch Network`)}
            {srcChainInfo.name}
          </ReceiveText>
        </>
      )
    }

    return (
      <>
        <ReceiveText>{t(`You will receive`)}</ReceiveText>
        <ReceiveAmountText>{t(` ≈ ${amount} ${currency.symbol.toUpperCase()}`)}</ReceiveAmountText>
      </>
    )
  }

  React.useEffect(() => {
    if (selectedPairInfo && account) {
      if (selectedPairInfo?.srcChainInfo.tag === 0) {
        setApproved(() => true)
      } else {
        const chain = getNetworkInfo(chainId as any)
        getApproveStatus(account, selectedPairInfo.srcChainInfo.contract, chain.bridgeCoreAddress, library).then(
          (allowance) => {
            setApproved(() => allowance)
          }
        )
      }
    } else {
      setApproved(() => false)
    }
  }, [selectedPairInfo, account, chainId])

  const applyApprove = async () => {
    if (selectedPairInfo) {
      const contract = getErc20Contract(selectedPairInfo?.srcChainInfo.contract, library)
      const network = getNetworkInfo(selectedPairInfo?.srcChainInfo.chainId)
      await contract.methods
        .approve(
          network.bridgeCoreAddress,
          '115792089237316195423570985008687907853269984665640564039457584007913129639935'
        )
        .send({ from: account })
        .once('sending', () => {
          dispatch(updateBridgeLoading({ visible: true, status: 0 }))
        })
        .once('confirmation', (confirmations: number) => {
          console.log(confirmations)
          dispatch(updateBridgeLoading({ visible: true, status: 1 }))
          setTimeout(() => {
            setApproved(() => true)
            dispatch(updateBridgeLoading({ visible: false, status: 0 }))
          }, 1200)
        })
        .on('error', () => {
          dispatch(updateBridgeLoading({ visible: false, status: 0 }))
        })
    }
  }

  const generateOrder = () => {
    setOrder({
      srcId: srcId,
      distId: distId,
      from: account as string,
      receiver: receiveAddress,
      fee: 0,
      amount: amount,
      timestamp: '',
    })

    const orderRaw = JSON.stringify(order)
    localStorage.setItem('PRESEND_ORDER', orderRaw)
  }

  return (
    <BridgeTransferWrap>
      <TransferWrap>
        <TransferLimit available={20} total={100} />
        <BridgeTitle>{t(`Asset`)}</BridgeTitle>
        <SelectToken list={tokenList} setCurrency={setSelectedCurrency} currency={currency} />
        <ChainBridge
          srcId={srcId}
          distId={distId}
          changeDistId={changeDistId}
          changeSrcId={changeSrcId}
          currency={currency}
          type={ChainBridgeType.OPERATE}
        />
        <AmountInput currency={currency} amount={amount} setAmount={setAmount} />
        <Row style={{ marginTop: '9px', justifyContent: 'flex-start' }}>
          {amountText()}
          <ChainTag>
            <ChainText>KRC20</ChainText>
          </ChainTag>
        </Row>
        <ReceiveAddressWrap>
          <BridgeTitle>{t(`Receiving address`)}</BridgeTitle>
          <Input value={receiveAddress} onChange={changeReceiveAddress} placeholder={t(`Destination address`)} />
          <NoticeText>
            {t(
              `If you have not add KuCoin Community Chain networkin your MetaMask yet，please click Add network and continue`
            )}
          </NoticeText>
        </ReceiveAddressWrap>
        <TransferButton approved={approved} applyApprove={applyApprove} />
      </TransferWrap>
    </BridgeTransferWrap>
  )
}

export default BridgeTransferPage
