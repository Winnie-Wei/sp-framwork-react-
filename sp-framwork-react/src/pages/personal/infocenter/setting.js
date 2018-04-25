import React from 'react'
import {Row, Breadcrumb, Col, Form, Input, Icon, Button, Popconfirm,Table, Divider,Switch,Tabs,Select} from 'antd'
import {Link} from 'react-router-dom'

import {McBread} from '../../../components/McBread/index'
import style from './index.less'
import axios from 'axios'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const Option = Select.Option

const data =[
  {"id":'1',"ipAddress":1,"hostname":"192.168.29.21","OS":"ios","MAC":"fdjfkdjs"},
  {"id":'2',"ipAddress":1,"hostname":"192.168.29.21","OS":"ios","MAC":"fdjfkdjs"},
  {"id":'3',"ipAddress":1,"hostname":"192.168.29.21","OS":"ios","MAC":"fdjfkdjs"}
];
class BaseInfo extends React.Component {
  constructor(props) {
    super(props);
    //获取上一个页面的传参
    this.params = this.props.params;

    this.state = {
      userId:-1,//-1默认是新增
      hostList:data,
      depatList:[],
      loading:false,
      count:0,
    }; 
    this.cacheData = data.map(item => ({ ...item }));
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  fetch = (params = {}) => {
    console.log('params:', params);
    let depatList = [{"id":1,"name":'研发'},{"id":2,"name":'运维'},{"id":3,"name":'人事'},{"id":4,"name":'财务'}];
    this.setState({
      depatList:depatList,
     });

    //开始发送请求后端数据
    // axios.post('/v1/user',...params)
    //   .then((data)=>{
    //     console.log(data)   
    //     const pagination = { ...this.props.pagination };
    //     pagination.total = data.totalCount;
        // this.setState({
        //   loading: false,
        //   userList: aa,
        //   pagination,
        // });       
    //   })
    //   .catch((error)=>{
    //     console.log(error)
    //   })
  }
  componentDidMount() {
    this.fetch();
  }
  
  handleCancel(){
    console.log(this.props);
    this.props.handleCancel();
  }
  handleSubmit (e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //执行提交基础信息的操作，在回调函数中渲染主机列表信息
        this.props.form.resetFields();//清空提交的表单
        //执行提交到借口对操作
        // axios.post('/v1/user/add',values)
        // .then((data)=>{
        //   console.log(data)
        //   if (data.code === '0') {
        //     message.success('保存成功');
        //   }
        // })
        // .catch((error)=>{
        //   console.log(error)
        // })
      }
    });    
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {md: { span: 6 }, lg: { span: 4 }}, 
      wrapperCol: {md: { span: 18 }, lg: { span: 20 }},
    };
    const depatOptions = this.state.depatList.map(d => <Option key={d.id}>{d.name}</Option>);
    return (
      <Row>
        <Form>
          <Col span={12}>
            <FormItem label={'姓名'} {...formItemLayout} colon={false}>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入姓名', whitespace: true }],
                  })(
                  <Input placeholder="请输入姓名"/>
                )}
            </FormItem>                
          </Col>
          <Col span={12}>
            <FormItem label={'手机号码'} {...formItemLayout} colon={false}>
              {getFieldDecorator('contact', {
                  rules: [{ required: true, message: '请输入手机号码', whitespace: true }],
                })(
                  <Input placeholder="请输入手机号码"/>
              )}
            </FormItem>                
          </Col>
          <Col span={12}>
            <FormItem label={'身份证'} {...formItemLayout} colon={false}>
              {getFieldDecorator('IDNumber', {
                  rules: [],
                })(
                  <Input placeholder="请输入身份证"/>
              )}
            </FormItem>                
          </Col>
          <Col span={12}>
            <FormItem label={'部门'} {...formItemLayout} colon={false}>
              {getFieldDecorator('deptId', {
                  rules: [{ required: true, message: '请选择部门', whitespace: true }],
                })(
                  <Select placeholder="请选择部门"
                    allowClear={true}
                  >
                    {depatOptions}
                  </Select>
              )}
            </FormItem>                
          </Col>
          <Col span={12}>
            <FormItem label={'邮箱'} {...formItemLayout} colon={false}>
              {getFieldDecorator('email', {
                  rules: [{ required: true, message: '请输入邮箱', whitespace: true }],
                })(
                  <Input placeholder="请输入邮箱"/>
              )}
            </FormItem>                
          </Col>
          <Col span={12}>
            <FormItem label={'KEY编号'} {...formItemLayout} colon={false}>
              {getFieldDecorator('hardKey', {
                  rules: [],
                })(
                  <Input placeholder="请输入KEY编号"/>
              )}
            </FormItem>                
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleCancel.bind(this)}>取消</Button>               
          </Col>
        </Form>
      </Row>
    );
  }
}

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class HostInfo extends React.Component {
  constructor(props) {
    super(props);
    //获取上一个页面的传参
    this.params = this.props.params;

    this.state = { 
      userId:-1,//-1默认是新增
      hostList:data,
      depatList:[],
      loading:false,
      count:0,
    }; 
    this.cacheData = data.map(item => ({ ...item }));
    this.columns = [{
      title: 'IP',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'ipAddress'),
    },{
      title: '主机名',
      dataIndex: 'hostname',
      key: 'hostname',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'hostname'),
    }, {
      title: '操作系统',
      dataIndex: 'OS',
      key: 'OS',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'OS'),
    }, {
      title: 'MAC地址',
      dataIndex: 'MAC',
      key: 'MAC',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'MAC'),
    }, {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      render: (text, record) => {
        const { editable } = record;
        console.log(record);
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.id)}>Save</a>
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.id)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : <span>
                    <a onClick={() => this.edit(record.id)}>Edit</a>
                    <Divider type="vertical" />
                    <Popconfirm title="确定删除?" onConfirm={() => this.delete(record.id)}>
                      <a>Delete</a>
                    </Popconfirm>
                  </span>
            }
          </div>
        )
      }
    }]; 
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.id, column)}
      />
    );
  }
  handleAdd = () => {
    const hostList = this.state.hostList;
    const newData = {
      id:'test' + this.state.count,
      ipAddress: 'test' + this.state.count,
      hostname: 'test' + this.state.count,
      OS: 'test' + this.state.count,
      MAC: 'test' + this.state.count,
    };
    this.setState({
      hostList: [...hostList, newData],
      count: this.state.count + 1,
    });
  }
  handleChange = (value, key, column) => {
    const newData = [...this.state.hostList];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ hostList: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.hostList];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ hostList: newData });
    }
  }
  delete(key) {
    const newData = [...this.state.hostList];
    this.setState({ hostList: newData.filter(item => item.id !== key) });
  }
  save(key) {
    const newData = [...this.state.hostList];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      delete target.editable;
      this.setState({ hostList: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.hostList];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);
      delete target.editable;
      this.setState({ hostList: newData });
    }
  }
  render () {
    return (
      <div>
        <Row>
          <span className={style['second-title']}>主机信息</span>
        </Row>
        {/* 主机信息 */}
        <Row>          
          <Table bordered dataSource={this.state.hostList} columns={this.columns} pagination={false} size={'small'} locale={{emptyText:'暂无数据'}} loading={this.state.loading}></Table>             
        </Row>
        {/* 增加新的一行 */}
        <Row>
          <Button className={style['table-btn-add-full']} onClick={this.handleAdd} type="dashed"><Icon type="plus" />添加</Button>
        </Row>          
      </div>
    );
  }
}

class InfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      loading:false
    }; 
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel(){
    let { history, match } = this.props;
    history.push("/app/personal/infocenter/index/");
  }

  render () {
    return(  
      <div className={style.userinfo}>
        {/* 操作按钮 */}
        <Row className={style['table-btn-right']}>
          <Button type="primary" onClick={this.handleCancel.bind(this)} className='ant-btn mc-btn-green' ><Icon type="edit"/>取消</Button>
        </Row>
        <Row>
          <Tabs defaultActiveKey="baseinfo" >
              <TabPane tab="基本信息" key="baseinfo"><BaseInfo {...this.props} handleCancel={this.handleCancel.bind(this)}/></TabPane>
              <TabPane tab="主机信息" key="hostinfo"><HostInfo {...this.props}/></TabPane>
          </Tabs>
        </Row>
    </div>
    )
  }
}

const InfoCenterForm = Form.create()(InfoForm);

class InfoCenterPage extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Breadcrumb>
          {McBread(this.props)}
        </Breadcrumb>
        <div className='main-content'>
          {/* hello */}
          <div className={style.hello}>
            <div className={style.helloIcon}></div>
            <div className={style.helloMessage}>
                <span className={style.name}>你好,张三</span>
                <span>登录时间：2018-04-22 10:49:03</span>
            </div>
          </div>
          <InfoCenterForm {...this.props}/>
        </div>
      </React.Fragment>
    )
  }
}
export default InfoCenterPage