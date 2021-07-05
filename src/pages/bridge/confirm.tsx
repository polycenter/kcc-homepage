import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ChainBridge from '../../components/ChainBridge'
import { BaseButton } from '../../components/TransferButton'
import ConfirmItem from '../../components/ConfirmItem'
import { TransferWrap } from './transfer'
import { useHistory } from 'react-router'
import { Tooltip } from 'antd'
import BridgeTitlePanel from '../../components/BridgeTitlePanel/index'

export enum ChainBridgeType {
  'DISPLAY',
  'OPERATE',
}
export interface BridgeTransferPageProps {}

const BridgeConfirmWrap = styled.div`
  color: #fff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  height: auto;
  min-height: calc(100vh - 400px);
`

const FeeAmmount = styled.span`
  padding-top: 2px;
  font-size: 14px;
  font-family: URWDIN-Medium, URWDIN;
  font-weight: 500;
  color: #31d7a0;
`

const MoreInfo = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 3px;
  cursor: pointer;
`

const Box = styled.div`
  margin-top: 40px;
`

const ButtonText = styled.span`
  font-size: 16px;
  font-family: URWDIN-Medium, URWDIN;
  font-weight: 500;
  color: #ffffff;
  line-height: 16px;
  height: 16px;
  padding-top: 2px;
  letter-spacing: 1px;
`

const Text = styled.div`
  color: #fff;
`

const BridgeTransferPage: React.FunctionComponent<BridgeTransferPageProps> = () => {
  const { t } = useTranslation()

  const history = useHistory()

  const back2transfer = () => {
    history.push('/bridge/transfer', { a: 1 })
  }

  return (
    <BridgeConfirmWrap>
      <TransferWrap>
        <BridgeTitlePanel title="Transfer confirmation" iconEvent={back2transfer} />
        <ChainBridge srcId={1} distId={1} type={ChainBridgeType.DISPLAY} />
        <Box>
          <ConfirmItem title="Amount" content="120USDT" />
          <ConfirmItem title="Amount received" content="110USDT" />
          <ConfirmItem title="Transfer fee">
            <FeeAmmount>10 USDT</FeeAmmount>
            <Tooltip title={<Text>text</Text>}>
              <MoreInfo src={require('../../assets/images/bridge/question.png').default} />
            </Tooltip>
          </ConfirmItem>
        </Box>
        <ConfirmItem title="Receiving address" content="0x99fef231313nkjj132131j4o12313214414423" />
        <BaseButton style={{ marginTop: '32px' }}>
          <ButtonText>{t(`Transfer`)}</ButtonText>
        </BaseButton>
      </TransferWrap>
    </BridgeConfirmWrap>
  )
}

export default BridgeTransferPage
