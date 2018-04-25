import React from 'react'

import style from './index.less'

import childrens from './childrens'

import {
  Dropdown,
  Menu,
  Button,
  Tree,
  Icon
} from 'antd'
const SubMenu = Menu.SubMenu;
const TreeNode = Tree.TreeNode;


class DeptTree extends React.Component {
    constructor () {
        super()
    }

    render () {
        const { DeptData, renderNodes } = this.props;
        // 默认展开一级节点
        const defaultExpandedKeys = [DeptData[0].id + ''];

        return (
             <Tree
              showLine
              defaultExpandedKeys={defaultExpandedKeys}
              onSelect={this.onSelect}
              onCheck={this.onCheck}
              className={style.deptTree}
            >
              {renderNodes(DeptData)}
            </Tree>
        );
    }
}

// export childrens(() => <TreeNode /> )(deptTree)
function treeNode () {
  return (
      <TreeNode />
  );
}
export default childrens(treeNode)(DeptTree);



class DepartmentDropdown extends React.Component {

  constructor () {
    super()
  }

  renderNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={item.name}
          >
            {this.renderNodes(item.children)}
          </SubMenu>
        );
      }
      return <Menu.Item key={item.id}>{item.name}</Menu.Item>;
    });
  }

  render () {

    const { className, DeptData } = this.props;
    const parentDepartment = '父级部门';
    const menu = (
      <Menu>{this.renderNodes(DeptData)}</Menu>
    );

    return (
         <Dropdown overlay={menu} placement="bottomLeft">
          <Button className={className}>{parentDepartment}</Button>
        </Dropdown>
    );
  }
}
