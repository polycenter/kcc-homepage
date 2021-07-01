import { createAction } from '@reduxjs/toolkit'

export const updateErrorInfo =
  createAction<{
    hasError: boolean
    errorInfo: string
  }>('app/updateErrorInfo')
