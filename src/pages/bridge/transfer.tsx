import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
export interface BridgeTransferPageProps {}

const BridgeTransferWrap = styled.div`
  color: #fff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-subtract;
  align-items: center;
  height: auto;
  min-height: calc(100vh - 400px);
`

export const TransferWrap = styled.div`
  width: 516px;
  backgroud: #fff;
  padding: 32px;
  border-radius: 8px;
`
export const BridgeTitle = styled.div`
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: rgba(1, 8, 30, 0.6);
`

const BridgeTransferPage: React.FunctionComponent<BridgeTransferPageProps> = () => {
  const { t } = useTranslation()

  return (
    <BridgeTransferWrap>
      <TransferWrap>
        <BridgeTitle>{t(`Asset`)}</BridgeTitle>
      </TransferWrap>
    </BridgeTransferWrap>
  )
}

export default BridgeTransferPage
