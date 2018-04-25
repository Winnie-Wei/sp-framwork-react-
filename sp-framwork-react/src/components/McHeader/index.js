import React from 'react';
import {Row, Col} from 'antd'
import style from './index.less'
import logo from './logo.png'

class McHeader extends React.Component {
  render () {
    return (
      <Row className={style.header}>
        <Col span={4}>
          <div className={style.logo} >
            <img src={logo} alt='logo' />
          </div>
        </Col>
      </Row>
    )
  }
}
export default McHeader
