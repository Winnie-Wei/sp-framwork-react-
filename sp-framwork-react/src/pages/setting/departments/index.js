import React from 'react'
import { Breadcrumb } from 'antd'
import {McBread} from '../../../components/McBread/index'

import classNames from 'classnames';
import style from './index.less'
import {
  Icon,
  Button,
  Input,
  Switch,
  Table
} from 'antd'
// const { Column, ColumnGroup } = Table;

class DepartmentPage extends React.Component {
  // constructor () {
  //   super()
  // }

  renderDeptTable () {

    const columns = [{
      title: '序号',
      dataIndex: 'number',
      key: 'number',
      render: (text, record, index) => (
        <span>{index + 1}</span>
      )
    }, {
      title: '部门',
      dataIndex: 'deptName',
      key: 'deptName',
    }, {
      title: '上一级部门',
      dataIndex: 'deptParentName',
      key: 'deptParentName',
    }, {
      title: '部门层级',
      dataIndex: 'deptLevel',
      key: 'deptLevel'
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    }, {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Switch checked={true} disabled  />
      ),
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Icon type="edit" style={{ fontSize: 14, cursor: 'pointer'}} onClick={(e) => {
          this.editDepartment(record);
        }} />
      )
    }];

    const data = [{
      key: '1',
      id: 21,
      deptName: '研发中心',
      deptParentName: '美创',
      deptLevel: '2',
      createTime: '2018.3.21',
      creator: '张三'
    }, {
      key: '2',
      id: 22,
      deptName: '市场部',
      deptParentName: '美创',
      deptLevel: '2',
      createTime: '2018.3.21',
      creator: '张三'
    }, {
      key: '3',
      id: 23,
      deptName: '销售部',
      deptParentName: '美创',
      deptLevel: '2',
      createTime: '2018.3.21',
      creator: '张三'
    }];
  
    return (
      <Table
        columns={columns}
        dataSource={data}
      />
    );
  }

  editDepartment = (department) => {
    let { history, match } = this.props;
    history.push(match.path + '/modify/' + department.id);
  }

  handleSearch = () => {

  }

  render () {
    return (
      <React.Fragment>
        <Breadcrumb>
          {McBread(this.props)}
        </Breadcrumb>
        <article className={classNames('main-content', style.dptContent)}>
          <section className={style.dptTitle}>
            <h2>部门管理</h2>
          </section>
          <section className={style.dptSearch}>
            部门名称
            <Input 
              className={style.dptSearchInput}
              placeholder="请输入"
            /> 
            <Button type="primary" onClick={this.handleSearch}>查询</Button>
          </section>
          <section className={style.dptAdd}>
            <Button className={style.antBtnPrimary} type="primary"><Icon type="plus-circle-o" />新增</Button>
          </section>

          {this.renderDeptTable()}
        </article>
      </React.Fragment>
    )
  }
}
export default DepartmentPage
