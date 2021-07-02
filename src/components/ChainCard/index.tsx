import React from 'react'
import styled from 'styled-components'
export interface ChainCardProps {}

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

const ChainCard: React.SFC<ChainCardProps> = () => {
  return (
    <ChainCardWrap>
      <ChainLogo />
      <Name>Ethereum Network</Name>
      <SelectWrap>
        <SelectIcon src={require('../../assets/images/bridge/down.png').default} />
      </SelectWrap>
    </ChainCardWrap>
  )
}

export default ChainCard
