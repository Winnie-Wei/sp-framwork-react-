import React from 'react'
import McHeader from '../../components/McHeader/index'
import style from './index.less'
import { Link } from 'react-router-dom' 
import axios from 'axios'

import { Form, Input, Select, Row, Col, Button, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class RegistrationForm extends React.Component {
  constructor () {
    super()
    this.timer = null 
  }
  state = {
    confirmDirty: false,
    count: 0,
    click: true,
    clickMsg: '获取验证码'
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post('/v1/user',values)
        .then((data)=>{
          console.log(data)
          if (data.code === '0') {
            message.success('注册成功');
          }
        })
        .catch((error)=>{
          console.log(error)
        })
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['repeatPassword'], { force: true });
    }
    callback();
  }
  validateChinexeName = (rule, value, callback) => {
    let pattern = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/  
    if (value && !pattern.test(value)) {
      callback('请输入两位以上的中文字符');
    }
    callback();
  }
  validateIDNumber = (rule, value, callback) => {
    let pattern = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/  
    if (value && !pattern.test(value)) {
      callback('请输入正确的身份证号码');
    }
    callback();
  }
  validatePassword = (rule, value, callback) => {
    let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,21}$/
    if (value && !pattern.test(value)) {
      callback('密码不小于8位且不能全是数字或者全是英文');
    }
    callback();
  }
  validateMobile = (rule, value, callback) => {
    let pattern = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
    if (value && !pattern.test(value)) {
      callback('请输入正确的手机号码');
    }
    callback();
  }
  getValidateCode = (e) => {
    const form = this.props.form;
    let value = form.getFieldValue('contact')
    if (value === ''||value === undefined) {
      message.error('请输入手机号码');
      return false
    }
    let pattern = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
    if (value && !pattern.test(value)) {
      message.error('请输入正确的手机号码')
      return false
    }
    let time = 60
    if (this.state.count === 0) {
      this.timer = setInterval(()=>{
        this.setState({
          clickMsg: '(' + time-- + '秒)后重新获取',
          click: false
        })
        if (time === 0) {
          clearInterval(this.timer)
          this.setState({
            clickMsg: '重新获取',
            click: true
          })
        }
      },1000)
    }
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 15,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    );


    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label='姓名' colon={false}
        >
          {getFieldDecorator('realUser', {
            rules: [
              { required: true, message: '请输入姓名', whitespace: true },
              { validator: this.validateChinexeName}
          ],
          })(
            <Input size='large' placeholder='请输入至少2位中文名字'/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='身份证号' colon={false}
        >
          {getFieldDecorator('IDNumber', {
            rules: [{ required: true, message: '请输入姓名', whitespace: true },{
              validator: this.validateIDNumber
            }],
          })(
            <Input size='large' placeholder='请输入身份证号'/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码" colon={false}
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码',
            }, {
              validator: this.validateToNextPassword,
            },{
              validator: this.validatePassword
            }],
          })(
            <Input size='large' type="password" placeholder='请输入8位以上密码' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码" colon={false}
        >
          {getFieldDecorator('repeatPassword', {
            rules: [{
              required: true, message: '请重复输入密码',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input size='large' type="password" placeholder='请重复输入密码' onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱" colon={false}
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '请输入正确的邮箱',
            }, {
              required: true, message: '请输入邮箱账号',
            }],
          })(
            <Input size='large' placeholder='请输入邮箱账号'/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="所属部门" colon={false}
        >
          {getFieldDecorator('deptId', {
            rules: [ {
              required: true, message: '请选择所属部门',
            }],
          })(
            <Select size='large' placeholder='请选择所属部门' style={{ width: '100%' }} >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          )}
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label="手机号码" colon={false}
        >
          {getFieldDecorator('contact', {
            rules: [{ required: true, message: '请输入手机号码' },{
              validator: this.validateMobile
            }],
          })(
            <Input size='large' placeholder='请输入手机号码' addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码" colon={false}
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('verificationCode', {
                rules: [{ required: true, message: '请输入获取到的验证码' }],
              })(
                <Input size='large'/>
              )}
            </Col>
            <Col span={12} style={{marginBottom:'1px'}}>
            {this.state.click?<Button size='large' onClick={this.getValidateCode}>{this.state.clickMsg}</Button>:<Button size='large' disabled>{this.state.clickMsg}</Button>}
            </Col>
          </Row>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" style={{width:'170px'}} size='large' htmlType="submit">注册</Button>
          <Link to={'auth/login'} style={{width:'170px',marginLeft:'50px'}} className='ant-btn ant-btn-lg ant-btn-primary ant-btn-background-ghost'>取消</Link>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

class RegisterPage extends React.Component {
  render () {
    return (
      <React.Fragment>
        <McHeader/>
        <div className={style.registerBg}>
          <div className={style.registerContent}>
            <h2>用户注册</h2>
            <WrappedRegistrationForm/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default RegisterPage
