import React from 'react'

import {
  TreeSelect
} from 'antd'
const TreeNode = TreeSelect.TreeNode;


class DepartmentDropdown extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      nodeList: [],
      nullNode: {id: -1, name: '无'}
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

  handleChange = (value) => {
    // value, label, extra
    const { nodeList, nullNode } = this.state;
    const intValue = parseInt(value, 0);
    let selectedNode = nodeList.find(item => intValue === item.id);
    if (intValue === -1) {
      selectedNode = nullNode
    } 
    this.props.handleChange(selectedNode);
  }

  renderNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            key={item.id}
            title={item.name}
            value={item.id + ''}
          >
            {this.renderNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={item.name} value={item.id + ''} />;
    });
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

  getParentName () {
    const { DeptData, parentId } = this.props;
    if (parentId === -1) return '';
    let parentNode = null;
    if (parentId) {
      let flatten = (currentNode) => {
        if (!currentNode) return;
        if (parentId === currentNode.id) {
          parentNode = currentNode;
        }
        if (currentNode.children) {
          currentNode.children.map(n => flatten(n))
        }
      }
      flatten(DeptData[0]);
      return parentNode.name;
    } else {
      return '';
    }
  }

  render () {
    const { className, DeptData } = this.props;
    const { nullNode } = this.state;
    let nodes = [nullNode];
    if (DeptData && DeptData.length) {
      nodes = nodes.concat(DeptData);
    }
    const currentParentName = this.getParentName();
    return (
      <TreeSelect
        className={className}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择部门"
        value={currentParentName}
        onChange={this.handleChange}
      >
        {this.renderNodes(nodes)}
      </TreeSelect>
    );
  }
}

export default DepartmentDropdown
