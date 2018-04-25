import React, { Component } from 'react'
import style from '../index.less'


import {
  Transfer,
  Checkbox,
  Select,
  DatePicker
} from 'antd'

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;


class McTabTablePermission extends Component {

  constructor () {
    super();

    this.state = {
      targetKeys: [],
      selectedTables: [],
      checkedValues: []
    }
  }
  
  addSelectedTable (selected) {
    const { selectedTables, checkedValues } = this.state;
    selectedTables.push({
      id: selected.id,
      table: selected,
      perms: checkedValues
    });
    this.setState({ selectedTables });
  }

  delSelectTable (id) {
    const { selectedTables } = this.state;
    const list = selectedTables.filter(item => item.id !== id);
    this.setState({
      selectedTables: list
    });
  }

  handleTransferChange = (targetKeys) => {
    this.setState({ targetKeys });
    const { selectedTables } = this.state;
    const selectedKeys = selectedTables.map(item => item.id);
    if (targetKeys.length > selectedTables.length) {
      const { tables } = this.props;
      const addTableId = targetKeys.filter(item => !selectedKeys.includes(item.id));
      this.addSelectedTable(tables.find(item => item.id === addTableId[0]));
    } else {
      const delTableId = selectedKeys.filter(item => !targetKeys.includes(item.id));
      this.delSelectTable(delTableId[0])
    }
  }

  renderTransferItem = (item) => {
    const { targetKeys, selectedTables } = this.state;
    if (targetKeys.includes(item.id)) {
      const selectedItem = selectedTables.find(table => item.id === table.id);
      let permStrings = '';
      if (selectedItem.perms && selectedItem.perms.length) {
        permStrings = '[ ';
        selectedItem.perms.forEach(perm => {
          permStrings += perm + ' ';
        })
        permStrings += ' ]';
      }
      return `${item.name} ${permStrings}`;
    } else {
      return `${item.name}`;
    }
  }

  handleCheckboxChange = (checkedValues) => {
    this.setState({ checkedValues });
  }

  render () {
    const { tables } = this.props;
    const { targetKeys } = this.state;

    const checkOptions = [
      {label: 'select', value: 'select'},
      {label: 'delete', value: 'delete'},
      {label: 'update', value: 'update'},
      {label: 'insert', value: 'insert'}
    ];
    
    return (
      <article className={style.mcTabPerm}>
          <section className={style.permSecondaryBox}>
            <span className={style.permSecondaryTitle}>访问对象</span>
            <CheckboxGroup
              options={checkOptions}
              onChange={this.handleCheckboxChange}
            />
          </section>
          <section>
            <Transfer
              rowKey={record => record.id}
              titles={['可选列表', '已选列表']}
              dataSource={tables}
              showSearch
              listStyle={{
                width: 208,
                height: 300,
              }}
              operations={['导入', '撤回']}
              targetKeys={targetKeys}
              onChange={this.handleTransferChange}
              render={this.renderTransferItem}
              footer={this.renderFooter}
            />
          </section>
          <section className={style.permSecondaryBox}>
            <span className={style.permSecondaryTitle}>访问周期</span>
            <Select defaultValue="other" style={{maxWidth: 120}}>
              <Option value="other">其他</Option>
              <Option value="forever">永久</Option>
            </Select>
            <RangePicker
              style={{maxWidth: 300}}
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['开始时间', '结束时间']}
            />
          </section>
      </article>
    );
  }
}

export default McTabTablePermission