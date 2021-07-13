import React from 'react'
import styled from 'styled-components'
import { TransferWrap } from './transfer'
import BridgeTitlePanel from '../../components/BridgeTitlePanel/index'
import { useHistory } from 'react-router'
import { Progress } from 'antd'
import { CenterRow } from '../../components/Row/index'
import { useTranslation } from 'react-i18next'
import { useQuery } from '../../hooks/useQuery'
import { Base64 } from '../../utils/base64'
import { History } from './list'
import { getNetworkInfo, getPairInfo } from '../../utils/index'

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
  border-radius: 50%;
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
  white-space: nowrap;
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

const BridgeDetailPage: React.FunctionComponent<BridgeDetailPageProps> = (props) => {
  const { t } = useTranslation()

  const icon = (current: number, nth: number) => {
    return <StepIcon src={nth < current ? SuccessIcon : ProcessingIcon} />
  }
  const [current, setCurrent] = React.useState<number>(0)
  const [percent1, setPercent1] = React.useState<number>(0)
  const [statusText1, setStatusText1] = React.useState<string>('')
  const [percent2, setPercent2] = React.useState<number>(0)
  const [statusText2, setStatusText2] = React.useState<string>('')

  const history = useHistory()

  const query = useQuery()

  const order: History = React.useMemo(() => {
    try {
      return JSON.parse(Base64.decode(query.get('o')))
    } catch {
      console.log('parse url error')
      history.push('/bridge/list')
    }
  }, [query])

  React.useEffect(() => {
    // 1.first check success status
    /*   if (order.status === 'SUCCESS') {
      setPercent1(() => 100)
      setStatusText1(() => 'Completed')
       setPercent2(() => 100)
      setCurrent(() => 3)
    } */

    switch (order.status) {
      case 'CREATED':
        setPercent1(() => 100)
        setPercent2(() => 1)
        setCurrent(() => 0)
        break
      case 'CANCELLED':
        setPercent1(() => 100)
        setPercent2(() => 0)
        setCurrent(() => 1)
        break
      case 'VERIFIED':
        setPercent1(() => 100)
        setPercent2(() => 0)
        setCurrent(() => 1)
        break

      case 'PROCESSING':
        setPercent1(() => 100)
        setPercent2(() => 50)
        setCurrent(() => 2)
        break
      case 'CONFIRMED':
      case 'SUCCESS':
        setPercent1(() => 100)
        setPercent2(() => 100)
        setCurrent(() => 3)
    }
  }, [order])

  const network = React.useMemo(() => {
    const selectedPairInfo = getPairInfo(order.pairId as any)
    return {
      src: getNetworkInfo(selectedPairInfo?.srcChainInfo.chainId as any),
      dist: getNetworkInfo(selectedPairInfo?.dstChainInfo.chainId as any),
    }
  }, [order])

  const nav2list = () => {
    history.push('/bridge/list')
  }

  const nav2Scan = (url: string) => {
    window.open(url, '_blank')
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
                <NetworkIcon src={network.src.logo} />
                <NetworkName>{network.src.fullName}</NetworkName>
              </CenterRow>
              <StatusText style={{ color: current > 0 ? '#31D7A0' : '#01081E' }}>
                {current > 0 ? t('Completed') : t(`Pending`) + '...'}
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
              <LinkText onClick={nav2Scan.bind(null, `${network.src.browser}/tx/${order.srcTxHash}`)}>
                {t(`View hash`)}
              </LinkText>
              <LinkIcon src={require('../../assets/images/bridge/link.svg').default} />
            </CenterRow>
          </NetworkWrap>
          <NetworkWrap style={{ marginTop: '20px' }}>
            <BetweenBox>
              <CenterRow>
                <NetworkIcon src={network.dist.logo} />
                <NetworkName>{network.dist.fullName}</NetworkName>
              </CenterRow>
              <StatusText style={{ color: current > 1 ? '#31D7A0' : '#01081E' }}>
                {current > 1 ? t('Completed') : t(`Process`) + '...'}
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
              <LinkText onClick={nav2Scan.bind(null, `${network.dist.browser}/tx/${order.dstTxHash}`)}>
                {t(`View hash`)}
              </LinkText>
              <LinkIcon src={require('../../assets/images/bridge/link.svg').default} />
            </CenterRow>
          </NetworkWrap>
          <CenterRow style={{ marginTop: '20px' }}>
            {order.status === 'SUCCESS' ? (
              <>
                <SuccessIconWrap src={require('../../assets/images/bridge/selected@2x.png').default} />
                <StatusText style={{ color: '#31D7A0' }}>{t(`Success`)}!</StatusText>
              </>
            ) : (
              <StatusText>{t(`${order.status}`)}</StatusText>
            )}
          </CenterRow>
        </StepsWrap>
      </OrderDetailWrap>
    </BridgeDetaiPageWrap>
  )
}

export default BridgeDetailPage
