import React from 'react'
import styled from 'styled-components'
import { BridgeTitle } from '../../pages/bridge/transfer'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'

export interface AmountInputProps {}

const AmountInputWrap = styled.div`
  margin-top: 16px;
  width: 100%;
  .ant-input {
    background-color: #f5f5f6;
    height: 38px;
  }
`
const SuffixText = styled.span`
  font-family: URWDIN-Regular;
  height: 16px;
  font-weight: 400;
  color: rgba(1, 8, 30, 0.38);
  font-size: 16px;
`

const AmountInput: React.FunctionComponent<AmountInputProps> = () => {
  const { t } = useTranslation()
  return (
    <AmountInputWrap>
      <BridgeTitle>{t(`Amount`)}</BridgeTitle>
      <Input style={{ background: 'rgba(1, 8, 30, 0.04)' }} suffix={<SuffixText>USDT</SuffixText>} />
    </AmountInputWrap>
  )
}

export default AmountInput
