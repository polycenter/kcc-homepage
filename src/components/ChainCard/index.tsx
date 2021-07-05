import { Dropdown, Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { networks } from '../../constants/networks'
import { ChainIds } from '../../connectors/index'
import { ChainDirection } from '../ChainBridge'
import { ChainBridgeType } from '../../pages/bridge/confirm'

interface ChainCardProps {
  direction: ChainDirection
  type: ChainBridgeType
}

const ChainCardWrap = styled.div`
  width: 100%;
  height: 120px;
  background: rgba(1, 8, 30, 0.04);
  border-radius: 4px;
  padding: 12px;
  position: relative;
  flex: 1;
`
const ChainLogo = styled.img`
  width: 40px;
  height: 40px;
  background: #d8d8d8;
  border-radius: 50%;
`
const Name = styled.div`
  width: auto;
  max-width: 80px;
  border-radius: 4px;
  color: #000621;
  margin-top: 18px;
`

const SelectIcon = styled.img`
  width: 12px;
  height: 12px;
  transition: all 0.2s ease-in-out;
`
const SelectWrap = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover ${SelectIcon} {
    transform: scale(1.2);
  }
`
const ChainItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  width: 100%;
  &:hover {
    background: #f5f5f6;
  }
`
const ChainIcon = styled.img`
  width: 28px;
  height: 28px;
  background: #d8d8d8;
  border-radius: 50%;
`

const ChainName = styled.span`
  height: 22px;
  font-size: 14px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: rgba(1, 8, 30, 0.87);
  line-height: 22px;
  margin-left: 8px;
`

const ChainCard: React.SFC<ChainCardProps> = ({ type }) => {
  const menuList = ChainIds.map((id, index) => {
    const net = (networks as any)[id]
    return (
      <Menu.Item key={id}>
        <ChainItem>
          <ChainIcon />
          <ChainName>{net.name}</ChainName>
        </ChainItem>
      </Menu.Item>
    )
  })

  const menu = <Menu style={{ width: '220px' }}>{menuList}</Menu>
  /*  return (<Menu>    
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
    </Menu> 
  )*/

  return (
    <ChainCardWrap>
      <ChainLogo />
      <Name>Ethereum Network</Name>
      {type === ChainBridgeType.OPERATE ? (
        <SelectWrap>
          <Dropdown overlay={menu} placement={'bottomCenter'}>
            <SelectIcon src={require('../../assets/images/bridge/down.png').default} />
          </Dropdown>
        </SelectWrap>
      ) : null}
    </ChainCardWrap>
  )
}

export default ChainCard
