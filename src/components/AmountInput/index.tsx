import React from 'react'
import styled from 'styled-components'
import { BridgeTitle, CheckListType } from '../../pages/bridge/transfer'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import { CenterRow } from '../Row/index'
import { Currency } from '../../state/bridge/reducer'
import BN from 'bignumber.js'
import { getPairInfo } from '../../utils/index'
import { useWeb3React } from '@web3-react/core'

export interface AmountInputProps {
  amount: string
  setAmount: any
  currency: Currency
  totalSupply: string
  checkList: CheckListType
  setCheckList: any
  available: string
  pairId: number
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

const AmountInput: React.FunctionComponent<AmountInputProps> = ({
  currency,
  amount,
  setAmount,
  checkList,
  setCheckList,
  totalSupply,
  available,
  pairId,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [errorInfo, setErrorInfo] = React.useState<string>('Invalid number')

  const pairInfo = getPairInfo(pairId)

  const errorFormatText = `Invalid number`
  const insufficientText = `Insufficient available balance`
  const minAmountText = `The minimum exchange quantity is ${new BN(pairInfo?.min ?? 0)
    .div(Math.pow(10, currency.decimals))
    .toString()}`
  const maxAmountText = `The maximum exchange quantity is ${new BN(pairInfo?.min ?? 0)
    .div(Math.pow(10, currency.decimals))
    .toString()}`
  const insufficienBridgeText = `Input amount is bigger than bridge available balance`

  const changeAmount = (e: any) => {
    const input = e.target.value.trim()
    const inputAmount = new BN(input).multipliedBy(Math.pow(10, currency.decimals)).toNumber()

    const maxLimit = pairInfo?.max === '0' ? true : false

    if (!account) {
      // no check
      setCheckList((list: any) => {
        return { ...list, amount: true }
      })
    } else if (input[0] === '.' || !input || inputAmount <= 0) {
      // invalid number format
      setCheckList((list: any) => {
        return { ...list, amount: false }
      })
      setErrorInfo(() => errorFormatText)
    } else if (new BN(inputAmount).gte(available)) {
      // less than balance
      setCheckList((list: any) => {
        return { ...list, amount: false }
      })
      setErrorInfo(() => insufficientText)
    } else if (new BN(inputAmount).gte(totalSupply) && pairInfo?.limitStatus) {
      // less than supply
      setCheckList((list: any) => {
        return { ...list, amount: false }
      })
      setErrorInfo(() => insufficienBridgeText)
    } else if (new BN(inputAmount).lt(new BN(pairInfo?.min as any)) && pairInfo?.limitStatus) {
      // check min
      setCheckList((list: any) => {
        return { ...list, amount: false }
      })
      setErrorInfo(() => minAmountText)
    } else if (maxLimit && new BN(inputAmount).gt(new BN(pairInfo?.max as any)) && pairInfo?.limitStatus) {
      // check min
      setCheckList((list: any) => {
        return { ...list, amount: false }
      })
      setErrorInfo(() => maxAmountText)
    } else {
      setCheckList((list: any) => {
        return { ...list, amount: true }
      })
    }
    setAmount(e.target.value)
  }

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
