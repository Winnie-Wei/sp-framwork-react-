import React from 'react'
import {Breadcrumb} from 'antd'
import { Switch, withRouter } from 'react-router-dom'
import RouteWithSubRoutes from './RouterDom'
import {McBread} from '../components/McBread/index'

const FullScreenRouter = (props) => (
  <React.Fragment>
    <div className='main'>
      <Breadcrumb>
        {McBread(props)}
      </Breadcrumb>
      <Switch>
        {props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </Switch>
    </div>
  </React.Fragment>
)

export default withRouter(FullScreenRouter)
