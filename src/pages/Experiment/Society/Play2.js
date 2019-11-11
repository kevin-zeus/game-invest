import React, { Component } from 'react';
import { Card, message } from 'antd';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';

const questionID = '5dc1387f12215f0091d7d64d';
const money = 20;
const step = 2;

class Play2 extends Component {
  state = {
    disabled: false,
    formList: null,
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const no = Math.floor(Math.random() * 100);
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

  handleSubmit = async (values) => {
    const { expeID, showBtn } = this.props;
    const { formList } = this.state;
    const { field } = formList[0];
    const val = { ...values[field] }; // {guessValue, value}

    const tempObj = {};
    const otherRealValue = Math.floor(Math.random() * 20); // 服务器模拟的对方真实值
    let { value, guessValue } = val;
    value = parseInt(value, 10);
    guessValue = parseInt(guessValue, 10);

    tempObj[`${field}${step}`] = value; // 玩家填的值
    tempObj[`${field}${step}_guess`] = guessValue; // 玩家猜测的值
    tempObj[`${field}${step}_payoff`] = 0.8 * (value + otherRealValue) + (20 - value); // 玩家收益
    tempObj[`${field}${step}_guess_payoff`] = 20 - Math.abs(guessValue - otherRealValue); // 玩家猜测收益

    await ResultService.addResult(expeID, tempObj, step);
    message.success('提交成功');
    this.setState({
      disabled: true,
    });
    showBtn();
  }

  render() {
    const { disabled, formList } = this.state;
    return (
      <Card>
        <h3>游戏二</h3>
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
        />
      </Card>
    );
  }
}

export default Play2;
