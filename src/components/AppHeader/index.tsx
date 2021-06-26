import React from 'react'
import styled from 'styled-components'
import AppMenu from '../AppMenu'
import ChangeLanguage from '../ChangeLanguage/index'
import KccLogo from '../Logo/KccLogo'
import { MobileView, BrowserView } from '../Common'
import { theme } from '../../constants/theme'
import { MenuOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useMobileMenuShow } from '../../state/application/hooks'
import { useDispatch } from 'react-redux'
import { changeMobileMenuShow } from '../../state/application/actions'
import { useResponsive } from '../../utils/responsive'

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

const AppHeaderContent = styled(HeaderLeftWrap)<{ isMobile: boolean }>`
  justify-content: ${({ isMobile }) => (isMobile ? 'flex-end' : 'flex-space')};
  width: 100%;
  // max-width: 1200px;
`

const AppHeader: React.FunctionComponent = () => {
  // const [mobileMenuShow, setMobileMenuShow] = React.useState(false)

  const show = useMobileMenuShow()

  const { isMobile } = useResponsive()

  const dispatch = useDispatch()

  return (
    <AppHeaderWrap>
      <AppHeaderContent isMobile={isMobile}>
        <HeaderLeftWrap>
          <KccLogo styles={{ width: '100px', textAlign: 'left' }} />
          <BrowserView>
            <AppMenu style={{ width: '600px' }} />
          </BrowserView>
        </HeaderLeftWrap>

        <ChangeLanguage />
        <MobileView style={{ width: '24px' }}>
          {!show ? (
            <MenuOutlined
              style={{ fontSize: '18px', color: theme.colors.primary }}
              onClick={() => {
                dispatch(changeMobileMenuShow({ show: true }))
              }}
            />
          ) : (
            <CloseCircleOutlined
              style={{ fontSize: '20px', color: theme.colors.primary }}
              onClick={() => {
                dispatch(changeMobileMenuShow({ show: false }))
              }}
            />
          )}

          {show ? <AppMenu style={{ width: '100%' }} /> : null}
        </MobileView>
      </AppHeaderContent>
    </AppHeaderWrap>
  )
}

export default AppHeader
