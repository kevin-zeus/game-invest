/**
 * 游戏2有通过localStorage存储了一些数据，供第5个游戏使用
 */
import React, { Component } from 'react';
import { Card, message, Modal } from 'antd';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';

const questionID = 'x816E00E';
const money = 200;
const step = 7;

class Play7 extends Component {
  state = {
    disabled: false,
    formList: null,
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const { hideBtn } = this.props;
    hideBtn();

    const no = Math.floor(Math.random() * 90) + 9;
    localStorage.setItem('play8_no', no);
    const formList = await QuestionService.getQuestionList(questionID);
    let title = formList[0].title || '';
    title = title.replace(/{no}/g, no);
    title = title.replace(/{money}/g, money);
    title = title.replace(/\n/g, '<br/>');
    formList[0].title = title;
    this.setState({
      formList,
    });
  }

  handleSubmit = (values) => {
    const { expeID, showBtn } = this.props;
    const { formList } = this.state;
    const { field } = formList[0];
    const val = { ...values[field] }; // {guessValue, value}

    const tempObj = {};
    const otherRealValue = Math.floor(Math.random() * money); // 服务器模拟的对方真实值
    let { value, guessValue } = val;
    value = parseInt(value, 10);
    guessValue = parseInt(guessValue, 10);

    localStorage.setItem('play8_value', value);
    localStorage.setItem('play8_guess', guessValue);

    tempObj[`${field}_10times`] = value; // 玩家填的值
    tempObj[`${field}_guess_10times`] = guessValue; // 玩家猜测的值
    tempObj[`${field}_payoff_10times`] = 0.8 * (value + otherRealValue) + (20 - value); // 玩家收益
    tempObj[`${field}_guess_payoff_10times`] = 20 - Math.abs(guessValue - otherRealValue); // 玩家猜测收益

    tempObj[`${field}_payoff_10times`] = tempObj[`${field}_payoff_10times`].toFixed(2);
    tempObj[`${field}_guess_payoff_10times`] = tempObj[`${field}_guess_payoff_10times`].toFixed(2);

    Modal.confirm({
      title: '提示',
      content: `请确认猜测对方投入金额${guessValue}元，你的投入额为${value}元`,
      okText: '确认提交',
      cancelText: '返回重填',
      onOk: async () => {
        try {
          await ResultService.addResult(expeID, tempObj, step);
          message.success('提交成功');
          this.setState({
            disabled: true,
          });
          showBtn();
        } catch (error) {
          console.error(error.message);
        }
      },
    });
  }

  render() {
    const { disabled, formList } = this.state;
    return (
      <Card>
        <h3>游戏七</h3>
        <FormLayout
          isDisabled={disabled}
          onSubmit={this.handleSubmit}
          type={FormTypes.DOUBLE_INPUT}
          formList={formList}
          titleIsHtml
          withConfirm={false}
          attr={{
            disabled,
            labels: [
              '猜测对方投入金额',
              '你的投入金额',
            ],
            money,
          }}
          rules={[
            {
              required: true,
              message: '请填写完整',
            },
          ]}
        />
      </Card>
    );
  }
}

export default Play7;
