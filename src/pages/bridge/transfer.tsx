import React from 'react'
import styled from 'styled-components'
export interface BridgeTransferPageProps {}

const BridgeTransferWrap = styled.div`
  background: #000;
  color: #fff;
`

const BridgeTransferPage: React.FunctionComponent<BridgeTransferPageProps> = () => {
  return (
    <BridgeTransferWrap>
      <div>transfer</div>
    </BridgeTransferWrap>
  )
}

export default BridgeTransferPage
