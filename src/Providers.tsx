import React, { FunctionComponent } from 'react'
import { ConfigProvider } from 'antd'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import store from './state'
import { NetworkContextName } from './constants'
import { getLibrary } from './components/Web3ReactManager'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Providers: FunctionComponent = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ConfigProvider>
          <Provider store={store}>{children}</Provider>
        </ConfigProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
