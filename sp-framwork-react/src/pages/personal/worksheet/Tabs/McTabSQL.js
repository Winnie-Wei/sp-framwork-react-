import React, { Component } from 'react'
import style from '../index.less'
// import classNames from 'classnames'

import {
  Row,
  Col,
  Table,
  Icon,
  Select,
  DatePicker,
  Button,
  Input
} from 'antd'

const Option = Select.Option;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ButtonGroup = Button.Group;




class McTabSQL extends Component {


  renderSQLCommand () {

    return (
      <article className={style.mcTabSQL}>
        <section>
          <Row >
            <Col className={style.mcMargin5} xl={3} md={12}><span>访问周期</span></Col>
            <Col className={style.mcMargin5} xl={5} md={12} offset={1}>
              <Select defaultValue="other" style={{maxWidth: 120}}>
                <Option value="other">其他</Option>
                <Option value="forever">永久</Option>
              </Select>
            </Col>
            <Col className={style.mcMargin5} xl={14} md={20} offset={1}>
              <RangePicker
                style={{maxWidth: 260}}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['开始时间', '结束时间']}
              />
            </Col>
          </Row>
        </section>
        <section >
          SQL语句
          <TextArea rows={4} />
        </section>
        <section >
          SQL说明
          <TextArea rows={4} />
        </section>
        <ButtonGroup className={style.mcTabSQLAction}>
          <Button>重置</Button>
          <Button>添加<Icon type="arrow-right" /></Button>
        </ButtonGroup>
      </article>
    );
  }

  renderTable () {
    const columns = [{
      title: '序号',
      dataIndex: 'number',
      key: 'number',
      render: (text, record, index) => (
        <span>{index + 1}</span>
      )
    }, {
      title: 'SQL语句',
      dataIndex: 'tableName',
      key: 'tableName',
    }, {
      title: 'SQL说明',
      dataIndex: 'columnName',
      key: 'columnName',
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <section>
          <Icon type="delete" />
        </section>
      )
    }];

    const data = [{
      key: '1',
      id: 21,
      tableName: '表1',
      columnName: 'main_key'
    }, {
      key: '2',
      id: 22,
      tableName: '表2',
      columnName: 'main_key'
    }, {
      key: '3',
      id: 23,
      tableName: '表3',
      columnName: 'main_key'
    }];

    return (
      <Table
        className={style.mcColumnTable}
        columns={columns}
        dataSource={data}
      />
    );
  }

  render () {
    
    return (
      <article className="">
        <Row>
          <Col xl={12} md={24}>
            {this.renderSQLCommand()}
          </Col>
          <Col xl={{
            span: 11,
            offset: 1
          }} md={{
            span: 24,
            offset: 0
          }}>
            {this.renderTable()}
          </Col>
        </Row>
      </article>
    );
  }
}

export default McTabSQL