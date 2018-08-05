import { Icon, Layout, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import * as React from 'react';

export default class SidebarContainer extends React.PureComponent {
  public render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible={true}
        >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="user"/>
              <span> Users </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {this.props.children}
        </Layout>
      </Layout>
    )
  }
}
