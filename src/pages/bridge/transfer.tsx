import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import SelectToken from '../../components/SelectToken/SelectToken'
import ChainBridge from '../../components/ChainBridge'
import AmountInput from '../../components/AmountInput'
import Row from '../../components/Row'
import { Box } from '../../components/ChainBridge/index'
import { useWeb3React } from '@web3-react/core'
import TransferButton from '../../components/TransferButton'
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
  margin-top: 136px;
  background: #fff;
  width: 516px;
  backgroud: #fff;
  padding: 32px;
  border-radius: 8px;
  position: relative;
`
export const BridgeTitle = styled.div`
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: rgba(1, 8, 30, 0.6);
`
const ReceiveText = styled.span`
  height: 14px;
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #00003a;
`
const ReceiveAmountText = styled(ReceiveText)`
  font-weight: bold;
`

export const ChainTag = styled.div`
  padding: 0 8px;
  background: rgba(49, 215, 160, 0.08);
  border-radius: 2px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`
export const ChainText = styled.span`
  padding-top: 2px;
  font-size: 12px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #31d7a0;
`

export const ReceiveAddressWrap = styled.div`
  margin-top: 17px;
  .ant-input {
    background: #f3f5f6;
    height: 48px;
  }
`

const NoticeText = styled.div`
  margin-top: 8px;
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #000132;
  line-height: 20px;
`

const BridgeTransferPage: React.FunctionComponent<BridgeTransferPageProps> = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [srcId, changeSrcId] = React.useState(1)
  const [distId, changeDistId] = React.useState(321)
  const [receiveAddress, setReceiveAddress] = React.useState<any>(account)
  const [amount, setAmount] = React.useState<number>(0)

  React.useEffect(() => {
    setReceiveAddress(() => account)
  }, [account])

  const changeReceiveAddress = (e: any) => {
    setReceiveAddress(() => e.target.value)
  }

  return (
    <BridgeTransferWrap>
      <TransferWrap>
        <BridgeTitle>{t(`Asset`)}</BridgeTitle>
        <SelectToken list={[]} />
        <ChainBridge srcId={1} distId={1} changeDistId={changeDistId} changeSrcId={changeSrcId} />
        <AmountInput amount={amount} setAmount={setAmount} />
        <Row style={{ marginTop: '9px', justifyContent: 'flex-start' }}>
          <ReceiveText>{t(`You will receive`)}</ReceiveText>
          <ReceiveAmountText>{t(` ≈ 88 USDT`)}</ReceiveAmountText>
          {account ? (
            <>
              <ReceiveText style={{ marginLeft: '10px' }}>Available:</ReceiveText>
              <ReceiveAmountText>{t(`  1288 USDT`)}</ReceiveAmountText>
            </>
          ) : null}

          <ChainTag>
            <ChainText>KRC20</ChainText>
          </ChainTag>
        </Row>
        <ReceiveAddressWrap>
          <BridgeTitle>{t(`Receiving address`)}</BridgeTitle>
          <Input value={receiveAddress} onChange={changeReceiveAddress} placeholder={t(`Destination address`)} />
          <NoticeText>
            {t(
              `If you have not add KuCoin Community Chain networkin your MetaMask yet，please click Add network and continue`
            )}
          </NoticeText>
        </ReceiveAddressWrap>
        <TransferButton />
      </TransferWrap>
    </BridgeTransferWrap>
  )
}

export default BridgeTransferPage
