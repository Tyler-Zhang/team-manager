import { Icon, Layout, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class SidebarContainer extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible={true}
        >
          <Menu theme="dark" selectedKeys={[this.props.location.pathname]} mode="inline">
            <Menu.Item key="/dashboard/users">
              <Link to="/dashboard/users">
                <Icon type="user"/>
                <span> Users </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="/dashboard/teams">
              <Link to="/dashboard/teams">
                <Icon type="team"/>
                <span> Teams </span>
              </Link>
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

export default withRouter(SidebarContainer);
