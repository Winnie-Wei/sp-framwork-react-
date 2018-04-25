import React from 'react'
import { login } from './../../utils/xhr'
import { Redirect, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import McHeader from '../../components/McHeader/index'
import style from './index.less'
import loginBg from './login-bg.png'
import {
  Row,
  Col,
  Form,
  Icon,
  Button,
  Input,
  Alert
} from 'antd'
const FormItem = Form.Item
class LoginForm extends React.Component {
  constructor(){
    super()
    this.state = {
      loading: false,
      errorMsg: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        login(values).then((data)=>{
          if (data.state === false) {
            this.setState({
              loading: false,
              errorMsg: data.msg
            })
          } else {
            this.props.history.push('/app')
          }
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={style.loginForm}>
        <h2>用户登录</h2>
        <div >
        <FormItem className={style.item}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入手机号' }],
          })(
            <Input size={'large'} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号码" />
          )}
        </FormItem>
        </div>
        <FormItem className={style.item}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input size={'large'} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <Row className={style.registerLink}>
        <Col span={12}><Link to={'/auth/register'}>用户注册</Link></Col>
        <Col span={12} style={{textAlign:'right'}}><Link to={'/auth/register'}>忘记密码</Link></Col>
        </Row>
        <FormItem className={style.item}>
          <Button type="primary" loading={this.state.loading} htmlType="submit" size={'large'} style={{'width':'100%'}}>
            登录
          </Button>
        </FormItem>
        <div className={style.item} style={{textAlign:'right'}}>
          <a href='' className={style.bottomLink}><Icon type="download" style={{fontWeight:'bold'}} /> 安全客户端下载</a>
        </div>
        <div className={style.item} style={{display: this.state.errorMsg === '' ? 'none': ''}}>
          <Alert message={this.state.errorMsg} type="error" showIcon />
        </div>
      </Form>
    );
  }
}

const WrappedLoginBox = Form.create()(LoginForm);

class LoginPage extends React.Component {
  constructor () {
    super()
    console.log(this)
  }
  render () {
    const { from } = this.props.location.state || { from: { pathname: '/app' } }
    if (this.props.logged === true) {
      return <Redirect to={from} />
    }
    return (
      <div>
        <McHeader/>
        <Row className={style.loginMain}>
          <Col span={12} style={{textAlign:'center',marginTop:'100px'}}><img src={loginBg} alt='login-bg'/></Col>
          <Col span={12}>
          <WrappedLoginBox history={this.props.history}/>
          </Col>
        </Row>
      </div>
    )
  }
}

const stateToProps = ({ loggedUserState }) => ({
  pending: loggedUserState.pending,
  logged: loggedUserState.logged
})

export default connect(stateToProps)(LoginPage)
