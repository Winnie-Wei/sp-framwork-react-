import React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'
import {breadcrumbNameMap} from '../../router/routerName'

export const McBread = (props) => {
  const pathSnippets = props.location.pathname.split('/').filter(i => i)
  const icon = <Icon type='home' />
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[url] === '首页' ? icon : breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    )
  })
  return extraBreadcrumbItems
}