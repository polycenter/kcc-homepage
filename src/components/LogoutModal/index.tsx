import React from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'
export interface LogoutModalProps {}

export const ModalWrap = styled(Modal)``

const LogoutModal: React.FunctionComponent<LogoutModalProps> = () => {
  return <ModalWrap title="Your Wallet">kkk</ModalWrap>
}

export default LogoutModal
