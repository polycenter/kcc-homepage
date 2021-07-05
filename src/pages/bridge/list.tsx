import React from 'react'
import styled from 'styled-components'
import BridgeTitlePanel from '../../components/BridgeTitlePanel'
import { TransferWrap } from './transfer'
import { useHistory } from 'react-router-dom'
import { CenterRow } from '../../components/Row'
import { RightOutlined } from '@ant-design/icons'

export interface BridgeListPageProps {}

const BridgeListWrap = styled.div`
  color: #fff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  height: auto;
  min-height: calc(100vh - 400px);
`

const HistoryWrap = styled(TransferWrap)`
  background: linear-gradient(180deg, #f5fffc 0%, #feffff 100%);
  height: 520px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`

const HistoryListWrap = styled.div`
  width: 100%;
  margin-bottom: 0px;
  margin-top: 24px;
  overflow: scroll;
`

const Order = styled.div`
  height: 110px;
  padding: 17px 10px 0px 5px;

  & + & {
    border-top: 1px solid rgba(1, 8, 30, 0.08);
  }

  &:hover {
    cursor: pointer;
    background: rgba(49, 215, 160, 0.08);
  }
`

const Number = styled.span`
  font-size: 20px;
  font-family: URWDIN-Bold, URWDIN;
  font-style: italic;
  font-weight: normal;
  color: rgba(0, 6, 33, 0.87);
  margin-right: 12px;
  padding-top: 2px;
`

const NetworkWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`

const NetworkName = styled.span`
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #000426;
  width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const NetworkIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`
const NetWorkDirectionIcon = styled.img`
  width: 16px;
  height: 7px;
  margin: 8px;
`
const Title = styled.div`
  font-size: 12px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: rgba(0, 0, 58, 0.6);
`

const Content = styled.div`
  font-size: 12px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #000132;
`
const Fee = styled.div`
  font-size: 12px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #31d7a0;
