import React from 'react';
import { Layout, Divider } from 'antd';

import UserService from '../server/User';

const { Footer } = Layout;

const style = {
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#989898',
};

const pStyle = {
  margin: 0,
  lineHeight: '20px',
  fontSize: 14,
};

export default function FooterPage(props) {
  function navigateToAdmin() {
    const { history } = props;
    if (history) {
      history.push('/admin');
    }
  }

  function logOut() {
    UserService.logout();
    const { history } = props;
    if (history) {
      history.push('/login');
    }
  }

  return (
    <Footer style={style}>
      <Divider>·</Divider>
      <a style={pStyle} href="http://itzishu.cn">Power By 紫薯软件工作室</a>
      <div style={pStyle}>
        <span onClick={navigateToAdmin}>进入后台</span>
        <Divider type="vertical" />
        <span onClick={logOut}>登出系统</span>
      </div>
    </Footer>
  );
}
