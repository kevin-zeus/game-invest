import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Input, Icon, Button, message,
} from 'antd';
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

class Register extends Component {
  state = {
    isLoading: false,
  }

  handleSubmit = (e) => {
    const { history, form } = this.props;
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    form.validateFields((err, values) => {
      if (!err) {
        UserService.register(values).then(() => {
          message.success('注册成功！请在登录页进行登录...');
          history.push('/login');
          this.setState({
            isLoading: false,
          });
        }).catch(() => {
          message.error('学号已经被注册过了，请不要重复注册！');
          this.setState({
            isLoading: false,
          });
        });
      }
    });
  }

  render() {
    const { isLoading } = this.state;
    const { form: { getFieldDecorator, getFieldsError } } = this.props;
    return (
      <WrapDiv>
        <h1>注册</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="姓名">
            {
              getFieldDecorator('realname', {
                rules: [{ required: true, message: '请填写姓名' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入你的姓名"
                />
              )
            }
          </FormItem>
          <FormItem label="学号">
            {
              getFieldDecorator('username', {
                rules: [
                  { required: true, message: '请输入学号' },
                  { pattern: /^[0-9]*$/, message: '学号应该为纯数字' },
                  { len: 12, message: '学号应该为12位' },
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
                />
              )
            }
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
              loading={isLoading}
              block
            >
              注册
            </Button>
          </FormItem>
        </Form>
        <Link to="/login">已有账号？去登录</Link>
      </WrapDiv>
    );
  }
}

export default Form.create()(Register);
