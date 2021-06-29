import React from 'react'
import styled from 'styled-components'

/*
  /bridge
  /bridge/index
  /bridge/list
  /birdege/detail
*/

export interface BridgePageProps {}

const BridgeWrap = styled.div`
  background: #000;
  color: #fff;
`

const BridgePage: React.FunctionComponent<BridgePageProps> = ({ children }) => {
  React.useEffect(() => {
    console.log('bridge is mount')
  }, [])
  return (
    <BridgeWrap>
      <span>bridege page</span>
      <div>{children}</div>
    </BridgeWrap>
  )
}

export default BridgePage
