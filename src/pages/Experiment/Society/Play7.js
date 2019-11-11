import React, { Component } from 'react';
import { Card, Modal, message } from 'antd';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';

const questionID = '5dc1386ea91c9300939d9ba4';
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

  handleSubmit = (values) => {
    const { expeID, showBtn } = this.props;
    const { formList } = this.state;
    const { field } = formList[0];

    if (+values[field] < 0 || +values[field] > money || !values[field]) {
      message.error('金额不能为空且必须为0~200的数字');
      return;
    }

    const value = [];
    value[`${field}_10times`] = parseInt(value[field], 10);

    Modal.confirm({
      title: '提示',
      content: `你的分享钱数是${values[field]}，是否确定？`,
      okText: '确认提交',
      cancelText: '返回重填',
      onOk: async () => {
        try {
          // 计算玩家收益 20-value
          value[`${field}_payoff_10times`] = money - value[field];

          await ResultService.addResult(expeID, value, step);
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
          type={FormTypes.INPUT}
          formList={formList}
          titleIsHtml
          withConfirm={false}
          attr={{
            disabled,
          }}
        />
      </Card>
    );
  }
}

export default Play7;
