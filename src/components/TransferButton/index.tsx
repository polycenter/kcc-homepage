import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { theme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { toggleConnectWalletModalShow } from '../../state/wallet/actions'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useHistory } from 'react-router'

export interface TransferButtonProps {
  approved: boolean
  applyApprove: any
  generateOrder: any
}

const TransferButtonWrap = styled.div`
  margin-top: 20px;
`
export const BaseButton = styled.div`
  height: 48px;
  background: ${theme.colors.bridgePrimay};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  user-select: none;
  letter-space: 1px;
`
const HistoryText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: #00dea9;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    text-decoration: underline;
  }
`

const TransferButton: React.FunctionComponent<TransferButtonProps> = ({ approved, applyApprove, generateOrder }) => {
  React.useEffect(() => {
    console.log('---', approved)
  }, [approved])

  const { t } = useTranslation()
  const { account } = useWeb3React()

  const history = useHistory()

  const dispatch = useDispatch()

  const connect = () => {
    dispatch(toggleConnectWalletModalShow({ show: true }))
  }

  const next = () => {
    generateOrder()
    history.push('/bridge/confirm')
  }

  // not connect
  if (!account) {
    return (
      <TransferButtonWrap>
        <BaseButton onClick={connect}>{t(`Connect your wallet`)}</BaseButton>
      </TransferButtonWrap>
    )
  }

  // not approve
  if (!approved) {
    return (
      <TransferButtonWrap>
        <BaseButton onClick={applyApprove}>{t(`Approved`)}</BaseButton>
      </TransferButtonWrap>
    )
  }

  // not available

  return (
    <TransferButtonWrap>
      <BaseButton onClick={next}>{t(`Next`)}</BaseButton>
      <HistoryText>{t(`Transaction History`)}</HistoryText>
    </TransferButtonWrap>
  )
}

export default withRouter<any, any>(TransferButton)
