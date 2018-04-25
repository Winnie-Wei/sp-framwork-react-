import React from 'react'
import {
  Breadcrumb,
  Row,
  Form,
  Input,
  Button,
  Tabs,
  Tree,
  Tag,
  Tooltip
} from 'antd'
import {McBread} from '../../../components/McBread/index'
import {Link} from 'react-router-dom'
const FormItem = Form.Item
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const treeData = [{
  title: '0-0',
  key: '0-0',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' },
      { title: '0-0-0-2', key: '0-0-0-2' },
    ],
  }, {
    title: '0-0-1',
    key: '0-0-1',
    children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
      { title: '0-0-1-2', key: '0-0-1-2' },
    ],
  }, {
    title: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: '0-1',
  key: '0-1',
  children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' },
  ],
}, {
  title: '0-2',
  key: '0-2',
}];
class McTreeSelect extends React.Component {
  constructor () {
    super()
    this.checkNode = []
    this.nodeList = []
  }
  state = {
    autoExpandParent: true,
    checkedKeys: [],
    showKeys: []
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys,e) => {
    console.log('onCheck', e);
    this.checkNode = e.checkedNodesPositions
    let showKeys = checkedKeys
    this.checkNode.forEach(d => {
      if (d.node.props.children) {
        d.node.props.children.forEach(c => {
          showKeys = showKeys.filter(a => a !== c.key);
        })
      }
    })
    
    this.setState({ checkedKeys, showKeys});
  }
  deepTraversal (node) {  
    if (node != null) {  
      this.nodeList.push(node.key);
            var children = node.props.children;
            if (children) {
              for (var i = 0; i < children.length; i++)  
              this.deepTraversal(children[i]);   
            }     
        }    
    return this.nodeList;
  }  
  handleClose = (removedTag) => {
    let tree = this.checkNode.filter(c=>c.node.key === removedTag)[0].node
    this.nodeList = []
    let node = this.deepTraversal(tree)
    let checkedKeys = this.state.checkedKeys
    node.forEach(d=>{
      checkedKeys = checkedKeys.filter(tag => tag !== d);
    }) 
    this.setState({ checkedKeys });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  render() {
    return (
      <div>
        <div>
        {this.state.showKeys.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        </div>
      <Tree
        checkable
        onExpand={this.onExpand}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
      </div>
    );
  }
}

class RolesSettingPage extends React.Component {
  constructor () {
    super()
    this.state = {
      list: [],
      loading: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <React.Fragment>
        <div className='main-content'>
          <Row className='main-title'>
            角色权限
          </Row>
          <Row style={{border:'1px solid #e9e9e9',padding: '20px'}}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem 
              {...formItemLayout}
              label='角色名称' colon={false}>
                <Input placeholder='请输入' />
              </FormItem>
              <FormItem 
              {...formItemLayout}
              label='角色描述' colon={false}>
                <Input.TextArea />
              </FormItem>
              <Row>
              <Tabs defaultActiveKey="1" >
                <TabPane tab="功能权限" key="1"><McTreeSelect/></TabPane>
                <TabPane tab="数据库权限" key="2"><McTreeSelect/></TabPane>
              </Tabs>
              </Row>
            </Form>
          </Row>
          <Row style={{textAlign: 'center',marginTop: '30px'}}>
            <Button type='primary' style={{marginRight:'20px'}}>保存</Button>
            <Link to='/app/users/roles' className='ant-btn' style={{verticalAlign:'top'}}>取消</Link>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}
export default RolesSettingPage
