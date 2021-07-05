import React from 'react'
import styled from 'styled-components'
import { BridgeTitle } from '../../pages/bridge/transfer'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import { CenterRow } from '../Row/index'

export interface AmountInputProps {
  amount: number
  setAmount: any
}

const AmountInputWrap = styled.div`
  margin-top: 16px;
  width: 100%;
  .ant-input {
    background-color: #f5f5f6;
    height: 38px;
  }
`

const TextWrap = styled(CenterRow)`
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

const ErrorText = styled.span`
  font-family: URWDIN-Regular;
  color: #f00;
  font-size: 12px;
`

const AmountInput: React.FunctionComponent<AmountInputProps> = ({ amount, setAmount }) => {
  const { t } = useTranslation()

  const [error, setError] = React.useState<boolean>(false)

  const [errorInfo, setErrorInfo] = React.useState<string>('')

  const insufficientText = `Insufficient available balance`
  const minAmountText = 'The minimum exchange quantity is 10'

  const changeAmount = (e: any) => {
    const input = parseFloat(e.target.value)
    if (input < 10) {
      setError(() => true)
      setErrorInfo(() => minAmountText)
    } else {
      setError(() => false)
    }
    setAmount(e.target.value)
  }

  return (
    <AmountInputWrap>
      <TextWrap>
        <BridgeTitle>{t(`Amount`)}</BridgeTitle>
        {error ? <ErrorText> * {t(errorInfo)}</ErrorText> : null}
      </TextWrap>
      <Input
        value={amount}
        maxLength={8}
        type="number"
        onChange={changeAmount}
        style={{ background: '#F5F5F6' }}
        suffix={<SuffixText>USDT</SuffixText>}
      />
    </AmountInputWrap>
  )
}

export default AmountInput
