import React from 'react'
import {Row, Breadcrumb, Col, Form, Input, Icon, Button, Table, TreeSelect, Popconfirm, Select,Divider  } from 'antd'

import {McBread} from '../../../components/McBread/index'
import style from './index.less'
import axios from 'axios'
//import FormItem from './FormItem.js'

const FormItem = Form.Item
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode


const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

const data =[
  {"id":'1',"ipAddress":1,"hostname":"192.168.29.21","OS":"ios","MAC":"fdjfkdjs"},
  {"id":'2',"ipAddress":1,"hostname":"192.168.29.21","OS":"ios","MAC":"fdjfkdjs"},
  {"id":'3',"ipAddress":1,"hostname":"192.168.29.21","OS":"ios","MAC":"fdjfkdjs"}
];

class UserForm extends React.Component {
  
  constructor(props) {
    super(props);
    //获取上一个页面的传参
    this.params = this.props.params;

    this.state = { 
      userId:-1,//-1默认是新增
      userForm:{
        "userName":'',
        "contact":'',
        "IDNumber":'',
        "deptId":'',
        "email":'',
        "hardKey":'',
        "roleId":'',
      },
      hostList:data,
      roleList:[],
      depatList:[],
      // roleTreeData:[],
      // depatTreeData:[],
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

  fetch = (params = {}) => {
    console.log('params:', params);
    let roleList = [{"id":1,"name":'超级管理员'},{"id":2,"name":'安全审计员'},{"id":3,"name":'安全保密员'},{"id":4,"name":'系统管理员'}];
    let depatList = [{"id":1,"name":'研发'},{"id":2,"name":'运维'},{"id":3,"name":'人事'},{"id":4,"name":'财务'}];
    // let userTree = this.transfTreeData(roleList);
    // let depatTree = this.transfTreeData(depatList);
    this.setState({ 
      // roleTreeData: userTree,
      // depatTreeData: depatTree
      roleList:roleList,
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

  /* 转换成treeselelct的数据格式，现在易废弃
  transfTreeData = (list) => {
    let treeData = [];
    if(!!list){
      for (let value of list) {
        let oneItem = {
          "label": value.name,
          "value": value.id,
          "key": value.id
        };
        treeData.push(oneItem);
      }
    }
    console.log(treeData);
    return treeData;
  }
  */

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
    console.log(this.state.hostList);
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
      this.setState({ data: newData });
    }
  }
  handleSubmit = (e) => {
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
        this.setHostInfo();
      }
    });    
  }
  handleCancel = () =>{
    let { history, match } = this.props;
    history.push("/app/users/setting");
  }  
  edit(key) {
    const newData = [...this.state.hostList];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
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
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.hostList];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }

  validateChinexeName = (rule, value, callback) => {
    let pattern = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/  
    if (value && !pattern.test(value)) {
      callback('请输入两位以上的中文字符');
    }
    callback();
  }

  onSelectChange = (value) => {
    console.log(arguments);
    this.setState({ value });
  }

  renderHostInfo = () =>{
    const userParam = this.props.match.params;
    console.log("得到传值" + userParam.id);
    const hasHostInfo = userParam.id == -1 ? false:true;
    if(hasHostInfo){
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

  setHostInfo = () =>{
    this.props.match.params.id = 1;
    //console.log(this.props.match.params);
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {md: { span: 6 }, lg: { span: 4 }}, 
      wrapperCol: {md: { span: 18 }, lg: { span: 20 }},
    };
    const formItemLayoutfull = {
      labelCol: {md: { span: 3 }, lg: { span: 2 }}, 
      wrapperCol: {md: { span: 21 }, lg: { span: 22 }},
    };
    const roleOptions = this.state.roleList.map(d => <Option key={d.id}>{d.name}</Option>);
    const depatOptions = this.state.depatList.map(d => <Option key={d.id}>{d.name}</Option>);
    return(
      <div>  
      <div className={style['edit-form']}>
        <Row>
            <span className={style['second-title']}>个人基本信息</span>
        </Row>
        {/* 基础结果 */}
        <Row>
          <Form className={style['search-form']} >
            <Col span={12}>
              <FormItem label={'姓名'} {...formItemLayout} colon={false} className={style['margin-bottom-16']}>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入姓名', whitespace: true }],
                    })(
                    <Input placeholder="请输入"/>
                  )}
              </FormItem>                
            </Col>
            <Col span={12}>
              <FormItem label={'手机号码'} {...formItemLayout} colon={false} className={style['margin-bottom-16']}>
                {getFieldDecorator('contact', {
                    rules: [{ required: true, message: '请输入手机号码', whitespace: true }],
                  })(
                    <Input placeholder="请输入"/>
                )}
              </FormItem>                
            </Col>
            <Col span={12}>
              <FormItem label={'身份证'} {...formItemLayout} colon={false} className={style['margin-bottom-16']}>
                {getFieldDecorator('IDNumber', {
                    rules: [],
                  })(
                    <Input placeholder="请输入"/>
                )}
              </FormItem>                
            </Col>
            <Col span={12}>
              <FormItem label={'部门'} {...formItemLayout} colon={false} className={style['margin-bottom-16']}>
                {getFieldDecorator('deptId', {
                    rules: [{ required: true, message: '请选择部门', whitespace: true }],
                  })(
                    <Select placeholder="请选择"
                      allowClear={true}
                    >
                      {depatOptions}
                    </Select>
                    // <TreeSelect
                    //   value={this.state.userForm.deptId}
                    //   dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    //   placeholder="请选择"
                    //   allowClear
                    //   treeDefaultExpandAll
                    //   onChange={this.onSelectChange}
                    //   treeData={this.state.depatTreeData}
                    // ></TreeSelect>
                )}
              </FormItem>                
            </Col>
            <Col span={12}>
              <FormItem label={'邮箱'} {...formItemLayout} colon={false} className={style['margin-bottom-16']}>
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: '请输入邮箱', whitespace: true }],
                  })(
                    <Input placeholder="请输入"/>
                )}
              </FormItem>                
            </Col>
            <Col span={12}>
              <FormItem label={'KEY编号'} {...formItemLayout} colon={false} className={style['margin-bottom-16']}>
                {getFieldDecorator('hardKey', {
                    rules: [],
                  })(
                    <Input placeholder="请输入"/>
                )}
              </FormItem>                
            </Col>
            <Col span={24}>
              <FormItem label="角色" {...formItemLayoutfull} colon={false} className={style['margin-bottom-16']}>
                {getFieldDecorator('roleId', {
                    rules: [{ required: true, message: '请至少选择一个角色', whitespace: true, type: 'array'}],
                  })(
                    <Select placeholder="请选择"
                      mode="multiple"
                      allowClear={true}
                    >
                      {roleOptions}
                    </Select>
                )}
              </FormItem>                
            </Col>
          </Form>
        </Row>
        {this.renderHostInfo()}        
      </div>
      {/* 保存操作按钮 */}   
      <Row className={style['table-btn-save']}>
        <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        <Button style={{ marginLeft: 8 }} onClick={this.handleCancel}>取消</Button>
      </Row>
      </div>
    )
  }
}

// class RenderList extends React.Component {
//   render () {
//     return(  
      
//     )
//   }
// }

const UserEditForm = Form.create()(UserForm);
// const UserSearchResult = Form.create()(RenderList);

class UserSettingPage extends React.Component {

  

  render () {
    return (
      <React.Fragment>
        <Breadcrumb>
          {McBread(this.props)}
        </Breadcrumb>
        <div className={style.content + ' main-content'}>
          {/* 页面标题 */}
          <Row>
            <h2>人员修改</h2>
          </Row>
          <UserEditForm {...this.props}/>
        </div>
      </React.Fragment>
    )
  }
}
export default UserSettingPage