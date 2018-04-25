import React from 'react'
import {
  Breadcrumb,
  Row,
  Col,
  Form,
  Select,
  Input,
  Checkbox,
  Button
} from 'antd'
import {McBread} from '../../../components/McBread/index'

import style from './index.less'
import McTabs from './Tabs/McTabs'

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;



const TabsData = [
    {
      key: 'column',
      name: '表格列访问'
    },
    {
      key: 'sql',
      name: 'SQL语句'
    },
    {
      key: 'table',
      name: '表访问许可'
    }
];


const Tables = [
    {
      id: 'table1',
      name: '表1',
      columns: [
        { id: 'col1', name: '列1' },
        { id: 'col2', name: '列2' },
        { id: 'col3', name: '列3' },
        { id: 'col4', name: '列4' },
        { id: 'col5', name: '列5' }
      ]
    },
    {
      id: 'table2',
      name: '表2',
      columns: [
        { id: 'col1', name: '列1' },
        { id: 'col2', name: '列2' },
        { id: 'col3', name: '列3' },
        { id: 'col4', name: '列4' },
        { id: 'col5', name: '列5' }
      ]
    },
    {
      id: 'table3',
      name: '表3',
      columns: [
        { id: 'col1', name: '列1' },
        { id: 'col2', name: '列2' },
        { id: 'col3', name: '列3' },
        { id: 'col4', name: '列4' },
        { id: 'col5', name: '列5' }
      ]
    }
];


class InitiatingWorkOrder extends React.Component {

  constructor () {
    super();

    this.state = {
      tabs: []
    };
  }



  handleFormSubmit = () => {
    const { form: { validateFields } } = this.props;
    
    validateFields((err, values) => {
      
    });
  }

  handleCheckboxsChange = (e) => {
    let tabsdata = [];
    TabsData.forEach(item => {
      if (e.includes(item.key)) {
        tabsdata.push(item);
      }
    });
    this.setState({
      tabs: tabsdata
    });
  }

  renderForm () {
    const { form: { getFieldDecorator } } = this.props;
    const { tabs } = this.state;

    const formItemLayout = {
      labelCol: { span: 8},
      wrapperCol: { span: 16},
    };

    const checkboxGroupLayout = {
      labelCol: { span: 4},
      wrapperCol: { span: 16},
    }

    const types = [
      { id: 1, name: '访问授权' },
      { id: 2, name: '账户开通' },
      { id: 3, name: '准入许可' },
      { id: 4, name: '业务许可' }
    ];
    const options = types.map(opt => <Option key={opt.id} value={opt.id}>{opt.name}</Option>);
    
    const dataBases = [
      {id: 1, name: '数据库1'},
      {id: 2, name: '数据库2'}
    ];
    const dbOptions = dataBases.map(opt => <Option key={opt.id} value={opt.id}>{opt.name}</Option>);
    const checkOptions = TabsData.map(item => {
      return { label: item.name, value: item.key }
    });


    return (
      <Form className={style.initiateForm}>
        <Row>
          <Col span={10}>
            <FormItem
              label="编号"
              colon={false}
              {...formItemLayout}
            >
              {getFieldDecorator('number',
              )(
                <Input
                  placeholder=""
                />
              )}
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem
              label="业务类型"
              colon={false}
              {...formItemLayout}
            > 
              {getFieldDecorator('type', 
                {
                  initialValue: 1
                }
              )(
                <Select>
                  {options}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <FormItem
              label="数据库名字"
              colon={false}
              {...formItemLayout}
            >
              {getFieldDecorator('dataBaseName', 
                {
                  initialValue: 1
                }
              )(
                <Select>
                  {dbOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem
              label="数据库账号"
              colon={false}
              {...formItemLayout}
            > 
              {getFieldDecorator('dataBaseAccess',{
                rules: [
                  { required: true, message: '请输入数据库账号！' }, 
                ]
              }
              )(
                <Input
                  placeholder=""
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={20}>
            <FormItem
              label="访问对象"
              colon={false}
              {...checkboxGroupLayout}
            > 
              {getFieldDecorator('accessObject',{
                rules: [
                  { required: true, message: '请选择访问对象！' }, 
                ]
              }
              )(
                <CheckboxGroup
                  options={checkOptions} 
                  onChange={this.handleCheckboxsChange}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <McTabs
              tabs={tabs}
              tables={Tables}
            />
          </Col>
        </Row>
      </Form>
    );
  }

  render () {
    return (
      <React.Fragment>
         <Breadcrumb>
          {McBread(this.props)}
        </Breadcrumb>
        <Row className='main-content'>
          <section className='main-title'>业务申请</section>
          <section className={style.initiateContent}>
            {this.renderForm()}
          </section>
          <section className={style.initiateAction}>
            <Button type="primary" onClick={this.handleFormSubmit}>保存</Button>
            <Button>取消</Button>
          </section>
        </Row>
      </React.Fragment>
    )
  }
}

// export default InitiatingWorkOrder
export default Form.create()(InitiatingWorkOrder)
