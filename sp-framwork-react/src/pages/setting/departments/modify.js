import React from 'react'
import { Breadcrumb } from 'antd'
import {McBread} from '../../../components/McBread/index'

import DeptTree from './DepartmentTree'
import DeptDropdown from './DepartmentDropdown'

// import DeptTree from './Department'


import classNames from 'classnames'
import style from './index.less'
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  message
} from 'antd'
const FormItem = Form.Item;


const treeData = [{
          id: 111,
          name: '美创',
          children: [
            {
              id: 21,
              name: '研发中心',
              creator: '张三',
              createTime: '2018-04-24',
              parentId: 111,
              children: [
                {
                  id: 211,
                  name: '产品部',
                  creator: '李四'
                },
                {
                  id: 212,
                  name: '设计部',
                  creator: '陈无'
                },
                {
                  id: 213,
                  name: '研发部',
                  creator: 'yangliu'
                },
                {
                  id: 214,
                  name: '超长名字测试超长名字测试超长名字测试超长名字测试',
                  children: [{
                    id: 1111,
                    name: '美创',
                    children: [
                      {
                        id: 121,
                        name: '研发中心',
                        children: [
                          {
                            id: 1211,
                            name: '产品部'
                          },
                          {
                            id: 1212,
                            name: '设计部'
                          },
                          {
                            id: 1213,
                            name: '研发部'
                          },
                          {
                            id: 1214,
                            name: '超长名字测试超长名字测试超长名字测试超长名字测试'
                          }
                        ]
                      },
                      {
                        id: 122,
                        name: '市场部',
                        children: [
                          {
                            id: 1221,
                            name: '杭州'
                          },
                          {
                            id: 1222,
                            name: '上海'
                          }
                        ]
                      },
                      {
                        id: 123,
                        name: '销售部',
                        children: [
                          {
                            id: 1231,
                            name: '广州'
                          },
                          {
                            id: 1232,
                            name: '珠海'
                          }
                        ]
                      }
                    ]
                  }]
                }
              ]
            },
            {
              id: 22,
              name: '市场部',
              createTime: '',
              parentId: 111,
              children: [
                {
                  id: 221,
                  name: '杭州'
                },
                {
                  id: 222,
                  name: '上海'
                }
              ]
            },
            {
              id: 23,
              name: '销售部',
              parentId: 111,
              children: [
                {
                  id: 231,
                  name: '广州'
                },
                {
                  id: 232,
                  name: '珠海'
                }
              ]
            }
          ]
        }]

class DepartmentModify extends React.Component {
  constructor () {
    super()

    this.state = {
      departments: [],
      currentDept: {
        name: '',
        parentId: -1,
        creator: '',
        createTime: ''
      },
      status: {
        deptDeleteLoding: false,
        deptCreateloding: false,
        modifyDeptLoding: false
      }
    };
  }

  getDepartments () {
    // 获取数据
    const { match: { params } } = this.props;

    // 判断id
    // params.id

    // ajax

    this.setState({
      departments: treeData
    });

    // 设置选中节点
    if (params && params.id) {
      this.selectedNode(params.id, treeData);
    }

    // return new Promise((reslve, reject) => {
    //   reslve(treeData)
    // });
  }
  
  setDepartment (department) {
    let { currentDept } = this.state;
    this.setState({
      currentDept: Object.assign(currentDept, department)
    });
  }

  delDepartment (department) {

    return new Promise((reslve, reject) => {

      setTimeout(() => {
        reslve({
          code: 0,
          success: true
        });
      }, 1500);
    });
  }

  modifyDepartment (department) {

    return new Promise((reslve, reject) => {
      setTimeout(() => {
        reslve({
          code: 0,
          success: true
        });
      }, 1500);
    });
  }

  selectedNode = (paramsId, treeData) => {
    let node = null;
    let selectedMark = false;
    paramsId = parseInt(paramsId, 0);
    const findTreeNode = (item) => {
      if (selectedMark) return;
      if (paramsId === item.id) {
        node = item;
        selectedMark = true;
      }
      if (item.children) {
        item.children.map(child => findTreeNode(child))
      }
    }
    findTreeNode(treeData[0]);
    this.setDepartment(node);
  }

  componentWillMount() {
    this.getDepartments()
  }

  handleTreeNodeClick = (node) => {
    // 选中部门
    this.setDepartment(node);
  }

  handleCreateDepartment = () => {
    const { currentDept } = this.state;

    // 默认参数
    const newDepartment = {
      id: currentDept.id + 1,
      name: '未命名',
      creator: '张三',
      createTime: '2018-04-19',
      parentId: currentDept.id
    }

    this.setDepartment(newDepartment);
  }

