import React, { Component } from 'react';
import {
  Card, Input, Select, Button, message, Modal,
} from 'antd';
import styled from 'styled-components';

import UserService from '../../server/User';

const Root = styled.div`
  padding: 20px 16px;
`;
const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 20px 0;
`;

class Payment extends Component {
  state = {
    type: '支付宝',
    value: '',
    tip: '请在下面输入你的支付宝账号',
    showInput: true,
  }

  componentDidMount() {
    const { history } = this.props;
    if (!UserService.isLogined()) {
      history.push('/login');
    }
  }

  handleSelectChange = (type) => {
    let tip = '';
    let showInput = true;
    let { value } = this.state;
    switch (type) {
      case '支付宝':
        tip = '请在下面输入你的支付宝账号';
        break;
      case '微信':
        tip = '请在下面输入你的微信账号';
        break;
      default:
        value = '';
        tip = '你选择其他方式的话，我们会尽快联系你';
        showInput = false;
        break;
    }
    this.setState({
      type,
      tip,
      value,
      showInput,
    });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      value,
    });
  }

  handleSubmit = () => {
    const { type, value } = this.state;
    const { history } = this.props;
    let payment = type;
    if (type !== '其他') {
      if (value !== '') {
        payment += ` ${value}`;
      } else {
        message.error(`${type}账号不能为空`);
        return;
      }
    }
    Modal.confirm({
      title: '请确认',
      content: `支付方式：${type}, 账号：${value || '无'}`,
      onOk: async () => {
        try {
          await UserService.setPayment(payment);
          message.success('设置成功');
          history.goBack();
        } catch (error) {
          console.error(error);
        }
      },
    });
  }

  render() {
    const {
      type, value, tip, showInput,
    } = this.state;
    return (
      <Root>
        <p>请在下面设置你获取报酬的方式：</p>
        <Card>
          <Wrap>
            <p>支付方式：</p>
            <Select defaultValue={type} onChange={this.handleSelectChange}>
              <Select.Option value="支付宝">支付宝支付</Select.Option>
              <Select.Option value="微信">加微信好友后转账</Select.Option>
              <Select.Option value="其他">请联系我，以其它方式支付</Select.Option>
            </Select>
          </Wrap>
          <Wrap>
            <p>{tip}</p>
            {
              showInput && (
                <Input value={value} onChange={this.handleChange} />
              )
            }
          </Wrap>
          <Button type="primary" block onClick={this.handleSubmit}>提交</Button>
        </Card>
      </Root>
    );
  }
}

export default Payment;
