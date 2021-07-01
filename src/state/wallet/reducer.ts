import { createReducer } from '@reduxjs/toolkit'
import { updateErrorInfo } from './actions'

export interface WalletState {
  hasError: boolean
  errorInfo: string
}

const initialState: WalletState = {
  hasError: false,
  errorInfo: '',
}

export default createReducer(initialState, (builder) =>
  builder.addCase(updateErrorInfo, (state, action) => {
    const { hasError, errorInfo } = action.payload
    state.hasError = hasError
    state.errorInfo = errorInfo
  })
)
