import React, { Component } from 'react';
import { Card, Modal, message } from 'antd';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';

const questionID = '5dc1386ea91c9300939d9ba4';
const money = 20;
const step = 1;

class Play1 extends Component {
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

  handleSubmit = (values) => {
    const { expeID, showBtn } = this.props;
    const { formList } = this.state;
    const { field } = formList[0];
    const value = { ...values };

    if (+value[field] < 0 || +value[field] > money) {
      message.error(`所填金额不正确，不能为负数或大于${money}`);
      return;
    }

    if (!value[field]) value[field] = 0;

    Modal.confirm({
      title: '提示',
      content: `你的分享钱数是${value[field]}，是否确定？`,
      onOk: async () => {
        // 计算玩家收益 20-value
        value[`${field}_payoff`] = money - value[field];

        await ResultService.addResult(expeID, value, step);
        message.success('提交成功');
        this.setState({
          disabled: true,
        });
        showBtn();
      },
    });
  }

  render() {
    const { disabled, formList } = this.state;
    return (
      <Card>
        <h3>游戏一</h3>
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

export default Play1;
