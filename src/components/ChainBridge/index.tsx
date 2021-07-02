import React from 'react'
import ChainCard from '../ChainCard'
import styled from 'styled-components'
import { BridgeTitle } from '../../pages/bridge/transfer'
import { useTranslation } from 'react-i18next'

export interface ChainBridgeProps {
  srcId: number
  distId: number
  changeSrcId: any
  changeDistId: any
}

const ChainBridgeWrap = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`
const SwapIcon = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 6px;
  cursor: pointer;
`
export const Box = styled.div`
  flex: 1;
`

const ChainBridge: React.FunctionComponent<ChainBridgeProps> = (props) => {
  const { t } = useTranslation()
  const swap = () => {
    let d = props.distId
    let s = props.srcId
    props.changeDistId(s)
    props.changeSrcId(d)
  }

  return (
    <ChainBridgeWrap>
      <Box>
        <BridgeTitle>{t('From')}</BridgeTitle>
        <ChainCard />
      </Box>
      <SwapIcon onClick={swap} src={require('../../assets/images/bridge/transfer.png').default} />
      <Box>
        <BridgeTitle>{t('To')}</BridgeTitle>
        <ChainCard />
      </Box>
    </ChainBridgeWrap>
  )
}

export default ChainBridge
