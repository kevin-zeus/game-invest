import React, { Component } from 'react';
import { Card, message, Modal } from 'antd';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';

const questionID = '5dc1391ca91c9300939d9c76';
const money = 20;
const step = 6;
const result = 25; // (20 - 10) + 10 * 1.5 = 25

class Play6 extends Component {
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

    const formList = await QuestionService.getQuestionList(questionID);
    let title = formList[0].title || '';
    title = title.replace(/{money}/g, money);
    title = title.replace(/{result}/g, result);
    title = title.replace(/\n/g, '<br/>');
    formList[0].title = title;
    this.setState({
      formList,
    });
  }

  handleSubmit = (values) => {
    // values 为 {PGC: '123'}
    const { expeID, showBtn } = this.props;
    const { formList } = this.state;
    const { field } = formList[0];
    if (+values[field] < 0 || +values[field] > money || !values[field]) {
      message.error('金额不能为空且必须为0~200的数字');
      return;
    }
    let val = values[field]; // 123

    const tempObj = {};
    val = parseInt(val, 10);

    // 随机计算方式：
    const a = [1, 2, 3, 4, 5];
    const index = Math.floor(Math.random() * 5);
    let payoff = 0;
    switch (a[index]) {
      case 1: {
        payoff = money - val;
        break;
      }
      case 2: {
        payoff = (money - val) + (val * 0.5);
        break;
      }
      case 3: {
        payoff = money;
        break;
      }
      case 4: {
        payoff = (money - val) + (val * 1.5);
        break;
      }
      case 5: {
        payoff = (money - val) + (val * 2);
        break;
      }
      default: break;
    }

    tempObj.riskinvest = val; // 玩家填的值
    tempObj.riskinvest_payoff = payoff;

    tempObj.riskinvest_payoff = tempObj.riskinvest_payoff.toFixed(2);

    Modal.confirm({
      title: '提示',
      content: `请确认你的博彩金额为${val}元`,
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
        <h3>游戏六</h3>
        <FormLayout
          isDisabled={disabled}
          onSubmit={this.handleSubmit}
          type={FormTypes.INPUT}
          formList={formList}
          titleIsHtml
          withConfirm={false}
          attr={{
            disabled,
            placeholder: '博彩金额',
            money,
          }}
        />
      </Card>
    );
  }
}

export default Play6;
