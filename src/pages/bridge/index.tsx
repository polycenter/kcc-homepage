import React, { lazy } from 'react'
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { BridgeHistoryList, BridgeOrderDetail, BridgeTransfer } from '../../App'

import '../../styles/transition.css'

export interface BridgePageProps {}

const BridgeWrap = styled.div`
  padding-top: 80px;
  background: #000;
  color: #fff;
  min-height: 400px;
`

const BridgePage: React.FunctionComponent<BridgePageProps> = ({ children }) => {
  const router = useHistory()
  const { path } = useRouteMatch()
  React.useEffect(() => {
    console.log('bridge is mount', path)

    if (path === '/bridge') {
      router.push('/bridge/transfer')
    }
  }, [])

  const location = useLocation()
  return (
    <BridgeWrap>
      <div>bridege index page</div>
      <Link to="/bridge/list">list</Link>
      <Link to="/bridge/detail">detail</Link>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        >
          <Switch>
            <Route path="/bridge/transfer" component={BridgeTransfer} />
            <Route path="/bridge/list" component={BridgeHistoryList} />
            <Route path="/bridge/detail" component={BridgeOrderDetail} />
          </Switch>
        </CSSTransition>
      </SwitchTransition>
    </BridgeWrap>
  )
}

export default BridgePage
