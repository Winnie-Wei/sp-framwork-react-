import React from 'react'
import {
  Row,
  Col,
  Form,
  Select,
  Input,
  DatePicker,
  Button,
  Tabs,
  Table
} from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
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
      offset:1 },
  },
}

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '序号',
  dataIndex: 'key',
  key: 'key',
}, {
  title: '业务类型',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '申报名称',
  dataIndex: 'address',
  key: 'address'
},
{
  title: '工单编号',
  dataIndex: 'address',
  key: 'address1'
},
{
  title: '当前环节',
  dataIndex: 'address',
  key: 'address2'
},{
  title: '申请人/单位',
  dataIndex: 'address',
  key: 'address3'
},{
  title: '创建时间',
  dataIndex: 'address',
  key: 'address4'
},{
  title: '经办状态',
  dataIndex: 'address',
  key: 'address5'
}];

class TodosPage extends React.Component {
  constructor () {
    super()
    this.state = {
      search: {
        a: '',
        b: '',
        c: '',
        d: []
      }
    }
    this.timeChoose = this.timeChoose.bind(this)
  }
  timeChoose (date, dateString) {
    this.setState({d: dateString})
  }
  selectChoose (value) {
    this.setState({a: value})
  }
  inputValue (a, event) {
    this.setState({
      [a]: event.target.value
    })
  }
  render () {
    return (
      <React.Fragment>
        <Row className='main-content'>
          <Row className='main-title'>我的待办</Row>
          <Row className='mc-border' style={{paddingTop: '20px'}}>
            <Col span={10}>
              <FormItem label='业务类型' onChange={this.selectChoose} {...formItemLayout} colon={false}>
                <Select placeholder='请选择' style={{ width: '100%' }} >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label='业务名称' {...formItemLayout} colon={false}>
                <Input placeholder='请输入' />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label='申请人/单位' {...formItemLayout} colon={false}>
                <Input placeholder='请输入' value={this.state.c} onChange={this.inputValue.bind(this, 'c')} />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label='申请时间' {...formItemLayout} colon={false}>
                <RangePicker onChange={this.timeChoose} style={{width: '100%'}} />
              </FormItem>
            </Col>
            <Col span={4} style={{paddingTop: '4px'}}>
              <Button type='primary'>查询</Button>
            </Col>
          </Row>
          <Row className='mc-border' style={{marginTop: '24px', padding: '24px'}}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="待办" key="1">
              <Table dataSource={dataSource} columns={columns} />
            </TabPane>
            <TabPane tab="已办" key="2">
            <Table dataSource={dataSource} columns={columns} />
            </TabPane>
          </Tabs>
          </Row>
        </Row>
      </React.Fragment>
    )
  }
}
export default TodosPage
