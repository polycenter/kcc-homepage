import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import SelectToken from '../../components/SelectToken/SelectToken'
import ChainBridge from '../../components/ChainBridge'
import AmountInput, { ErrorText, TextWrap } from '../../components/AmountInput'
import Row from '../../components/Row'
import { useWeb3React } from '@web3-react/core'
import TransferButton from '../../components/TransferButton'
import { ChainBridgeType } from './confirm'
import TransferLimit from '../../components/TransferLimit'
import { useDispatch } from 'react-redux'
import BN from 'bignumber.js'
import { LoadingOutlined } from '@ant-design/icons'
import {
  useTokenList,
  useCurrentCurrency,
  useTokenSupporChain,
  usePariList,
  useCurrentPairId,
} from '../../state/bridge/hooks'
import { Currency, PairChainInfo } from '../../state/bridge/reducer'
import { updateCurrentCurrency, updateCurrentPairId } from '../../state/bridge/actions'
import { getApproveStatus, getNetworkInfo, getPairInfo } from '../../utils'
import { getErc20Contract } from '../../utils/contract'
import { updateBridgeLoading } from '../../state/application/actions'
import { getNetWorkConnect } from '../../connectors'
import { web3Utils } from '../../utils/index'
import { useHistory } from 'react-router-dom'
import { network } from '../../connectors/index'

export interface BridgeTransferPageProps {}