  handleDeleteDepartment = () => {
    const { status, currentDept } = this.state;
    status.deptDeleteLoding = !status.deptDeleteLoding;
    this.setState({
      status: Object.assign({}, status)
    });

    this.delDepartment(currentDept).then(json => {
      if (json && json.success) {
        message.success('删除成功');
        status.deptDeleteLoding = false;
        this.setState({
          status: Object.assign({}, status)
        });
      } else {
        message.error('删除失败');
      }
    });
  }

  renderTree = () => {

    const { match: { params } } = this.props;
    const { status: { deptDeleteLoding, deptCreateloding } } = this.state;
    const defaultSelectedKeys = [];
    if (params && params.id) {
      defaultSelectedKeys.push(params.id);
    }

    const treeClass = '';

    return (
      <article className={style.dptFramework}>
        <section className={style.dptTreeTitle}>部门架构</section>
        <section className={style.dptTreeBox}>
          <DeptTree
            className={treeClass}
            DeptData={treeData}
            defaultSelectedKeys={defaultSelectedKeys}
            onSelectNode={this.handleTreeNodeClick}
          />
        </section>
        <section className={style.dptTreeMenus}>
          <Button loading={deptDeleteLoding} onClick={this.handleDeleteDepartment}>删除</Button>
          <Button loading={deptCreateloding} onClick={this.handleCreateDepartment} type="primary" style={{ marginLeft: 8 }}>新增</Button>
        </section>
      </article>
    )
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields((err, values) => {
      this.modifyDepartment().then(res => {
        if (res.success) {
          message.success('修改成功');
        }
      });
    });
  }

  handleParentDeptChange = (parentDept) => {
    if (parentDept) {
      let { currentDept } = this.state;
      currentDept.parentId = parentDept.id;
      this.setState({
        currentDept: currentDept
      });
    }
  }

  handleChangeDeptName = () => {
    
  }

  handleChangeDeptCreator = () => {

  }

  renderForm = () => {

    const { getFieldDecorator } = this.props.form;
    const { currentDept: { creator, parentId, createTime, name } } = this.state;

    const formItemLayout = {
      labelCol: { span: 8},
      wrapperCol: { span: 16},
    };

    return (

      <article className={style.dptModifyBox}>
        <section className={style.dptModifyTitle}>部门修改</section>
        <section>
          <Form className={style.dptModifyForm} onSubmit={this.handleFormSubmit}>
            <Row>
              <Col span={12}>
                <FormItem
                  label="部门名称"
                  colon={false}
                  {...formItemLayout}
                >
                  {getFieldDecorator('deptName', 
                    {
                      initialValue: name,
                      rules: [
                        { required: true, message: '请输入部门名称！' }, 
                        { whitespace: true, message: '部门名称不可为空！'}
                      ]
                    }
                  )(
                    <Input
                      placeholder=""
                    />
                  )}
                    
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="上级部门"
                  colon={false}
                  {...formItemLayout}
                >
                  <DeptDropdown 
                    className={style.deptDropdown}
                    parentId={parentId}
                    DeptData={treeData}
                    handleChange={this.handleParentDeptChange}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="创建人"
                  colon={false}
                  {...formItemLayout}
                >
                  {getFieldDecorator('creator', 
                    {
                      initialValue: creator,
                      rules: [
                        { required: true, message: '请输入创建人！' }, 
                        { whitespace: true, message: '创建人不可为空！'}
                      ]
                    }
                  )(
                    <Input
                      placeholder=""
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="创建时间"
                  colon={false}
                  {...formItemLayout}
                >
                    <Input 
                      value={createTime}
                      readOnly
                    />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">保存</Button>
                <Button style={{ marginLeft: 8 }}>取消</Button>
            </Col>
            </Row>
          </Form>
        </section>
      </article>
    )
  }

  render () {

    return (
      <React.Fragment>
        <Breadcrumb>
          {McBread(this.props)}
        </Breadcrumb>
        <article className={classNames('main-content', style.dptModify)}>
          <section className={style.dptTitle}>
            <h2>部门修改</h2>
          </section>
          <section>
            <Row>
              <Col span={9}>
                  {this.renderTree()}
              </Col>
              <Col span={15}>
                {this.renderForm()}
              </Col>
            </Row>
          </section>
        </article>
      </React.Fragment>
    )
  }
}
// export default DepartmentModify
export default Form.create()(DepartmentModify)
