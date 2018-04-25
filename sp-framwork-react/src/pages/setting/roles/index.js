import React from 'react'
import {
  Row,
  Form,
  Input,
  Button,
  Icon,
  Table,
  Switch
} from 'antd'
import {Link} from 'react-router-dom'
const FormItem = Form.Item

const columns = [{
  title: '序号',
  dataIndex: 'key',
  key: 'key',
},{
  title: '角色名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '创建时间',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '创建人',
  dataIndex: 'address',
  key: '1',
},
{
  title: '状态',
  dataIndex: 'address',
  key: '2',
  render: value => <Switch defaultChecked />
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <Icon type="edit" />
    </span>
  ),
}];

const data = [];

class RolesPage extends React.Component {
  constructor () {
    super()
    this.state = {
      list: [],
      loading: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render () {
    return (
      <React.Fragment>
        <div className='main-content'>
          <Row className='main-title'>
            角色管理
          </Row>
          <Form onSubmit={this.handleSubmit} layout='inline'>
            <FormItem label='角色名称'>
              <Input placeholder='请输入' />
            </FormItem>
            <FormItem>
              <Button type='primary' htmlType="submit">查询</Button>
            </FormItem>
          </Form>
          <Row className='main-btn-line'>
            <Link to={`${this.props.match.path}/setting`} className='ant-btn mc-btn-green'><Icon type="plus-circle-o" /> 新增</Link>
          </Row>
          <Row>
            <Table size='middle' loading={this.state.loading} locale={{emptyText:'暂无数据'}} columns={columns} dataSource={data} />
          </Row>
        </div>
      </React.Fragment>
    )
  }
}
export default RolesPage
