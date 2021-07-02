import { createReducer } from '@reduxjs/toolkit'
import { toggleConnectWalletModalShow, updateErrorInfo } from './actions'

export interface WalletState {
  hasError: boolean
  errorInfo: string
  connectWalletModalShow: boolean
}

const initialState: WalletState = {
  hasError: false,
  errorInfo: '',
  connectWalletModalShow: false,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateErrorInfo, (state, action) => {
      const { hasError, errorInfo } = action.payload
      state.hasError = hasError
      state.errorInfo = errorInfo
    })
    .addCase(toggleConnectWalletModalShow, (state, action) => {
      const { show } = action.payload
      state.connectWalletModalShow = show
    })
)
