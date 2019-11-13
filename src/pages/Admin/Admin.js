import React, { PureComponent } from 'react';
import {
  message, notification, Layout, Menu, Icon, Button,
} from 'antd';
import styled from 'styled-components';
import {
  Switch, Route, Link, Redirect,
} from 'react-router-dom';

import UserService from '../../server/User';
import routerConfig from './router.config';

const { Sider, Content, Header } = Layout;

const WrapHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #FF9912;
  }
`;

class Admin extends PureComponent {
  state = {
    collapsed: false,
  }

  componentDidMount() {
    this.isTeacher();
    // 根据屏幕窗口宽度，提醒用户在电脑端进行操作
    if (window.innerWidth < 800) {
      notification.open({
        message: '温馨提示',
        description: '为方便后台的功能运行和管理，请在PC端进行操作！',
      });
    }
  }

  // 侧边栏宽度切换按钮
  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  }

  // 判断是否是老师，不是的话不能登录该页
  isTeacher() {
    const { history } = this.props;
    const User = UserService.getCurrentUser();
    if (!User || User.attributes.userType !== 'teacher') {
      history.goBack();
      message.error('对不起，您没有后台权限！');
    }
  }

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { collapsed } = this.state;
    const LogoDiv = styled.div`
      color: #fff;
      font-size: ${collapsed ? '40px' : '24px'};
      text-align: center;
      margin: 16px 0;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    `;
    return (
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <LogoDiv>投资小游戏</LogoDiv>
          <Menu theme="dark" onClick={this.handleMenuChange} mode="inline" defaultSelectedKeys={[routerConfig[0].path]}>
            {
              routerConfig.map((item) => (
                <Menu.Item key={item.path}>
                  <Link to={`/admin${item.path}`}>
                    <Icon type={item.icon} />
                    <span>{item.menu}</span>
                  </Link>
                </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
        <Layout>
          <WrapHeader style={{ background: '#fff' }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Button
              icon="export"
              type="default"
              onClick={this.goHome}
            >
              退出后台
            </Button>
          </WrapHeader>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
            }}
          >
            <Switch>
              {
                routerConfig.map((item) => (
                  <Route key={item.path} path={`/admin${item.path}`} component={item.component} />
                ))
              }
              <Redirect to={`/admin${routerConfig[0].path}`} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
