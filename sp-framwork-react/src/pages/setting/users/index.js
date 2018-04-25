import React from 'react'
import {Row, Breadcrumb, Col, Form, Input, Icon, Button, Table, Divider,Switch } from 'antd'
import {Link} from 'react-router-dom'

import {McBread} from '../../../components/McBread/index'
import style from './index.less'
import axios from 'axios'
//import FormItem from './FormItem.js'

const { Column } = Table
const FormItem = Form.Item

const aa = [{
  id: '1',  
  key: 1
}, {
  id: '2',
  key: 2
}, {
  id: '3',
  key: 3
}];

class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {  
      userList: [],
      searchForm:{},
      loading:false,
      pagination: {}
    }; 
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);  
    this.columns = [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '姓名',
      dataIndex: 'realUser',
      key: 'realUser',
    }, {
      title: '手机号码',
      dataIndex: 'contact',
      key: 'contact',
    }, {
      title: '身份证号',
      dataIndex: 'IDNumber',
      key: 'IDNumber',
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      key: 'deptName', 
    }, {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
    }, {
      title: '创建时间',
      dataIndex: '',
      key: '',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text,record) => (<Switch defaultChecked />)
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="" title="修改" onClick={this.handleEdit.bind(this,record.key)}><Icon type="edit" /></a>
          <Divider type="vertical" />
          <a href="" title="删除" onClick={this.handleDelete.bind(this,record.key)}><Icon type="delete" /></a>
        </span>
      ),
    }]; 
  }

  //删除
  handleDelete(userID) {  
    console.log('hi this is a delete test' + userID);  
  }  

  //编辑
  handleEdit(userID) {
    console.log("userID:"+userID);
    let { history, match } = this.props;
    history.push(match.path + '/editUser/' + userID);
  }

  //提交查询
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        const pager = { ...this.state.pagination };
        this.setState({
          pagination: pager,
        });
        this.fetch({
          results: pager.pageSize,
          page: pager.current,
          ...values,
        });
      }
    });
  }
  fetch = (params = {}) => {
    this.setState({ 
      loading: false,
      userList: aa
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


  validateChinexeName = (rule, value, callback) => {
    let pattern = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/  
    if (value && !pattern.test(value)) {
      callback('请输入两位以上的中文字符');
    }
    callback();
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4},
      wrapperCol: { span: 18},
    };
    return(  
      <div>
        {/* 查询表单 */}
        <Row>
        <Form onSubmit={this.handleSubmit}>
          <Col span={6}>
            <FormItem label={'用户'} {...formItemLayout} colon={false} className={style['margin-bottom-16']}>
                {getFieldDecorator('userName', {
                  rules: [],
                  })(
                  <Input placeholder="请输入"/>
                )}
            </FormItem>                
          </Col>
          <Col span={6}>
            <FormItem label={'手机'} {...formItemLayout} colon={false} className={style['margin-bottom-16']}>
              {getFieldDecorator('contact', {
                  rules: [],
                })(
                  <Input placeholder="请输入"/>
              )}
            </FormItem>                
          </Col>
          <Col span={6}>
            <FormItem label={'角色'} {...formItemLayout} colon={false} className={style['margin-bottom-16']}>
              {getFieldDecorator('admin', {
                  rules: [],
                })(
                  <Input placeholder="请输入"/>
              )}
            </FormItem>                
          </Col>
        <Col span={6} className={style['text-center']} >
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>               
          </Col>
        </Form>
      </Row>
      {/* 操作按钮 */}
      <Row className={style['table-btn-right']}>
            {/* <Link to={this.editUser} className='ant-btn mc-btn-green'><Icon type="plus-circle-o" /> 新增</Link> */}
            <Button type="primary" onClick={this.handleEdit.bind(this,-1)} className='ant-btn mc-btn-green' ><Icon type="plus-circle-o"/> 新增</Button>
      </Row>
      {/* 查询结果 */}
      <Row>          
        <Table dataSource={this.state.userList} columns={this.columns} size={'small'} pagination={this.state.pagination} locale={{emptyText:'暂无数据'}} loading={this.state.loading}></Table>             
      </Row>
    </div>
    )
  }
}

const UserSearchForm = Form.create()(SearchForm);

class UsersPage extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Breadcrumb>
          {McBread(this.props)}
        </Breadcrumb>
        <div className={style.content + ' main-content'}>
          {/* 页面标题 */}
          <Row>
            <h2>用户设置</h2>
          </Row>
          <UserSearchForm {...this.props}/>
        </div>
      </React.Fragment>
    )
  }
}
export default UsersPage