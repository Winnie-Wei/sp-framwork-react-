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
  Transfer,
  Button,
  message
} from 'antd'

const Option = Select.Option;
const { RangePicker } = DatePicker;


class McTabColumn extends Component {

  constructor () {
    super();

    this.state = {
      targetKeys: [],
      selectedCol: [],
      columns: [],
      accessCycle: 'other'
    }
  }

  handleAccessCycleChange = (accessCycle) => {
    this.setState({ accessCycle });
  }

  handleTransferChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  handleAddToTable = () => {
    const { tables } = this.props;
    const { targetKeys } = this.state;
    
    if (targetKeys && targetKeys.length) {
      const tableData = [];
      tables.forEach(table => {
        const { columns } = table;
        if (columns && columns.length) {
            columns.forEach(col => {
              if (targetKeys.includes(table.id + '_' +col.id)) {
                tableData.push({
                  key: table.id + '_' +col.id,
                  id: col.id,
                  tableName: table.name,
                  columnName: col.name
                });
              }
            });
        }
      });
      // console.log(tableData)
      this.setState({
        selectedCol: tableData
      });
    } else {
      message.error('请选择表格列！');
    }
  }

  renderFooter = (props) => {
    return (
      <Button
        size="small"
        style={{ float: 'right', margin: 5 }}
        onClick={this.getMock}
      >
        重置
      </Button>
    );
  }

  renderSetting = () => {
    const { tables } = this.props;
    const { targetKeys, accessCycle } = this.state;

    const tableColumns = [];
    if (tables && tables.length) {
      tables.forEach(table => {
        const { columns } = table;
        if (columns && columns.length) {
            columns.forEach(col => {
              tableColumns.push({
                key: table.id + '_' + col.id,
                // title: '',
                description: `${col.name}`,
                table: tables
              });
            });
        }
      });
    }

    console.log(accessCycle)
    
    return (
      <article className={style.mcColumnSetting}>
        <section>
          <Row >
            <Col className={style.mcMargin5} xl={3} md={12}><span className={style.permSecondaryBox}>访问周期</span></Col>
            <Col className={style.mcMargin5} xl={5} md={12} offset={1}>
              <Select 
                defaultValue="other" 
                style={{maxWidth: 120}}
                onChange={this.handleAccessCycleChange}
              >
                <Option value="other">其他</Option>
                <Option value="forever">永久</Option>
              </Select>
            </Col>
            {accessCycle === 'other' && (
              <Col className={style.mcMargin5} xl={14} md={20} offset={1}>
                <RangePicker
                  style={{maxWidth: 300}}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['开始时间', '结束时间']}
                />
              </Col>
            )}
          </Row>
        </section>
        <section className={style.mcTransferBox}>
          <Transfer
            titles={['表格可选列表', '已选表格列列表']}
            dataSource={tableColumns}
            showSearch
            listStyle={{
              width: 208,
              height: 300,
            }}
            operations={['导入', '撤回']}
            targetKeys={targetKeys}
            onChange={this.handleTransferChange}
            render={item => `${item.description}`}
            footer={this.renderFooter}
          />
        </section>
        <section className={style.mcColumnSettingAction}>
          <Button onClick={this.handleAddToTable}>添加</Button>
        </section>
      </article>
    );
  }
  
  handleTableColumnDelete = (col) => {
    const { selectedCol } = this.state;
    const list = selectedCol.filter((item) => {
      return item.id !== col.id
    });
    this.setState({
      selectedCol: list
    });
  }

  renderTable () {
    const { selectedCol } = this.state;

    const columns = [{
      title: '序号',
      dataIndex: 'number',
      key: 'number',
      render: (text, record, index) => (
        <span>{index + 1}</span>
      )
    }, {
      title: '表名',
      dataIndex: 'tableName',
      key: 'tableName',
    }, {
      title: '列名',
      dataIndex: 'columnName',
      key: 'columnName',
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <section>
          <Icon type="delete" style={{ fontSize: 14, cursor: 'pointer'}} onClick={(e) => {
            this.handleTableColumnDelete(record);
          }} />
        </section>
      )
    }];

    return (
      <Table
        className={style.mcColumnTable}
        columns={columns}
        dataSource={selectedCol}
      />
    );
  }

  render () {

    return (
      <article className={style.mcTabColumn}>
        <Row>
          <Col xl={10} md={24}>
            {this.renderSetting()}
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

export default McTabColumn