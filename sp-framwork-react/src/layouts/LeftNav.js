import React from 'react'
import {Menu} from 'antd'
import {withRouter} from 'react-router-dom'

class LeftNav extends React.Component {
  componentDidMount () {
  }
  render () {
    return (
      <Menu className='nav-left' ref='navLeft' theme={'dark'}>
        {this.props.children}
      </Menu>
    )
  }
}

export default withRouter(LeftNav)
