import React from 'react'
import styled from 'styled-components'
import { theme } from '../../constants/theme'
import { LanguageButton } from '../ChangeLanguage/index'
import { useWeb3React } from '@web3-react/core'
import { shortAddress } from '../../utils/format'
import { useTranslation } from 'react-i18next'
import { useWalletErrorInfo, useConnectWalletModalShow } from '../../state/wallet/hooks'
import LogoutModal from '../LogoutModal'
import WalletListModal from '../WalletListModal'
import { useDispatch } from 'react-redux'
import { toggleConnectWalletModalShow, updateErrorInfo } from '../../state/wallet/actions'
import { ChainIds } from '../../connectors/index'
import { getNetworkInfo } from '../../utils/index'
import { CenterRow } from '../Row/index'
import { Badge, notification } from 'antd'
import { AlertOutlined } from '@ant-design/icons'

const ConnectButton = styled(LanguageButton)`
  width: auto;
  color: ${theme.colors.primary};
  margin-left: 10px;
  padding: 0 10px;
  cursor: pointer;
`
const Text = styled.span`
  user-select: none;
`

const ErrorButton = styled(ConnectButton)`
  background: #f00;
  color: fff;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Text} {
    color: #fff;
  }
`
const WalletIcon = styled.img`
  width: 18px;
  height: 14px;
  margin-right: 10px;
`

const NetworkWrap = styled(CenterRow)`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-right: 1px solid ${theme.colors.primary};
  padding-right: 15px;
  margin-right: 10px;
`

const UnlockButton: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const { account, chainId } = useWeb3React()

  const [logoutModalShow, setLogoutModalShow] = React.useState<boolean>(false)
  // const [walletListModalShow, setWalletListModalShow] = React.useState<boolean>(false)

  const dispatch = useDispatch()

  const { errorInfo, hasError } = useWalletErrorInfo()

  const hideLogout = (show: boolean) => {
    setLogoutModalShow(() => show)
  }

  const selectedNetworkInfo = React.useMemo(() => {
    if (ChainIds.includes(chainId as any)) {
      dispatch(updateErrorInfo({ errorInfo: '', hasError: false }))
      return getNetworkInfo(chainId as any)
    } else {
      notification.error({
        message: t('Unsupported Chain Id'),
        description: t('Unsupported Chain Id Error. Check your chain Id'),
      })
      dispatch(updateErrorInfo({ hasError: true, errorInfo: 'Unsupported Chain Id' }))
    }
  }, [chainId, ChainIds])

  const connect = () => {
    // login(ConnectorNames.Injected)
    // setWalletListModalShow(() => true)
    dispatch(toggleConnectWalletModalShow({ show: true }))
  }

  let btn: any = null

  if (hasError) {
    btn = (
      <ErrorButton>
        <AlertOutlined style={{ fontSize: '16px', color: '#fff', margin: '-2px 5px 0px 5px' }} />
        <Text>{t(`${errorInfo}`)}</Text>
      </ErrorButton>
    )
  } else if (account) {
    btn = (
      <ConnectButton
        onClick={() => {
          setLogoutModalShow(() => true)
        }}
      >
        <NetworkWrap>
          <Badge status="success" />
          <Text>{selectedNetworkInfo?.name}</Text>
        </NetworkWrap>
        <Text>{shortAddress(account)}</Text>
      </ConnectButton>
    )
  } else {
    btn = (
      <ConnectButton onClick={connect}>
        <WalletIcon src={require('../../assets/images/bridge/wanllet@2x.png').default} />
        <Text>{t(`Connect Wallet`)}</Text>
      </ConnectButton>
    )
  }

  return (
    <>
      {btn}
      <LogoutModal visible={logoutModalShow} toggleVisible={hideLogout} />
    </>
  )
}

export default UnlockButton
