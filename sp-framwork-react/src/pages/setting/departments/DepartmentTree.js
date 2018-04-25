import React from 'react'
import style from './index.less'

import {
  Tree
} from 'antd'
const TreeNode = Tree.TreeNode;

const DeptTreeNode = (props) => {
    // const cls = props.checked ? 'node-label node-checked' : 'node-label';

    return (
        <section className={style.deptTreeNode}>
            <div className={style.deptTreeNodeName}>{props.name}</div>
        </section>
    )
}

class DepartmentTree extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      nodeList: []
    };
  }

  flattenTreeNode = (tree) => {
    let arr = [];
    let flatten = (node, parentDept) => {
      if (!node) return;
      let currentNode = node;
      if (parentDept) {
        currentNode.parentDepartment = parentDept;
      }
      arr.push(currentNode);
      if (currentNode.children) {
        currentNode.children.map(n => flatten(n, currentNode))
      }
    }
    flatten(tree[0]);
    if (arr.length) {
      this.setState({
        nodeList: arr
      });
    }
  }

  componentWillMount () {

    const { DeptData } = this.props;
    if (DeptData) {
      this.flattenTreeNode(DeptData);
    }
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            key={item.id} 
            dataRef={item}
            title={DeptTreeNode(item)}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={DeptTreeNode(item)} key={item.id} dataRef={item} />;
    });
  }

  handleSelect = (selectedKeys, e) => {
    // { selected, selectedNodes, node, event }
    const { selected } = e;
    if (selected) {
      const { nodeList } = this.state;
      const nodeId = parseInt(selectedKeys[0], 0);
      let selectedNode = nodeList.find(item => nodeId === item.id);
      this.props.onSelectNode(selectedNode);
    }
  }

  render () {
    const { DeptData } = this.props;
    // 默认展开一级节点
    const defaultExpandedKeys = [DeptData[0].id + ''];



    return (
         <Tree
          showLine
          defaultExpandedKeys={defaultExpandedKeys}
          onSelect={this.handleSelect}
          {...this.props}
        >
          {this.renderTreeNodes(DeptData)}
        </Tree>
    )
  }
}
// export default DepartmentModify
export default DepartmentTree
