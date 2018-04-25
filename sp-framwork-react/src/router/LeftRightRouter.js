import React from 'react'
import { Switch, withRouter, NavLink } from 'react-router-dom'
import LeftNav from '../layouts/LeftNav'
import {Menu, Breadcrumb} from 'antd'
import RouteWithSubRoutes from './RouterDom'
import {McBread} from '../components/McBread/index'

const LeftRightRouter = (props) => (
  <React.Fragment>
    <LeftNav history={props.history}>
      {props.routes.map((route, i) => route.leftNav === true ? <Menu.Item key={route.path}>
        <NavLink to={route.path}>
          {route.name}
        </NavLink>
      </Menu.Item> : '')}
    </LeftNav>
    <div className='main-right'>
      <Breadcrumb>
        {McBread(props)}
      </Breadcrumb>
      <Switch>
        {props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </Switch>
    </div>
  </React.Fragment>
)

export default withRouter(LeftRightRouter)
