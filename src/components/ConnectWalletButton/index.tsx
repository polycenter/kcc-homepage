import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../constants/theme'

import useAuth from '../../hooks/useAuth'
import { LanguageButton } from '../ChangeLanguage/index'
import { useWeb3React } from '@web3-react/core'
import { ConnectorNames } from '../../constants/wallet'
import { shortAddress } from '../../utils/format'
import { useTranslation } from 'react-i18next'
import { useWalletErrorInfo } from '../../state/wallet/hooks'
import LogoutModal from '../LogoutModal'
import WalletListModal from '../WalletListModal'
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
  ${Text} {
    color: #fff;
  }
`
const WalletIcon = styled.img`
  width: 18px;
  height: 14px;
  margin-right: 10px;
`

const UnlockButton: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const [logoutModalShow, setLogoutModalShow] = React.useState<boolean>(false)
  const [walletListModalShow, setWalletListModalShow] = React.useState<boolean>(false)

  const { errorInfo, hasError } = useWalletErrorInfo()

  const hideLogout = (show: boolean) => {
    setLogoutModalShow(() => show)
  }

  const connect = () => {
    // login(ConnectorNames.Injected)
    setWalletListModalShow(() => true)
  }

  let btn: any = null

  if (hasError) {
    btn = (
      <ErrorButton>
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
      <WalletListModal visible={walletListModalShow} toggleVisible={setWalletListModalShow} />
    </>
  )
}

export default UnlockButton
