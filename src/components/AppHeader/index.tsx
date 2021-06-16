import React from 'react'
import styled from 'styled-components'
import AppMenu from '../AppMenu'
import ChangeLanguage from '../ChangeLanguage/index'
import KccLogo from '../Logo/KccLogo'
import { isMobile } from 'react-device-detect'
import { MobileView, BrowserView } from '../Common'
import { theme } from '../../constants/theme'
import { MenuOutlined } from '@ant-design/icons'

const AppHeaderWrap = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  padding: 0px 20px;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  background: transparent;
`

const HeaderLeftWrap = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  justify-content: space-between;
  align-items: center;
`

const AppHeaderContent = styled(HeaderLeftWrap)`
  justify-content: ${() => (isMobile ? 'flex-end' : 'flex-space')};
  width: 100%;
  max-width: 1200px;
`

const AppHeader: React.FunctionComponent = () => {
  const [mobileMenuShow, setMobileMenuShow] = React.useState(false)

  return (
    <AppHeaderWrap>
      <AppHeaderContent>
        <HeaderLeftWrap>
          <KccLogo styles={{ width: isMobile ? '76px' : '100px', textAlign: 'left' }} />
          <BrowserView>
            <AppMenu />
          </BrowserView>
        </HeaderLeftWrap>
        <ChangeLanguage />
        <MobileView>
          <MenuOutlined
            style={{ fontSize: '18px', color: theme.colors.primary }}
            onClick={() => {
              setMobileMenuShow(!mobileMenuShow)
            }}
          />
          {mobileMenuShow ? <AppMenu style={{ width: '100%' }} /> : null}
        </MobileView>
      </AppHeaderContent>
    </AppHeaderWrap>
  )
}

export default AppHeader
