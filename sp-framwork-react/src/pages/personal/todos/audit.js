import React from 'react'
import {McBread} from '../../../components/McBread/index'
import {
  Breadcrumb,
  Row,
  Tabs,
  Col,
  Form,
  Button,
  Table,
  DatePicker,
  Modal
} from 'antd'
const { RangePicker } = DatePicker
const FormItem = Form.Item
const TabPane = Tabs.TabPane
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { 
      span: 15,
      offset:1 }
  },
}
const columns = [{
  title: '表格名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '访问用户',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '访问类型',
  dataIndex: 'address',
  key: 'address',
},
{
  title: '数据性质',
  dataIndex: 'address',
  key: 'addres2s',
}, {
  title: '表格列名称',
  dataIndex: 'address',
  key: 'addressd',
}];
class Information extends React.Component {
  state = {
    visible: false
  }
  showModel = (e) => {
    this.setState({
      visible: true
    })
  }
  render () {
    return (
      <Row>
        <Row>
          <Col span={10}>
            <FormItem label='编号' {...formItemLayout} colon={false}>
              123123
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label='业务类型' {...formItemLayout} colon={false}>
              121321
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label='申请人名称' {...formItemLayout} colon={false}>
              121321
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label='联系方式' {...formItemLayout} colon={false}>
              121321
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label='数据库名称' {...formItemLayout} colon={false}>
              121321
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label='数据库账号' {...formItemLayout} colon={false}>
              121321
            </FormItem>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1">
          <TabPane tab="表格访问" key="1">
            <Table columns={columns} />
            <Row style={{margin:'30px 0'}}>
              有效期&nbsp;&nbsp;
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                />
            </Row>
          </TabPane>
          <TabPane tab="SQL语句" key="2">
            <Row>
              访问周期：永久
            </Row>
            <Row>
              SQL访问列表
            </Row>
            <Table columns={columns} />
          </TabPane>
          <TabPane tab="访问权限" key="3">
          <Table columns={columns} />
            <Row style={{margin:'30px 0'}}>
              有效期&nbsp;&nbsp;
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                />
            </Row>
          </TabPane>
        </Tabs>
        <Row style={{textAlign: 'center'}}>
          <Button>接收</Button>
          <Button onClick={this.showModel}>审核</Button>
          <Button>转交</Button>
          <Button>返回</Button>
          <Button>取消</Button>
        </Row>
        <Modal
          title="审核信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          // onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Row>
    )
  }
}
class AuditPage extends React.Component {
  constructor () {
    super()
    console.log(this)
  }
  render () {
    return (
      <React.Fragment>
        <Breadcrumb>
          {McBread(this.props)}
        </Breadcrumb>
        <Row className='main-content'>
          <Row className='main-title'>我的待办</Row>
          <Tabs type="card" tabBarStyle={{marginBottom: '0'}}>
            <TabPane tab="业务信息" key="1">
              <div style={{border: '1px solid #dbdbdb', borderTop: 'none', padding: '24px'}}>
                <Information />
              </div>
            </TabPane>
            <TabPane tab="办理进度" key="2"></TabPane>
          </Tabs>
        </Row>
      </React.Fragment>
    )
  }
}

export default AuditPage
