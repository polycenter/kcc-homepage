import React, { lazy, Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import FullLoading from './components/FullLoading'
import AppLayout from './layouts/AppLayout'

import Home from './pages/home/'

import './App.less'

const Grants = lazy(() => import(/* webpackChunkName:'Grant' */ './pages/grants/index'))
const Activity = lazy(() => import(/* webpackChunkName:'Activity' */ './pages/activities/index'))

export default function App() {
  return (
    <Suspense fallback={<FullLoading />}>
      <HashRouter>
        <AppLayout>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/community/grants" exact={true} component={Grants} />
            <Route path="/community/activity" exact={true} component={Activity} />
          </Switch>
        </AppLayout>
      </HashRouter>
    </Suspense>
  )
}
