import { Icon, Layout, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { StartupActions } from '../../store/reducers/startupReducer';

interface IProps {
  dashboardLoad: () => any;
}

class SidebarContainer extends React.PureComponent<IProps & RouteComponentProps<{}>> {
  public componentDidMount() {
    this.props.dashboardLoad();
  }

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

            <Menu.Item key="/dashboard/organization">
              <Link to="/dashboard/organization">
                <Icon type="global"/>
                <span> Organization </span>
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

export default compose(
  withRouter,
  connect(null, (dispatch: Dispatch) => bindActionCreators({
    dashboardLoad: StartupActions.dashboardLoad
  }, dispatch))
)(SidebarContainer);
