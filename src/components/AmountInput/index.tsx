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

  const errorFormatText = t(`Invalid number`)
  const insufficientText = t(`Insufficient available balance`)
  const minAmountText = t(`The minimum exchange quantity is`) + ' ' + new BN(pairInfo?.min ?? 0).toNumber().toString()
  const maxAmountText = t(`The maximum exchange quantity is`) + ' ' + new BN(pairInfo?.max ?? 0).toNumber().toString()
  const insufficienBridgeText = t(`Input amount is bigger than bridge available balance`)

  const updateAddressStatus = (status: boolean, text?: string) => {
    setCheckList((list: any) => {
      return { ...list, amount: status }
    })
    text && setErrorInfo(() => text)
  }

  const changeAmount = (e: any) => {
    const input = e.target.value.trim()
    const numberAmount = new BN(input).multipliedBy(Math.pow(10, currency.decimals)).toNumber()
    const inputAmount = new BN(input).multipliedBy(Math.pow(10, currency.decimals)).toString()
    const maxLimit = new BN(pairInfo?.max as any).toNumber() === 0 ? false : true

    // init true
    updateAddressStatus(true)

    if (!account) {
      // no check
      updateAddressStatus(true)
    } else if (input[0] === '.' || !input || numberAmount <= 0) {
      // invalid number format
      updateAddressStatus(false, errorFormatText)
    } else if (new BN(inputAmount).gte(available)) {
      // less than balance
      updateAddressStatus(false, insufficientText)
    } else if (new BN(inputAmount).gte(totalSupply) && pairInfo?.limitStatus) {
      // less than supply
      updateAddressStatus(false, insufficienBridgeText)
    } else if (pairInfo?.limitStatus && new BN(input).lt(new BN(pairInfo?.min as any))) {
      //BUG (min= amount - swapfee) check min
      updateAddressStatus(false, minAmountText)
    } else if (pairInfo?.limitStatus && maxLimit && new BN(input).gt(new BN(pairInfo?.max as any))) {
      // check max
      updateAddressStatus(false, maxAmountText)
    } else {
      updateAddressStatus(true)
    }
    setAmount(input)
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
