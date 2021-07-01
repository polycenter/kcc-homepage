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

const UnlockButton: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const { errorInfo, hasError } = useWalletErrorInfo()

  const { login, logout } = useAuth()

  const connect = () => {
    login(ConnectorNames.Injected)
  }

  if (hasError) {
    return (
      <ErrorButton>
        <Text>{t(`${errorInfo}`)}</Text>
      </ErrorButton>
    )
  }

  if (account) {
    return (
      <ConnectButton>
        <Text>{shortAddress(account)}</Text>
      </ConnectButton>
    )
  }

  return (
    <ConnectButton onClick={connect}>
      <Text>{t(`Connect Wallet`)}</Text>
    </ConnectButton>
  )
}

export default UnlockButton