`

const EmptyWrap = styled.div`
  background: linear-gradient(180deg, #f5fffc 0%, #feffff 100%);
  width: 100%;
  height: 480px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const EmptyIcon = styled.img`
  width: 84px;
  height: 71px;
`

const EmptyText = styled.div`
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: rgba(1, 8, 30, 0.6);
  margin-top: 18px;
`

const OrderDetailWrap = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const Left = styled.div`
  width: 50%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const OrderDetaiItem = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
`

const Right = styled.div`
  justify-self: flex-end;
  display: flex;
  flex-flow: column nowrap;
  ${OrderDetaiItem} {
    text-align: right;
    align-items: flex-end;
  }
`

const StatusRow = styled.div`
  display: flex;
  width: auto;
  align-items: center;
`

const BridgeListPage: React.FunctionComponent<BridgeListPageProps> = () => {
  const [historyList, setHistoryList] = React.useState<any[]>([
    {
      id: 1,
    },
  ])

  const history = useHistory()

  const nav2transfer = () => {
    history.push('/bridge/transfer')
  }

  const DirectionIcon = require('../../assets/images/bridge/to.png').default

  return (
    <BridgeListWrap>
      <HistoryWrap>
        <BridgeTitlePanel title="Transaction History" iconEvent={nav2transfer} />
        {historyList.length ? (
          <HistoryListWrap>
            <Order>
              <CenterRow>
                <Number>01</Number>
                <NetworkIcon />
                <NetworkName>Ethereum Network</NetworkName>
                <NetWorkDirectionIcon src={DirectionIcon} />
                <NetworkIcon />
                <NetworkName>Ethereum Network</NetworkName>
              </CenterRow>
              <OrderDetailWrap>
                <Left>
                  <OrderDetaiItem>
                    <Title>Asset:</Title>
                    <Content>USDT</Content>
                  </OrderDetaiItem>
                  <OrderDetaiItem>
                    <Title>Amount:</Title>
                    <Content>120</Content>
                  </OrderDetaiItem>
                  <OrderDetaiItem>
                    <Title>Transfer fee:</Title>
                    <Fee>10 KCS</Fee>
                  </OrderDetaiItem>
                </Left>
                <Right>
                  <OrderDetaiItem>
                    <StatusRow>
                      <Title>Processing</Title>
                      <RightOutlined style={{ color: 'rgba(0, 0, 58, 0.6)', fontSize: '10px', marginLeft: '5px' }} />
                    </StatusRow>
                    <Content>2021年07月05日17:20:09</Content>
                  </OrderDetaiItem>
                </Right>
              </OrderDetailWrap>
            </Order>
            <Order>
              <CenterRow>
                <Number>01</Number>
                <NetworkIcon />
                <NetworkName>Ethereum Network</NetworkName>
                <NetWorkDirectionIcon src={DirectionIcon} />
                <NetworkIcon />
                <NetworkName>Ethereum Network</NetworkName>
              </CenterRow>
              <OrderDetailWrap>
                <Left>
                  <OrderDetaiItem>
                    <Title>Asset:</Title>
                    <Content>USDT</Content>
                  </OrderDetaiItem>
                  <OrderDetaiItem>
                    <Title>Amount:</Title>
                    <Content>120</Content>
                  </OrderDetaiItem>
                  <OrderDetaiItem>
                    <Title>Transfer fee:</Title>
                    <Fee>10 KCS</Fee>
                  </OrderDetaiItem>
                </Left>
                <Right>
                  <OrderDetaiItem>
                    <StatusRow>
                      <Title>Processing</Title>
                      <RightOutlined style={{ color: 'rgba(0, 0, 58, 0.6)', fontSize: '10px', marginLeft: '5px' }} />
                    </StatusRow>
                    <Content>2021年07月05日17:20:09</Content>
                  </OrderDetaiItem>
                </Right>
              </OrderDetailWrap>
            </Order>
            <Order>
              <CenterRow>
                <Number>01</Number>
                <NetworkIcon />
                <NetworkName>Ethereum Network</NetworkName>
                <NetWorkDirectionIcon src={DirectionIcon} />
                <NetworkIcon />
                <NetworkName>Ethereum Network</NetworkName>
              </CenterRow>
              <OrderDetailWrap>
                <Left>
                  <OrderDetaiItem>
                    <Title>Asset:</Title>
                    <Content>USDT</Content>
                  </OrderDetaiItem>
                  <OrderDetaiItem>
                    <Title>Amount:</Title>
                    <Content>120</Content>
                  </OrderDetaiItem>
                  <OrderDetaiItem>
                    <Title>Transfer fee:</Title>
                    <Fee>10 KCS</Fee>
                  </OrderDetaiItem>
                </Left>
                <Right>
                  <OrderDetaiItem>
                    <StatusRow>
                      <Title>Processing</Title>
                      <RightOutlined style={{ color: 'rgba(0, 0, 58, 0.6)', fontSize: '10px', marginLeft: '5px' }} />
                    </StatusRow>
                    <Content>2021年07月05日17:20:09</Content>
                  </OrderDetaiItem>
                </Right>
              </OrderDetailWrap>
            </Order>
            <Order>
              <CenterRow>
                <Number>01</Number>
                <NetworkIcon />
                <NetworkName>Ethereum Network</NetworkName>
                <NetWorkDirectionIcon src={DirectionIcon} />
                <NetworkIcon />
                <NetworkName>Ethereum Network</NetworkName>
              </CenterRow>
              <OrderDetailWrap>
                <Left>
                  <OrderDetaiItem>
                    <Title>Asset:</Title>
                    <Content>USDT</Content>
                  </OrderDetaiItem>
                  <OrderDetaiItem>
                    <Title>Amount:</Title>
                    <Content>120</Content>
                  </OrderDetaiItem>
                  <OrderDetaiItem>
                    <Title>Transfer fee:</Title>
                    <Fee>10 KCS</Fee>
                  </OrderDetaiItem>
                </Left>
                <Right>
                  <OrderDetaiItem>
                    <StatusRow>
                      <Title>Processing</Title>
                      <RightOutlined style={{ color: 'rgba(0, 0, 58, 0.6)', fontSize: '10px', marginLeft: '5px' }} />
                    </StatusRow>
                    <Content>2021年07月05日17:20:09</Content>
                  </OrderDetaiItem>
                </Right>
              </OrderDetailWrap>
            </Order>
            <Order>
              <CenterRow>
                <Number>01</Number>
                <NetworkIcon />
                <NetworkName>Ethereum Network Ethereum Network</NetworkName>
                <NetWorkDirectionIcon src={DirectionIcon} />
                <NetworkIcon />
                <NetworkName>Ethereum Network</NetworkName>
              </CenterRow>
              <OrderDetailWrap>
                <Left>
                  <OrderDetaiItem>
                    <Title>Asset:</Title>
                    <Content>USDT</Content>
                  </OrderDetaiItem>
                  <OrderDetaiItem>
                    <Title>Amount:</Title>
                    <Content>120</Content>
                  </OrderDetaiItem>
                  <OrderDetaiItem>
                    <Title>Transfer fee:</Title>
                    <Fee>10 KCS</Fee>
                  </OrderDetaiItem>
                </Left>
                <Right>
                  <OrderDetaiItem>
                    <StatusRow>
                      <Title>Processing</Title>
                      <RightOutlined style={{ color: 'rgba(0, 0, 58, 0.6)', fontSize: '10px', marginLeft: '5px' }} />
                    </StatusRow>
                    <Content>2021年07月05日17:20:09</Content>
                  </OrderDetaiItem>
                </Right>
              </OrderDetailWrap>
            </Order>
          </HistoryListWrap>
        ) : (
          <EmptyWrap>
            <EmptyIcon />
            <EmptyText>No record</EmptyText>
          </EmptyWrap>
        )}
      </HistoryWrap>
    </BridgeListWrap>
  )
}

export default BridgeListPage
