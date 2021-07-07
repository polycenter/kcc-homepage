import React from 'react'
import ChainCard from '../ChainCard'
import styled from 'styled-components'
import { BridgeTitle } from '../../pages/bridge/transfer'
import { useTranslation } from 'react-i18next'
import { ChainBridgeType } from '../../pages/bridge/confirm'
import { useChainIdList, useTokenSupporChain, useCurrentCurrency, usePariList } from '../../state/bridge/hooks'
import { message } from 'antd'
import { ChainId } from '../../connectors/index'

export interface ChainBridgeProps {
  srcId: any
  distId: any
  type: ChainBridgeType
  changeSrcId?: any
  changeDistId?: any
  currency?: any
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

  const { srcChainIds, distChainIds } = useTokenSupporChain()

  const pairList = usePariList()

  /*   console.log('srcChainIds', srcChainIds)
  console.log('distChainIds', distChainIds) */

  const swap = () => {
    if (srcChainIds.includes(props.distId) && distChainIds.includes(props.srcId)) {
      let d = props.distId
      let s = props.srcId
      props.changeDistId(s)
      props.changeSrcId(d)
    } else {
      message.error(t("Can't swap the network for") + props.currency.symbol.toUpperCase())
    }
  }

  const cuclDistChainIds = React.useMemo(() => {
    const ids: number[] = []
    for (let i = 0; i < pairList.length; i++) {
      const chain = pairList[i]
      const srcChainInfo = chain.srcChainInfo
      const distChainInfo = chain.dstChainInfo
      if (srcChainInfo.chainId === props.srcId && !ids.includes(distChainInfo.chainId)) {
        ids.push(distChainInfo.chainId)
      }
    }
    return ids
  }, [props.srcId])

  return (
    <ChainBridgeWrap>
      <Box>
        <BridgeTitle>{t('From')}</BridgeTitle>
        <ChainCard
          direction={ChainDirection.From}
          availableChainIds={srcChainIds}
          networkId={props.srcId}
          oppsiteId={props.distId}
          type={props.type}
          changeNetwork={props.changeSrcId}
        />
      </Box>
      {props.type === ChainBridgeType.OPERATE ? <SwapIcon src={Swap} onClick={swap} /> : <ToIcon src={To} />}

      <Box>
        <BridgeTitle>{t('To')}</BridgeTitle>
        <ChainCard
          direction={ChainDirection.To}
          networkId={props.distId}
          availableChainIds={cuclDistChainIds}
          oppsiteId={props.srcId}
          type={props.type}
          changeNetwork={props.changeDistId}
        />
      </Box>
    </ChainBridgeWrap>
  )
}

export default ChainBridge
