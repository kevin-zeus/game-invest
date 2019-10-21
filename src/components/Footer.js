import React from 'react';
import { Layout, Divider } from 'antd';

const { Footer } = Layout;

const style = {
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#989898'
}

const pStyle = {
  margin: 0,
  lineHeight: '20px',
  fontSize: 14
}

export default function FooterPage() {
  return (
    <Footer style={style}>
      <p style={pStyle}>紫薯软件工作室 · 西南民族大学</p>
      <Divider>·</Divider>
      <p style={pStyle}>提供技术支持</p>
    </Footer>
  );
}