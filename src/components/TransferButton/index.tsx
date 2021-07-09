import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { theme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { toggleConnectWalletModalShow } from '../../state/wallet/actions'
import { withRouter } from 'react-router-dom'
import { useHistory } from 'react-router'
import { CheckListType } from '../../pages/bridge/transfer'
import { network } from '../../connectors/index'
import { getPairInfo, getNetworkInfo } from '../../utils/index'

export interface TransferButtonProps {
  applyApprove: any
  generateOrder: any
  checkList: CheckListType
  pairId: number
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
const DisabledButton = styled(BaseButton)`
  background: #e4f3f2;
  cursor: not-allowed;
  color: #ccc;
`

const TransferButton: React.FunctionComponent<TransferButtonProps> = ({
  applyApprove,
  generateOrder,
  checkList,
  pairId,
}) => {
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

  const selectedPairInfo = getPairInfo(pairId)
  const selectedNetworkInfo = getNetworkInfo(selectedPairInfo?.srcChainInfo.chainId as any)

  const allStatus = React.useMemo(() => {
    const keys = Reflect.ownKeys(checkList)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (!checkList[key as keyof CheckListType]) {
        return false
      }
    }
    return true
  }, [checkList])

  // not connect
  if (!account) {
    return (
      <TransferButtonWrap>
        <BaseButton onClick={connect}>{t(`Connect your wallet`)}</BaseButton>
      </TransferButtonWrap>
    )
  }

  // switch network
  if (!checkList.network) {
    return (
      <TransferButtonWrap>
        <BaseButton onClick={applyApprove}>
          {t(`Switch`)} {selectedNetworkInfo.fullName}
        </BaseButton>
        <HistoryText onClick={() => history.push('/bridge/list')}>{t(`Transaction History`)}</HistoryText>
      </TransferButtonWrap>
    )
  }

  // not approve
  if (!checkList.approve) {
    return (
      <TransferButtonWrap>
        <BaseButton onClick={applyApprove}>{t(`Approved`)}</BaseButton>
        <HistoryText onClick={() => history.push('/bridge/list')}>{t(`Transaction History`)}</HistoryText>
      </TransferButtonWrap>
    )
  }

  if (!allStatus) {
    return (
      <TransferButtonWrap>
        <DisabledButton>{t(`Follow the tips`)}</DisabledButton>
        <HistoryText onClick={() => history.push('/bridge/list')}>{t(`Transaction History`)}</HistoryText>
      </TransferButtonWrap>
    )
  }

  // all check is pass
  return (
    <TransferButtonWrap>
      <BaseButton onClick={next}>{t(`Next`)}</BaseButton>
      <HistoryText onClick={() => history.push('/bridge/list')}>{t(`Transaction History`)}</HistoryText>
    </TransferButtonWrap>
  )
}

export default withRouter<any, any>(TransferButton)
