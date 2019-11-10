import React, { Component } from 'react';
import {
  Form, Input, Button, Icon, message,
} from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import UserService from '../../server/User';

const FormItem = Form.Item;
const WrapDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 100px 20px 0 20px;
`;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { history, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        UserService.login(values).then(() => {
          history.push('/');
        }).catch(() => {
          message.error('学号或密码不正确！');
        });
      }
    });
  }

  render() {
    const { form: { getFieldDecorator, getFieldsError } } = this.props;
    return (
      <WrapDiv>
        <h1>登录</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="学号">
            {
              getFieldDecorator('username', {
                rules: [
                  { required: true, message: '请输入学号' },
                ],
              })(
                <Input
                  prefix={<Icon type="contacts" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入你的学号"
                />
              )
            }
          </FormItem>
          <FormItem label="密码">
            {
              getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码' },
                  { pattern: /^[0-9a-zA-Z.]*$/, message: '密码只允许大小写字母加数字格式' },
                  { min: 6, message: '密码最短6位' },
                  { max: 16, message: '密码最长16位' },
                ],
              })(
                <Input.Password
                  prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入你的密码"
                />,
              )
            }
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
              block
            >
              登录
            </Button>
          </FormItem>
        </Form>
        <Link to="/register">没有账号？先去注册</Link>
      </WrapDiv>
    );
  }
}

export default Form.create()(Login);
