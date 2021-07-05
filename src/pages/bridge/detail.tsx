import React from 'react'
import styled from 'styled-components'
import { TransferWrap } from './transfer'
import BridgeTitlePanel from '../../components/BridgeTitlePanel/index'
import { useHistory } from 'react-router'
import { Progress } from 'antd'
import { CenterRow } from '../../components/Row/index'
import { useTranslation } from 'react-i18next'

export interface BridgeDetailPageProps {}

const BridgeDetaiPageWrap = styled.div`
  color: #fff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  height: auto;
  min-height: calc(100vh - 400px);
`

const OrderDetailWrap = styled(TransferWrap)`
  // background: linear-gradient(180deg, #f5fffc 0%, #feffff 100%);
  background: #fff;
  height: 520px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`

const StepIcon = styled.img`
  width: 24px;
  height: 24px;
`

const Icon1 = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 0px;
  top: -24px;
  z-index: 4;
  background: #fff;
`

const Icon2 = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 0px;
  top: 112px;
  z-index: 4;
  background: #fff;
`
const Icon3 = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 0px;
  top: 250px;
  z-index: 4;
  background: #fff;
`

const StepsWrap = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 250px;
  background: #fff;
  position: relative;
  z-index: 1;
`

const Line = styled.div`
  position: absolute;
  z-index: 3;
  background: rgba(1, 8, 30, 0.38);
  width: 1px;
  height: 250px;
  top: 0;
  left: 12px;
`

const NetworkWrap = styled.div`
  height: 120px;
  padding-left: 40px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
`

const NetworkIcon = styled.img`
  width: 24px;
  height: 24px;
  background: #d8d8d8;
`

const NetworkName = styled.span`
  margin-left: 5px;
  padding-top: 2px;
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #000426;
`
const StatusText = styled.span`
  font-size: 14px;
  padding-top: 2px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #01081e;
`

const LinkText = styled(StatusText)`
  cursor: pointer;
  font-weight: 400;
  &:hover {
    font-weight: 500;
    text-decoration: underline;
  }
`
const LinkIcon = styled.img`
  width: 15px;
  height: 15px;
`

const BetweenBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const SuccessIconWrap = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 5px;
`
const SuccessIcon = require('../../assets/images/bridge/success-process.png').default
const ProcessingIcon = require('../../assets/images/bridge/in-process.png').default

const BridgeDetailPage: React.FunctionComponent<BridgeDetailPageProps> = () => {
  const { t } = useTranslation()

  const icon = (current: number, nth: number) => {
    return <StepIcon src={nth < current ? SuccessIcon : ProcessingIcon} />
  }
  const [current, setCurrent] = React.useState<number>(2)
  const [percent1, setPercent1] = React.useState<number>(50)
  const [percent2, setPercent2] = React.useState<number>(0)
  const history = useHistory()

  const nav2list = () => {
    history.push('/bridge/list')
  }

  return (
    <BridgeDetaiPageWrap>
      <OrderDetailWrap>
        <BridgeTitlePanel title="Details" iconEvent={nav2list} />
        <StepsWrap>
          <Line />
          <Icon1>{icon(current, 0)}</Icon1>
          <Icon2>{icon(current, 1)}</Icon2>
          <Icon3>{icon(current, 2)}</Icon3>
          <NetworkWrap>
            <BetweenBox>
              <CenterRow>
                <NetworkIcon />
                <NetworkName>Ethereum Network</NetworkName>
              </CenterRow>
              <StatusText style={{ color: current > 0 ? '#31D7A0' : '#01081E' }}>
                {current > 0 ? t('Completed') : t(`Process`)}
              </StatusText>
            </BetweenBox>
            <Progress
              percent={percent1}
              type="line"
              strokeWidth={4}
              style={{ margin: '8px 0' }}
              status="active"
              strokeColor={{
                '0%': '#00FFA8',
                '100%': '#31D7A0',
              }}
            />
            <CenterRow>
              <LinkText>{t(`View hash`)}</LinkText>
              <LinkIcon src={require('../../assets/images/bridge/link.svg').default} />
            </CenterRow>
          </NetworkWrap>
          <NetworkWrap style={{ marginTop: '20px' }}>
            <BetweenBox>
              <CenterRow>
                <NetworkIcon />
                <NetworkName>Ethereum Network</NetworkName>
              </CenterRow>
              <StatusText style={{ color: current > 1 ? '#31D7A0' : '#01081E' }}>
                {current > 1 ? t('Completed') : t(`Process`)}
              </StatusText>
            </BetweenBox>
            <Progress
              percent={percent2}
              type="line"
              strokeWidth={4}
              style={{ margin: '8px 0' }}
              status="active"
              strokeColor={{
                '0%': '#00FFA8',
                '100%': '#31D7A0',
              }}
            />
            <CenterRow>
              <LinkText>{t(`View hash`)}</LinkText>
              <LinkIcon src={require('../../assets/images/bridge/link.svg').default} />
            </CenterRow>
          </NetworkWrap>
          <CenterRow style={{ marginTop: '20px' }}>
            {current === 2 ? (
              <>
                <SuccessIconWrap src={require('../../assets/images/bridge/selected@2x.png').default} />
                <StatusText style={{ color: '#31D7A0' }}>{t(`Success`)}!</StatusText>
              </>
            ) : (
              <StatusText>{t(`Processing`)}...</StatusText>
            )}
          </CenterRow>
        </StepsWrap>
      </OrderDetailWrap>
    </BridgeDetaiPageWrap>
  )
}

export default BridgeDetailPage
