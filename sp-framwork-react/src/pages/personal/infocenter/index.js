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
      baseinfo:{}
    }; 
    this.cacheData = data.map(item => ({ ...item }));
  }

  fetch = (params = {}) => {
    console.log('params:', params);
    let depatList = [{"id":1,"name":'研发'},{"id":2,"name":'运维'},{"id":3,"name":'人事'},{"id":4,"name":'财务'}];
    let baseinfo = {
      "userName":"张三",
      "contact":"123456789",
      "IDNumber":"9876543210",
      "deptName":"研发部",
      "email":"123@qq.com",
      "hardKey":"0001111"
    };
    this.setState({
      depatList:depatList,
      baseinfo:baseinfo
     });
  }
  componentDidMount() {
    this.fetch();
  }
  render () {
    const formItemLayout = {
      labelCol: {md: { span: 6 }, lg: { span: 4 }}, 
      wrapperCol: {md: { span: 18 }, lg: { span: 20 }},
    };
    return (
      <Row style={{width:'50%'}}>
        <Form>
          <Col span={12}>
            <FormItem label={'姓名'} {...formItemLayout} colon={false}>
                {this.state.baseinfo.userName}
            </FormItem>                
          </Col>
          <Col span={12}>
            <FormItem label={'手机号码'} {...formItemLayout} colon={false}>
              {this.state.baseinfo.contact}
            </FormItem>                
          </Col>
          <Col span={12}>
            <FormItem label={'身份证'} {...formItemLayout} colon={false}>
              {this.state.baseinfo.IDNumber}
            </FormItem>                
          </Col>
          <Col span={12}>
            <FormItem label={'部门'} {...formItemLayout} colon={false}>
              {this.state.baseinfo.deptName}
            </FormItem>                
          </Col>
          <Col span={12}>
            <FormItem label={'邮箱'} {...formItemLayout} colon={false}>
              {this.state.baseinfo.email}
            </FormItem>                
          </Col>
          <Col span={12}>
            <FormItem label={'KEY编号'} {...formItemLayout} colon={false}>
              {this.state.baseinfo.hardKey}
            </FormItem>                
          </Col>
        </Form>
      </Row>
    );
  }
}
class HostInfo extends React.Component {
  constructor(props) {
    super(props);
    //获取上一个页面的传参
    this.params = this.props.params;

    this.state = { 
      userId:-1,//-1默认是新增
      hostList:data,
      loading:false,
      count:0,
    }; 
    this.columns = [{
      title: 'IP',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: '20%',
    },{
      title: '主机名',
      dataIndex: 'hostname',
      key: 'hostname',
      width: '20%',
    }, {
      title: '操作系统',
      dataIndex: 'OS',
      key: 'OS',
      width: '20%',
    }, {
      title: 'MAC地址',
      dataIndex: 'MAC',
      key: 'MAC',
      width: '20%',
    }]; 
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
    this.handleEdit = this.handleEdit.bind(this);
  }

  //编辑
  handleEdit(userID) {
    console.log("userID:"+userID);
    let { history, match } = this.props;
    history.push(match.path + '/setting');
  }

  render () {
    return(  
      <div className={style.userinfo}>
        {/* 操作按钮 */}
        <Row className={style['table-btn-right']}>
          <Button type="primary" onClick={this.handleEdit.bind(this)} className='ant-btn mc-btn-green' ><Icon type="edit"/>编辑</Button>
        </Row>
        <Row>
          <Tabs defaultActiveKey="baseinfo" >
              <TabPane tab="基本信息" key="baseinfo"><BaseInfo {...this.props}/></TabPane>
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