import React from 'react'
import { Link } from 'react-router-dom'
import style from './index.less'
import classNames from 'classnames'

import {
  Breadcrumb,
  Row,
  Col,
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  Table,
  Icon,
  message
} from 'antd'
import {McBread} from '../../../components/McBread/index'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

class WorkSheet extends React.Component {

  query () {


    return new Promise((reslve, reject) => {
      setTimeout(() => {
        reslve({
          code: 0,
          success: true
        });
      }, 1500);
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields((err, values) => {
      console.log(err, values);

      this.query().then(res => {
        if (res.success) {
          message.success('查询成功');
        }
      });
    });

  }

  renderForm () {
    const { getFieldDecorator } = this.props.form;
    const name = '', number = '', organization = '';

    const formItemLayout = {
      labelCol: { span: 8},
      wrapperCol: { span: 16},
    };

    const status = [
      { id: 1, name: '全部' },
      { id: 2, name: '处理中' },
      { id: 3, name: '已完成' },
      { id: 4, name: '已取消' },
      { id: 5, name: '已撤回' },
      { id: 6, name: '审核不通过' }
    ];
    const options = status.map(opt => <Option key={opt.id} value={opt.id}>{opt.name}</Option>);

    return (
      <article className={style.wsForm}>
          <Form onSubmit={this.handleFormSubmit}>
              <Row>
                  <Col span={9}>
                    <FormItem
                      label="申报名称"
                      colon={false}
                      {...formItemLayout}
                    >
                      {getFieldDecorator('name', 
                        {
                          initialValue: name,
                          rules: [
                            // { required: true, message: '请输入申报名称！' }, 
                            { whitespace: true, message: '申报名称不可为空！'}
                          ]
                        }
                      )(
                        <Input
                          placeholder=""
                          style={{width: 260}}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={10}>
                    <FormItem
                      label="经办状态"
                      colon={false}
                      {...formItemLayout}
                    > 
                      {getFieldDecorator('status', 
                        {
                          initialValue: 1
                        }
                      )(
                        <Select
                          style={{width: 260}}
                        >
                          {options}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
              </Row>
              <Row>
                  <Col span={9}>
                    <FormItem
                      label="工单编号"
                      colon={false}
                      {...formItemLayout}
                    >
                      {getFieldDecorator('number', 
                        {
                          initialValue: number,
                          rules: [
                            // { required: true, message: '请输入工单编号！' }, 
                            { whitespace: true, message: '工单编号不可为空！'}
                          ]
                        }
                      )(
                        <Input
                          placeholder=""
                          style={{width: 260}}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={10}>
                    <FormItem
                      label="申请人/单位"
                      colon={false}
                      {...formItemLayout}
                    >
                      {getFieldDecorator('organization', 
                        {
                          initialValue: organization,
                          rules: [
                            // { required: true, message: '请输入申请人或单位！' }, 
                            { whitespace: true, message: '申请人或单位不可为空！'}
                          ]
                        }
                      )(
                        <Input
                          placeholder=""
                          style={{width: 260}}
                        />
                      )}
                    </FormItem>
                  </Col>
              </Row>
              <Row>
                <Col span={9}>
                  <FormItem
                      label="申请时间"
                      colon={false}
                      {...formItemLayout}
                    >
                      {getFieldDecorator('dateTime',)(
                        <RangePicker
                          showTime={{ format: 'HH:mm' }}
                          format="YYYY-MM-DD HH:mm"
                          placeholder={['开始时间', '结束时间']}
                          style={{width: 260}}
                        />
                      )}
                    </FormItem>
                </Col>
                <Col span={9}>
                  <Button type="primary" style={{ float: 'right', marginRight: 20 }} htmlType="submit">查询</Button>
                </Col>
              </Row>
          </Form>
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
      title: '申报名称',
      dataIndex: 'Name',
      key: 'Name',
    }, {
      title: '工单编号',
      dataIndex: 'orderNumder',
      key: 'orderNumder',
    }, {
      title: '当前环节',
      dataIndex: 'process',
      key: 'process'
    }, {
      title: '当前处理人',
      dataIndex: 'transactor',
      key: 'transactor'
    }, {
      title: '申请人/单位',
      dataIndex: 'organization',
      key: 'organization'
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    }, {
      title: '经办状态',
      dataIndex: 'status',
      key: 'status'
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <section>
          <Icon type="edit" style={{ fontSize: 14, cursor: 'pointer'}} onClick={(e) => {
            this.editDepartment(record);
          }} />
          <Icon type="file-text" />
          <Icon type="close-circle-o" />
        </section>
      )
    }];

    const data = [{
      key: '1',
      id: 21,
      Name: '用户注册',
      orderNumder: 201804111,
      process: '账户开通',
      transactor: '张三',
      organization: '张三/美创',
      createTime: '2018.3.21',
      status: '处理中'
    }, {
      key: '2',
      id: 22,
      Name: '用户注册',
      orderNumder: 201804111,
      process: '账户开通',
      transactor: '张三',
      organization: '张三/美创',
      createTime: '2018.3.21',
      status: '处理中'
    }, {
      key: '3',
      id: 23,
      Name: '用户注册',
      orderNumder: 201804111,
      process: '账户开通',
      transactor: '张三',
      organization: '张三/美创',
      createTime: '2018.3.21',
      status: '处理中'
    }];
    
    return (
      <article className={style.wsTable}>
          <Row>
            <Col>
              <Link to='/app/personal/worksheet/initiating'><Button className={style.initiate}>业务申请</Button></Link>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={data}
          />
      </article>
    );
  }

  render () {
    return (
      <React.Fragment>
        <Breadcrumb>
          {McBread(this.props)}
        </Breadcrumb>
        <Row className={classNames('main-content', style.workSheet)} >
          <section className='main-title'>我的工单</section>
          {this.renderForm()}
          {this.renderTable()}          
        </Row>
      </React.Fragment>
    )
  }
}
// export default WorkSheet
export default Form.create()(WorkSheet)
