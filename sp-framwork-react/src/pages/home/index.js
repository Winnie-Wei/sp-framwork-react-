import React from 'react';
// import './login.less'
import style from './index.less';
// import 'antd'
import { Row, Col, Icon, Divider } from 'antd';


class HomePage extends React.Component {
  constructor () {
    super()
    console.log(this)
  }
  render () {
    return (
      <div className={style['layout-context']}>

        {/* location start */}
        <Row className={style.location} align="middle">
          <span><Icon type="home"/></span><span className={style.home}>/</span><span>首页</span>
        </Row>
        {/* location end */}  

        {/* top start */}
        <Row className={style['personal-center'] + ' ' + style.white}>
          <Col span={2}>
            图片
          </Col>
          <Col span={10}>
            <span className={style.block}>
              <span className={style['helle-message']}>你好，张三</span>
              <span style={{marginLeft:"24px"}}><a>个人中心</a></span>
            </span>
            <span style={{display:'block'}}>登录时间：2018年4月16日16:38:38</span>
          </Col>
          <Col span={12} style={{textAlign:'right'}}>
            <a className={style['personal-link-a']}>
              <span className={style.block + ' ' + style.font18} >我的待办</span>
              <span className={style.block + ' ' + style.font30}>56</span>
            </a>
            <Divider type="vertical" />
            <a className={style['personal-link-a']}>
              <span className={style.block + ' ' + style.font18} >我的通知</span>
              <span className={style.block + ' ' + style.font30}>10</span>
            </a>
            <Divider type="vertical" />
            <a className={style['personal-link-a']}>
              <span className={style.block + ' ' + style.font18} >我的发起</span>
              <span className={style.block + ' ' + style.font30}>2</span>
            </a>
            <Divider type="vertical" />
            <a className={style['personal-link-a']}>
              <span className={style.block + ' ' + style.font18} >我的消息</span>
              <span className={style.block + ' ' + style.font30}>2</span>
            </a>
          </Col>
        </Row>
        {/* top end */}

        {/* body start */}
        <Row className={style['home-context']}>
          <Col span={20} className={style['left-div']}>
            <Row gutter={16} style={{marginBottom:"16px"}}>
              <Col className="gutter-row" style={{height:'100%'}} span={12}>
                <div className={style.block}>我的待办</div>
              </Col>
              <Col className="gutter-row" style={{height:'100%'}} span={12}>
                <div className={style.block}>通知</div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className={style['gutter-box'] + " gutter-row"} span={12}>
                <div className={style.block}>我的发起</div>
              </Col>
              <Col className={style['gutter-box'] + " gutter-row"} span={12}>
                <div className={style.block}>我的消息</div>
              </Col>
            </Row>
          </Col>
          <Col span={4} className={style['right-div']}>快捷入口</Col>
        </Row>
        {/* body end */}

      </div>
    )
  }
}
export default HomePage
