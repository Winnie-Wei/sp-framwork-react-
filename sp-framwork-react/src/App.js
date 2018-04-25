import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect} from 'react-router-dom'
import {LocaleProvider} from 'antd'
import AuthorizedRoute from './AuthorizedRoute'
import UnauthorizedRouter from './router/UnauthorizedRouter'
import PrimaryRouter from './router/PrimaryRouter'
import './pages/common.css'
import zhCN from 'antd/lib/locale-provider/zh_CN'

class App extends React.Component {
  render () {
    return (
      <LocaleProvider locale={zhCN}>
      <BrowserRouter>
        <Switch>
          <Route path='/auth' component={UnauthorizedRouter} />
          <AuthorizedRoute path='/app' component={PrimaryRouter} />
          <Redirect to='/auth' />
        </Switch>
      </BrowserRouter>
      </LocaleProvider>
    )
  }
}
export default App
