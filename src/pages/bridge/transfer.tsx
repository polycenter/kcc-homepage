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
import { Currency, PairChainInfo } from '../../state/bridge/reducer'
import { updateCurrentCurrency, updateCurrentPairId } from '../../state/bridge/actions'
import { checkAddress, getApproveStatus, getNetworkInfo, getPairInfo, web3Utils } from '../../utils'
import { getErc20Contract } from '../../utils/contract'
import { updateBridgeLoading } from '../../state/application/actions'
import { getNetWorkConnect } from '../../connectors'
import { useHistory } from 'react-router-dom'
import {
  useTokenList,
  useCurrentCurrency,
  useTokenSupporChain,
  usePariList,
  useCurrentPairId,
} from '../../state/bridge/hooks'

export enum ListType {
  'WHITE',
  'BLACK',
}

export interface BridgeTransferPageProps {}

export interface TransferOrder {
  pairId: number
  currency: Currency
  srcId: number
  distId: number
  amount: string
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
  senderWhite: false,
  senderBlack: false,
  receiverWhite: false,
  receiverBlack: false,
}

export type CheckListType = typeof statusList

const initOrder = {
  pairId: 0,
  srcId: 0,
  distId: 0,
  amount: '',
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
}

const BridgeTransferPage: React.FunctionComponent<BridgeTransferPageProps> = () => {
  const { t } = useTranslation()
  const { account, chainId, library } = useWeb3React()
  const [srcId, changeSrcId] = React.useState(0)
  const [distId, changeDistId] = React.useState(0)
  const [receiveAddress, setReceiveAddress] = React.useState<any>(account)
  const [amount, setAmount] = React.useState<string>('0')
  const [available, setAvailable] = React.useState<string>('0')
  const [availableLoading, setAvailableLoading] = React.useState<boolean>(false)

  // important state
  const [bridgeStatus, setBridgeStatus] = React.useState<boolean>(true)

  const currency = useCurrentCurrency()

  const history = useHistory()

  const [totalSupply, setTotalSupply] = React.useState<string>('0')

  const { srcChainIds, distChainIds } = useTokenSupporChain()

  // the status list of transfer asset rules
  const [checkList, setCheckList] = React.useState<typeof statusList>(statusList)

  const dispatch = useDispatch()
  const tokenList = useTokenList()
  const pairList = usePariList()
  const currentPairId = useCurrentPairId()

  const [order, setOrder] = React.useState<TransferOrder>(initOrder)

  const setSelectedCurrency = (currency: Currency) => {
    dispatch(updateCurrentCurrency({ currency: currency }))
  }

  const checkNetwork = (currentNetworkId: number, sendNetworkId: number) => {
    return currentNetworkId === sendNetworkId
  }

  // get selectedPairInfo
  const selectedPairInfo = React.useMemo(() => {
    if (currentPairId !== -1) {
      setCheckList((list) => {
        return {
          ...list,
          pair: currentPairId !== -1,
        }
      })
      return getPairInfo(currentPairId)
    }
  }, [currentPairId])

  /* React.useEffect(() => {
    if (!selectedPairInfo) return
    if (currentPairId !== -1) {
      //update pari status
      setCheckList((list) => {
        return {
          ...list,
          pair: true,
        }
      })

      // update currency
      const src = selectedPairInfo?.srcChainInfo
      const currency: Currency = {
        symbol: src.currency,
        name: src?.name,
        logoUrl: src.logoUrl,
        decimals: src.decimals,
      }
      setSelectedCurrency(currency)
      // update src chain
      changeSrcId(selectedPairInfo?.srcChainInfo.chainId)
      // update dist chain
      changeSrcId(selectedPairInfo?.dstChainInfo.chainId)
    } else {
      if (srcChainIds.length && srcId === 0) {
        changeSrcId(srcChainIds[0])
      }
    }
  }, [currentPairId, selectedPairInfo, srcChainIds, currency]) */

  /**
   * @description init select network
   */

  React.useEffect(() => {
    if (srcChainIds.length && srcId === 0 && currentPairId === -1) {
      changeSrcId(srcChainIds[0])
    }
  }, [srcChainIds, distChainIds, currentPairId])

  /**
   * @description update receiver address
   */
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

  /**
   * @description init the asset selected
   */
  React.useEffect(() => {
    if (currency.symbol === '' && tokenList.length) {
      dispatch(updateCurrentCurrency({ currency: tokenList[0] }))
    }
  }, [tokenList])

  /**
   * @descriptionSelect choose the user selected token last time
   */
  React.useEffect(() => {
    if (currency.symbol !== '') {
      setSelectedCurrency(currency)
    }
  }, [])

  const selectedNetworkInfo = React.useMemo(() => {
    return getNetworkInfo(selectedPairInfo?.srcChainInfo.chainId as any)
  }, [selectedPairInfo])

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
          return
        }
      }
      if (srcChainIds.length) {
        changeSrcId(srcChainIds[0])
      } else {
        changeSrcId(() => 0)
      }
    } else {
      dispatch(updateCurrentPairId(-1))
      if (srcChainIds.length) {
        changeSrcId(srcChainIds[0])
      } else {
        changeSrcId(() => 0)
      }
    }
  }, [srcId, distId, currency.name])

  /**
   * @description get available status
   */
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
          <ReceiveText style={{ marginLeft: '10px' }}>{t(`Available`)}:</ReceiveText>
          <ReceiveText style={{ marginLeft: '10px' }}>
            {t(`Switch`)}
            {` ${srcChainInfo?.fullName}`}
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

  /**
   * @description get approve status of pairInfo
   */

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

  const isTransferToSelf = React.useMemo(() => {
    if (account && receiveAddress) {
      return account === receiveAddress
    }
    return false
  }, [account, receiveAddress])

  /**
   * @description get status of address status
   * when receiver = sender,only check one,otherwise,check both address
   * when pair whiteListStatus is false, no check for whiteList
   */
  React.useEffect(() => {
    if (account && receiveAddress && checkList.address) {
      const cb = async () => {
        // check whiteList first
        if (selectedPairInfo?.whiteListStatus === false) {
          setCheckList((list) => {
            return { ...list, senderWhite: true, receiverWhite: true }
          })
        } else {
          const senderStatus = await checkAddress(account, ListType.WHITE)
          // when isTransferToSelf
          if (isTransferToSelf) {
            setCheckList((list) => {
              return { ...list, senderWhite: senderStatus, receiverWhite: senderStatus }
            })
          } else {
            const receiverStatus = await checkAddress(receiveAddress, ListType.WHITE)
            setCheckList((list) => {
              return { ...list, senderWhite: senderStatus, receiverWhite: receiverStatus }
            })
          }
        }

        // start to check blackList
        const senderStatus = await checkAddress(account, ListType.BLACK)
        // when isTransferToSelf
        if (isTransferToSelf) {
          setCheckList((list) => {
            return { ...list, senderBlack: !senderStatus, receiverBlack: !senderStatus }
          })
        } else {
          const receiverStatus = await checkAddress(receiveAddress, ListType.BLACK)
          setCheckList((list) => {
            return { ...list, senderBlack: !senderStatus, receiverBlack: !receiverStatus }
          })
        }
      }
      cb()
    }
  }, [account, receiveAddress, selectedPairInfo?.whiteListStatus])

  const generateOrder = () => {
    if (!selectedPairInfo) return
    const newOrder = {
      pairId: currentPairId,
      srcId: srcId,
      distId: distId,
      from: account as string,
      receiver: receiveAddress,
      fee: 0,
      amount: new BN(amount).multipliedBy(Math.pow(10, selectedPairInfo?.srcChainInfo.decimals)).toString(),
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

  // component did mount
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
          pairId={currentPairId}
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
            <ChainText>{selectedNetworkInfo?.standard}</ChainText>
          </ChainTag>
        </Row>
        <ReceiveAddressWrap>
          <TextWrap>
            <BridgeTitle>{t(`Receiving address`)}</BridgeTitle>
            {!checkList.address && account ? <ErrorText> * {t(`Invalid address`)}</ErrorText> : null}
          </TextWrap>
          <Input value={receiveAddress} onChange={changeReceiveAddress} placeholder={t(`Destination address`)} />
          {!isSelectedNetwork ? <NoticeText>{t(`Switch Correct Network`)}</NoticeText> : null}
        </ReceiveAddressWrap>
        <TransferButton
          pairId={currentPairId}
          checkList={checkList}
          applyApprove={applyApprove}
          generateOrder={generateOrder}
          amount={amount}
          bridgeStatus={bridgeStatus}
        />
      </TransferWrap>
    </BridgeTransferWrap>
  )
}

export default BridgeTransferPage
