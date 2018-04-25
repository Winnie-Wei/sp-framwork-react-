import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Icon, Menu, Dropdown } from 'antd'
import {logout} from './../utils/xhr'
import logo from './logo.png'
const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/app/personal/index'>我的待办</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to='/app/personal/worksheet/index'>我的工单</Link>
    </Menu.Item>
    <Menu.Item>
        修改手机号码
    </Menu.Item>
    <Menu.Item>
      <Link to='/app/personal/infocenter/index'>个人信息</Link>
    </Menu.Item>
  </Menu>
)
class Header extends React.Component {
  render () {
    return (
      <header className='main-header'>
        <nav className='clearfix'>
          <Link to='/app' className='logo'><img alt='logo' src={logo} /></Link>
          <NavLink className='link' to='/app/home' exact activeClassName='active'>首页</NavLink>
          <NavLink className='link' to='/app/users' activeClassName='active'>用户管理</NavLink>
          <div className='header-menu'>
            <Dropdown overlay={menu}>
              <a className='ant-dropdown-link header-main-link'>
                <i className='iconfont icon-weibiaoti-_huabanfuben' /> Admin <Icon type='down' />
              </a>
            </Dropdown>
            <a onClick={() => { logout() }} className='header-main-link'><Icon type='link' /> 退出</a>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