export interface TransferOrder {
  pairId: number
  currency: Currency
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

const statusList = {
  totolSupply: true,
  pair: false,
  amount: false,
  address: false,
  approve: false,
  network: false,
}

export type CheckListType = typeof statusList

const BridgeTransferPage: React.FunctionComponent<BridgeTransferPageProps> = () => {
  const { t } = useTranslation()
  const { account, chainId, library } = useWeb3React()
  const [srcId, changeSrcId] = React.useState(0)
  const [distId, changeDistId] = React.useState(0)
  const [receiveAddress, setReceiveAddress] = React.useState<any>(account)
  const [amount, setAmount] = React.useState<string>('0')
  const [available, setAvailable] = React.useState<string>('0')
  const [availableLoading, setAvailableLoading] = React.useState<boolean>(false)
  const currency = useCurrentCurrency()

  const history = useHistory()

  const [totalSupply, setTotalSupply] = React.useState<string>('0')

  const { srcChainIds, distChainIds } = useTokenSupporChain()

  const [checkList, setCheckList] = React.useState<typeof statusList>(statusList)

  const dispatch = useDispatch()
  const tokenList = useTokenList()
  const pairList = usePariList()

  const [order, setOrder] = React.useState<TransferOrder>({
    pairId: 0,
    srcId: 0,
    distId: 0,
    amount: 0,
    fee: 0,
    from: '',
    receiver: '',
    timestamp: '',
    currency: {
      name: '',
      symbol: '',
      logoUrl: '',
      decimals: 0,
    },
  })

  const checkNetwork = (currentNetworkId: number, sendNetworkId: number) => {
    return currentNetworkId === sendNetworkId
  }

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
    if (account) {
      setCheckList((list) => {
        return {
          ...list,
          address: true,
        }
      })
    }
  }, [account])

  const isSelectedNetwork = React.useMemo(() => {
    return chainId === srcId
  }, [chainId, srcId])

  const changeReceiveAddress = (e: any) => {
    const address = e.target.value.trim()
    const isAddress = web3Utils.isAddress(address)
    console.log(isAddress)
    setCheckList((list) => {
      return {
        ...list,
        address: isAddress,
      }
    })
    setReceiveAddress(() => address)
  }

  // init the asset selected
  React.useEffect(() => {
    if (currency.symbol === '' && tokenList.length) {
      dispatch(updateCurrentCurrency({ currency: tokenList[0] }))
    }
  }, [tokenList])

  const currentPairId = useCurrentPairId()

  const selectedPairInfo = React.useMemo(() => {
    console.log(` selectedPairInfo is chaing`, getPairInfo(currentPairId))
    if (currentPairId !== -1) {
      setCheckList((list) => {
        return {
          ...list,
          pair: true,
        }
      })
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
  }, [srcId, distId, currency.name])

  const setSelectedCurrency = (currency: Currency) => {
    dispatch(updateCurrentCurrency({ currency: currency }))
  }

  React.useEffect(() => {
    if (chainId && isSelectedNetwork && account && currentPairId && currency.symbol && currentPairId !== -1) {
      const selectedSrcChainInfo = selectedPairInfo?.srcChainInfo as PairChainInfo
      const contract = getErc20Contract(selectedSrcChainInfo.contract, library)
      setAvailableLoading(() => true)
      // chain token
      try {
        if (selectedSrcChainInfo.tag === 0) {
          library.getBalance(account).then((res: any) => {
            setAvailable(() => res.toString())
            setAvailableLoading(() => false)
          })
        } else {
          contract.methods
            .balanceOf(account)
            .call()
            .then((r: any) => {
              setAvailable(() => r.toString())
              setAvailableLoading(() => false)
            })
        }
      } catch {
        setAvailableLoading(() => false)
      }
    }
  }, [isSelectedNetwork, account, chainId, selectedPairInfo?.id, currency, currentPairId, distId, srcId])

  const amountText = () => {
    const srcChainInfo = getNetworkInfo(srcId as any)
    if (account) {
      if (isSelectedNetwork) {
        return (
          <>
            <ReceiveText style={{ marginLeft: '10px' }}>{t(`Available`)}:</ReceiveText>
            {!availableLoading ? (
              <ReceiveAmountText>
                {new BN(available).div(Math.pow(10, selectedPairInfo?.srcChainInfo.decimals as any)).toString()}
                {currency.symbol.toUpperCase()}
              </ReceiveAmountText>
            ) : (
              <LoadingOutlined
                style={{ margin: '4px 10px 0px 10px', width: '12px', height: '12px', color: '#000', fontSize: '10px' }}
              />
            )}
          </>
        )
      }

      return (
        <>
          <ReceiveText style={{ marginLeft: '10px' }}>Available:</ReceiveText>
          <ReceiveText style={{ marginLeft: '10px' }}>
            {t(`Switch Network`)}
            {` ${srcChainInfo.name}`}
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
        setCheckList((list) => {
          return { ...list, approve: true }
        })
      } else {
        const chain = getNetworkInfo(chainId as any)
        getApproveStatus(account, selectedPairInfo.srcChainInfo.contract, chain.bridgeCoreAddress, library).then(
          (allowance) => {
            setCheckList((list) => {
              return { ...list, approve: Boolean(allowance) }
            })
          }
        )
      }
    } else {
      setCheckList((list) => {
        return { ...list, approve: false }
      })
    }
  }, [selectedPairInfo, account])

  const generateOrder = () => {
    if (!selectedPairInfo) return
    const newOrder = {
      pairId: currentPairId,
      srcId: srcId,
      distId: distId,
      from: account as string,
      receiver: receiveAddress,
      fee: 0,
      amount: new BN(amount).multipliedBy(Math.pow(10, selectedPairInfo?.srcChainInfo.decimals)).toNumber(),
      timestamp: '',
      currency: currency,
    }
    setOrder(() => {
      return newOrder
    })
    const orderRaw = JSON.stringify(newOrder)
    localStorage.setItem('PRESEND_ORDER', orderRaw)
  }

  const generateOrderAndConfirm = () => {
    generateOrder()
    history.push('/bridge/confirm')
  }

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
            setCheckList((list) => {
              return { ...list, approve: true }
            })
            dispatch(updateBridgeLoading({ visible: false, status: 0 }))
            generateOrderAndConfirm
          }, 2000)
        })
        .on('error', () => {
          dispatch(updateBridgeLoading({ visible: false, status: 0 }))
        })
    }
  }

  React.useEffect(() => {
    const callback = async () => {
      if (selectedPairInfo?.status) {
        const chain = getNetworkInfo(selectedPairInfo.dstChainInfo.chainId)
        const connector = getNetWorkConnect(selectedPairInfo.dstChainInfo.chainId)
        const contract = getErc20Contract(selectedPairInfo.dstChainInfo.contract, connector)
        // const supply = await contract.methods.totalSupply().call()
        const supply = await contract.methods.balanceOf(chain.bridgeCoreAddress).call()
        console.log('supply', supply)
        return supply
      }
    }
    if (selectedPairInfo?.limitStatus) {
      callback().then((res) => {
        setTotalSupply(() => new BN(res).toString())
      })
    } else {
      setTotalSupply(() => '0')
    }
  }, [selectedPairInfo?.limitStatus])

  // componentdidmount
  React.useEffect(() => {
    const result = checkNetwork(chainId as number, selectedPairInfo?.srcChainInfo.chainId as number)
    setCheckList((list) => {
      return {
        ...list,
        network: result,
      }
    })
  }, [chainId, selectedPairInfo?.srcChainInfo.chainId])

  return (
    <BridgeTransferWrap>
      <TransferWrap>
        <TransferLimit
          style={{ opacity: selectedPairInfo?.limitStatus ? 1 : 0 }}
          currency={currency}
          available={totalSupply}
        />
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
        <AmountInput
          currency={currency}
          amount={amount}
          setAmount={setAmount}
          totalSupply={totalSupply}
          checkList={checkList}
          available={available}
          setCheckList={setCheckList}
          pairId={currentPairId}
        />
        <Row style={{ marginTop: '9px', justifyContent: 'flex-start' }}>
          {amountText()}
          <ChainTag>
            <ChainText>KRC20</ChainText>
          </ChainTag>
        </Row>
        <ReceiveAddressWrap>
          <TextWrap>
            <BridgeTitle>{t(`Receiving address`)}</BridgeTitle>
            {!checkList.address && account ? <ErrorText> * {t(`Invalid address`)}</ErrorText> : null}
          </TextWrap>
          <Input value={receiveAddress} onChange={changeReceiveAddress} placeholder={t(`Destination address`)} />
          <NoticeText>
            {t(`If you have not add KCC network in your MetaMask yet，please click Add network and continue`)}
          </NoticeText>
        </ReceiveAddressWrap>
        <TransferButton
          pairId={currentPairId}
          checkList={checkList}
          applyApprove={applyApprove}
          generateOrder={generateOrder}
          amount={amount}
        />
      </TransferWrap>
    </BridgeTransferWrap>
  )
}

export default BridgeTransferPage
