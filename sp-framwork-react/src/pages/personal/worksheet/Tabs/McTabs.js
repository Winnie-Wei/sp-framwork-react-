import React, { Component } from 'react'
import style from '../index.less'
// import classNames from 'classnames'

import McTabColumn from './McTabColumn'
import McTabSQL from './McTabSQL'
import McTabTablePermission from './McTabTablePermission'

import {
  Tabs
} from 'antd'
const TabPane = Tabs.TabPane;



class McTabs extends Component {
  
  // constructor () {
  //   super();
  // }
    
  renderTab (tab, index) {

    const permProps = this.props;

    switch(tab.key) {
      case 'column':
        return <McTabColumn {...permProps} />;
      case 'sql':
        return <McTabSQL {...permProps} />;
      case 'table':
        return <McTabTablePermission {...permProps} />;
      default:
        return '';
    }
  }

  render () {
    
    const { tabs } = this.props;

    return (
      <Tabs defaultActiveKey="1" className={style.mcTabs}>
        {tabs && tabs.length && tabs.map((tab, index) => {
          return (
            <TabPane tab={tab.name} key={tab.key}>
              {this.renderTab(tab, index)}
            </TabPane>
          );
        })}
      </Tabs>
    )
  }
}
export default McTabs

