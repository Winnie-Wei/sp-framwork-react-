import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import LoginPage from '../pages/login/index'
import RegisterPage from '../pages/register/index'

const UnauthorizedRouter = () => (
  <React.Fragment>
    <Switch>
      <Route path='/auth/login' component={LoginPage} />
      <Route path='/auth/register' component={RegisterPage} />
      <Redirect to='/auth/login' />
    </Switch>
  </React.Fragment>
)

export default UnauthorizedRouter
