import React from 'react'
import styled from 'styled-components'
import { BridgeTitle, CheckListType } from '../../pages/bridge/transfer'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import { CenterRow } from '../Row/index'
import { Currency } from '../../state/bridge/reducer'
import BN from 'bignumber.js'
import { getPairInfo, getDecimals } from '../../utils/index'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

export interface AmountInputProps {
  amount: string
  setAmount: any
  currency: Currency
  totalSupply: string
  checkList: CheckListType
  setCheckList: any
  available: string
  pairId: number
  swapFee: string
}

const AmountInputWrap = styled.div`
  margin-top: 16px;
  width: 100%;
  .ant-input {
    background-color: #f5f5f6;
    height: 38px;
  }
`

export const TextWrap = styled(CenterRow)`
  align-items: center;
  justify-content: space-between;
`

const SuffixText = styled.span`
  font-family: URWDIN-Regular;
  height: 16px;
  font-weight: 400;
  color: rgba(1, 8, 30, 0.38);
  font-size: 16px;
`

export const ErrorText = styled.span`
  font-family: URWDIN-Regular;
  color: #f00;
  font-size: 12px;
`
export enum TransferType {
  'NATIVE',
  'TOKEN',
}

const AmountInput: React.FunctionComponent<AmountInputProps> = ({
  currency,
  amount,
  setAmount,
  checkList,
  setCheckList,
  totalSupply,
  available,
  pairId,
  swapFee,
}) => {
  const { t } = useTranslation()
  const { account, chainId, library } = useWeb3React()
  const [errorInfo, setErrorInfo] = React.useState<string>('Invalid number')

  const pairInfo = getPairInfo(pairId)

  /* get info from chain */
  const maxLimit = new BN(pairInfo?.max as any).toNumber() === 0 ? false : true

  // the the min decimals between two chains
  const decimalsLimit = React.useMemo(() => {
    if (!pairInfo) return
    return pairInfo?.srcChainInfo.decimals > pairInfo?.dstChainInfo.decimals
      ? pairInfo?.dstChainInfo.decimals
      : pairInfo?.srcChainInfo.decimals
  }, [pairId, pairInfo])

  const errorFormatText = t(`Invalid number`)
  const decimalErrorText = t(`The decimal point cannot exceed `)
  const insufficientText = t(`Insufficient available balance`)
  const insufficientFeeText = t(`Insufficient transfer fee`)
  const minAmountText = t(`The minimum exchange quantity is`) + ' ' + new BN(pairInfo?.min ?? 0).toNumber().toString()
  const maxAmountText = t(`The maximum exchange quantity is`) + ' ' + new BN(pairInfo?.max ?? 0).toNumber().toString()
  const insufficienBridgeText = t(`Input amount is bigger than bridge available balance`)

  const updateAddressStatus = (status: boolean, text?: string) => {
    setCheckList((list: any) => {
      return { ...list, amount: status }
    })
    text && setErrorInfo(() => text)
  }

  const checkAmount = async (inputAmount: string, input: string) => {
    if (!pairInfo || !account) return

    console.log(inputAmount, swapFee)

    /*  if (new BN(inputAmount).lte(swapFee)) {
      updateAddressStatus(false, insufficientFeeText)
      return false
    } */
    // chekc send  type first,native or token
    if (pairInfo.srcChainInfo.tag === 0) {
      inputAmount = new BN(inputAmount).plus(swapFee).toString()
    } else {
      // check transfer fee    ====>  token check
      const web3 = new Web3(library.provider)
      const balance = await web3.eth.getBalance(account)
      console.log(balance, swapFee)
      if (swapFee && new BN(swapFee).gt(balance)) {
        updateAddressStatus(false, insufficientFeeText)
        return
      }
    }
    // debugger

    if (new BN(inputAmount).gt(available)) {
      //BUG  need to check is token or native
      // less than balance
      updateAddressStatus(false, insufficientText)
    } else if (pairInfo?.limitStatus && new BN(inputAmount).gte(totalSupply)) {
      // less than supply
      updateAddressStatus(false, insufficienBridgeText)
    } else if (new BN(input).lt(new BN(pairInfo?.min as any))) {
      //BUG (min= amount - swapfee)
      // check min
      updateAddressStatus(false, minAmountText)
    } else if (maxLimit && new BN(input).gt(new BN(pairInfo?.max as any))) {
      //BUG (min = amount - swapfee)
      // check max
      updateAddressStatus(false, maxAmountText)
    } else {
      updateAddressStatus(true)
    }
  }

  const changeAmount = (e: any) => {
    if (!pairInfo?.srcChainInfo) return

    const input = typeof e === 'string' ? e : e.target.value.trim()
    const numberAmount = new BN(input).multipliedBy(Math.pow(10, pairInfo?.srcChainInfo.decimals)).toNumber()
    const inputAmount = new BN(input).multipliedBy(Math.pow(10, pairInfo?.srcChainInfo.decimals)).toString()

    const decimal = getDecimals(input)

    // init true
    updateAddressStatus(true)

    if (!account) {
      // no check
      updateAddressStatus(true)
    } else if (input === '' || input[0] === '.' || numberAmount <= 0) {
      // invalid number format
      updateAddressStatus(false, errorFormatText)
    } else if (decimalsLimit && decimal > decimalsLimit) {
      // invalid decimal
      updateAddressStatus(false, decimalErrorText + decimalsLimit)
    } else {
      checkAmount(inputAmount, input)
    }

    setAmount(() => input)
  }

  React.useEffect(() => {
    changeAmount(amount)
  }, [chainId, pairInfo])

  return (
    <AmountInputWrap>
      <TextWrap>
        <BridgeTitle>{t(`Amount`)}</BridgeTitle>
        {!checkList.amount && account ? <ErrorText> * {t(`${errorInfo}`)}</ErrorText> : null}
      </TextWrap>
      <Input
        value={amount}
        maxLength={8}
        type="number"
        onChange={changeAmount}
        style={{ background: '#F5F5F6' }}
        suffix={<SuffixText>{currency.symbol.toUpperCase()}</SuffixText>}
      />
    </AmountInputWrap>
  )
}

export default React.memo(AmountInput)
