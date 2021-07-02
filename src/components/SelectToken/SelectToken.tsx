import React from 'react'
import styled from 'styled-components'
import { RightOutlined, SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
export interface SelectTokenProps {
  list: any[]
}

const SelectTokenWrap = styled.div`
  width: 100%;
  height: 48px;
  background: rgba(1, 8, 30, 0.04);
  border-radius: 4px;
  display: flex;
  flex-flow: row-nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
  cursor: pointer;
`
const TokenWrap = styled.div`
  display: flex;
  flex-flow: row-nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`

const TokenIcon = styled.img`
  width: 24px;
  height: 24px;
  background: #d8d8d8;
  border-radius: 50%;
`

const TokenText = styled.div`
  padding-top: 0px;
  font-size: 16px;
  font-weight: 400;
  color: #01081e;
  margin-left: 10px;
`
const TokenName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #01081e;
  text-align: left;
  height: 16px;
`

const TokenListModal = styled.div`
  z-index: 99;
  position: absolute;
  padding: 40px 32px;
  background: #fff;
  border-radius: 8px;
  width: 100%;
  height: auto;
  top: 0px;
  left: 0;
`
const Icon = styled.img`
  width: 16px;
  height: 16px;
`

const FullName = styled.div`
  font-size: 12px;
  font-family: URWDIN-Regular, URWDIN;
  font-weight: 400;
  color: rgba(0, 6, 33, 0.6);
`

const TokenDescriptionWrap = styled.div`
  margin-left: 12px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  text-align: flex;
  height: 36px;
`

const ListWrap = styled.div`
  height: 400px;
  overflow: scroll;
`
const SelectItem = styled(TokenWrap)`
  padding: 0 14px;
  &:hover {
    background: #f1fcf8;
  }
`

const list = [
  {
    id: 0,
    name: 'USDT',
    fullName: 'TetherUs',
  },
  {
    id: 1,
    name: 'LINK',
    fullName: 'TetherUs',
  },
  {
    id: 2,
    name: 'KCS',
    fullName: 'TetherUs',
  },
  {
    id: 3,
    name: 'KCS',
    fullName: 'TetherUs',
  },
  {
    id: 4,
    name: 'KCS',
    fullName: 'TetherUs',
  },
  {
    id: 5,
    name: 'KCS',
    fullName: 'TetherUs',
  },
  {
    id: 6,
    name: 'KCS',
    fullName: 'TetherUs',
  },
  {
    id: 7,
    name: 'KCS',
    fullName: 'TetherUs',
  },
  {
    id: 8,
    name: 'KCS',
    fullName: 'TetherUs',
  },
  {
    id: 9,
    name: 'KCS',
    fullName: 'TetherUs',
  },
]

const SelectToken: React.SFC<SelectTokenProps> = () => {
  const [selectedId, setSelectedId] = React.useState<number>(0)
  const [show, setShow] = React.useState<boolean>(false)

  const [tokenId, setTokenId] = React.useState<number>(0)

  const [keyword, setKeyword] = React.useState<string>('')

  const filterList = React.useMemo(() => {
    const key = keyword.toLowerCase()
    if (key === '') {
      return list
    }
    return list.filter((token) => token.name.toLowerCase().includes(key))
  }, [keyword])

  const filterChange = (e: any) => {
    console.log(e.target.value)
    setKeyword(() => e.target.value)
  }

  const selectToken = (id: number) => {
    setSelectedId(() => id)
    setShow(() => false)
  }

  const tokenList = filterList.map((token, index) => {
    return (
      <SelectTokenWrap
        onClick={selectToken.bind(null, token.id)}
        style={{ background: '#fff', padding: '0px', borderRadius: '0px' }}
        key={index}
      >
        <SelectItem>
          <TokenWrap>
            <TokenIcon />
            <TokenDescriptionWrap>
              <TokenName>{token.name}</TokenName>
              <FullName>{token.fullName}</FullName>
            </TokenDescriptionWrap>
          </TokenWrap>
          {token.id === selectedId ? (
            <Icon src={require('../../assets/images/bridge/selected@2x.png').default} />
          ) : null}
        </SelectItem>
      </SelectTokenWrap>
    )
  })

  return (
    <SelectTokenWrap>
      <TokenWrap
        onClick={() => {
          setShow(() => true)
        }}
      >
        <TokenIcon />
        <TokenText>USDT</TokenText>
      </TokenWrap>
      <RightOutlined style={{ color: '#01081e' }} />
      {show ? (
        <TokenListModal>
          <SelectTokenWrap>
            <Input
              value={keyword}
              onChange={filterChange}
              style={{ paddingTop: '4px' }}
              prefix={<Icon src={require('../../assets/images/bridge/search@2x.png').default} />}
              suffix={
                <Icon
                  onClick={() => setKeyword(() => '')}
                  src={require('../../assets/images//bridge/close@2x.png').default}
                />
              }
            />
          </SelectTokenWrap>
          <ListWrap>{tokenList}</ListWrap>
        </TokenListModal>
      ) : null}
    </SelectTokenWrap>
  )
}

export default SelectToken
