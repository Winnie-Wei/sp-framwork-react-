import React from 'react'
import { Switch } from 'react-router-dom'
import Header from '../layouts/Header'
import routes from './routerConfig'
import RouteWithSubRoutes from './RouterDom'

const PrimaryRouter = ({ match }) => (
  <React.Fragment>
    <Header />
    <main className='main-height'>
      <Switch>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </Switch>
    </main>
  </React.Fragment>
)

export default PrimaryRouter
