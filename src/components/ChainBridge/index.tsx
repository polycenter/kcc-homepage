import React from 'react'
import ChainCard from '../ChainCard'
import styled from 'styled-components'
import { BridgeTitle } from '../../pages/bridge/transfer'
import { useTranslation } from 'react-i18next'
import { ChainBridgeType } from '../../pages/bridge/confirm'

export interface ChainBridgeProps {
  srcId: number
  distId: number
  type: ChainBridgeType
  changeSrcId?: any
  changeDistId?: any
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
  margin: 0 10px;
  cursor: pointer;
`
const ToIcon = styled.img`
  width: 16px;
  height: 8px;
  margin: 0 10px;
  cursor: pointer;
`
export const Box = styled.div`
  flex: 1;
`

export enum ChainDirection {
  'From',
  'To',
}

const Swap = require('../../assets/images/bridge/transfer.png').default
const To = require('../../assets/images/bridge/to.png').default

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
        <ChainCard direction={ChainDirection.From} type={props.type} />
      </Box>
      {props.type === ChainBridgeType.OPERATE ? <SwapIcon src={Swap} onClick={swap} /> : <ToIcon src={To} />}

      <Box>
        <BridgeTitle>{t('To')}</BridgeTitle>
        <ChainCard direction={ChainDirection.To} type={props.type} />
      </Box>
    </ChainBridgeWrap>
  )
}

export default ChainBridge
