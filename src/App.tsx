import React, { lazy, Suspense } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Web3ReactManager, { getLibrary } from './components/Web3ReactManager'
import FullLoading from './components/FullLoading'
import AppLayout from './layouts/AppLayout'
import Home from './pages/home/'
import NotFound from './pages/error'

import './App.less'
import './styles/transition.css'

const Grants = lazy(() => import(/* webpackChunkName:'Grant' */ './pages/grants/index'))
const Activity = lazy(() => import(/* webpackChunkName:'Activity' */ './pages/activities/index'))
const Bridge = lazy(() => import(/* webpackChunkName:'Bridge' */ './pages/bridge/index'))
const BridgeTransfer = lazy(() => import(/* webpackChunkName:'BridgeTransfer' */ './pages/bridge/transfer'))
const BridgeHistoryList = lazy(() => import(/* webpackChunkName:'BridgeHistoryList' */ './pages/bridge/list'))
const BridgeOrderDetail = lazy(() => import(/* webpackChunkName:'BridgeOrderDetail' */ './pages/bridge/detail'))

function RouteWithSubRoutes(route: { path: string; component: any; routes: any }) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

export default function App() {
  const routes = [
    {
      path: '/bridge',
      component: Bridge,
      routes: [
        {
          path: '/bridge/transfer',
          component: BridgeTransfer,
        },
        {
          path: '/bridge/list',
          component: BridgeHistoryList,
        },
        {
          path: '/bridge/detail',
          component: BridgeOrderDetail,
        },
      ],
    },
  ]

  return (
    <Suspense fallback={<FullLoading />}>
      <HashRouter>
        <Web3ReactManager getLibrary={getLibrary}>
          <AppLayout>
            <TransitionGroup>
              <CSSTransition key={location.pathname} classNames="fade" timeout={1000}>
                <Switch>
                  <Route path="/" exact={true} component={Home} />
                  <Route path="/community/grants" exact={true} component={Grants} />
                  <Route path="/community/activity" exact={true} component={Activity} />
                  {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                  ))}
                  {/*  <Route
                    path="/bridge"
                    exact={true}
                    render={(props) => (
                      // pass the sub-routes down to keep nesting
                      <Bridge {...props} routes />
                    )}
                  >
                    <Redirect to="/bridge/transfer" />
                  </Route>
                  <Route path="/bridge/transfer" component={BridgeTransfer} />
                  <Route path="/bridge/list" component={BridgeHistoryList} />
                  <Route path="/bridge/detail" component={BridgeOrderDetail} /> */}
                  <Route path="*" component={NotFound} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </AppLayout>
        </Web3ReactManager>
      </HashRouter>
    </Suspense>
  )
}
