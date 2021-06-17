import { Collapse } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { FOOTER_LIST } from '../../constants/footerList'
import { useHistory } from 'react-router-dom'

const { Panel } = Collapse

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const genExtra = () => <DownOutlined style={{ color: '#fff', fontSize: '10px' }} />

const HeaderText = styled.span`
  color: #fff;
  font-weight: 500;
`

const NavText = styled.div`
  font-size: 12px;
  color: #fff;
  line-height: 30px;
  position: relative;
  left: 0px;
`

export default function MFooter() {
  const router = useHistory()

  const nav2Target = (route: string | undefined) => {
    if (route) {
      if (route.startsWith('/')) {
        router.push(route)
      }
      if (route.startsWith('http')) {
        window.open(route, '_blank')
      }
    }
  }

  const List = FOOTER_LIST.map((item, index) => {
    const children = item.children
    const subList = children.map((item, k) => {
      return (
        <NavText key={k} onClick={nav2Target.bind(null, item.navRoute)}>
          {item.navText}
        </NavText>
      )
    })
    return (
      <Panel
        header={<HeaderText>{item.title}</HeaderText>}
        key={index}
        extra={genExtra()}
        showArrow={false}
        style={{ color: '#fff' }}
      >
        {subList}
      </Panel>
    )
  })

  return (
    <>
      <Collapse defaultActiveKey={[]} accordion={true} bordered={false} ghost style={{ color: '#fff' }}>
        {List}
      </Collapse>
    </>
  )
}
