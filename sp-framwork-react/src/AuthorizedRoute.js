import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {getLoggedUser} from './utils/xhr'

class AuthorizedRoute extends React.Component {
  componentWillMount () {
    getLoggedUser()
  }

  render () {
    const { component: Component, pending, logged, ...rest } = this.props
    return (
      <Route {...rest} render={props => {
        if (pending) return <div>loading</div>
        return logged
          ? <Component {...props} />
          : <Redirect to={{pathname: '/auth/login', state: { from: props.location }}} />
      }} />
    )
  }
}

const stateToProps = ({ loggedUserState }) => ({
  pending: loggedUserState.pending,
  logged: loggedUserState.logged
})

export default connect(stateToProps)(AuthorizedRoute)
