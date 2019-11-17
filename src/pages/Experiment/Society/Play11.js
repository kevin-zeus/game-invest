import React, { Component } from 'react';
import { Card, message, Modal } from 'antd';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';

const questionID = 'S5Ug4114';
const money = 200;
const step = 11;
const num = '八';

class Play11 extends Component {
  state = {
    disabled: false,
    formList: null,
  }

  componentDidMount() {
    this.tip();
  }

  init = async () => {
    const { hideBtn } = this.props;
    hideBtn();

    const no = localStorage.getItem('play2_no');
    const value = localStorage.getItem('play2_value');
    const guess = localStorage.getItem('play2_guess');
    const formList = await QuestionService.getQuestionList(questionID);
    let title = formList[0].title || '';
    title = title.replace(/{num}/g, num);
    title = title.replace(/{value}/g, value);
    title = title.replace(/{guess}/g, guess);
    title = title.replace(/{no}/g, no);
    title = title.replace(/{money}/g, money);
    title = title.replace(/\n/g, '<br/>');
    formList[0].title = title;
    this.setState({
      formList,
    });
  }

  tip = () => {
    Modal.info({
      title: '随机抽取中...',
      content: (
        <div>
          <p>
            正在你和游戏
            {num}
            的对手中随机抽取一位被试
          </p>
          <p>抽取结果：你被选择成为被试参加本次游戏</p>
        </div>
      ),
      onOk: this.init,
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
    let otherValue = localStorage.getItem('play2_guess');

    const tempObj = {};
    val = parseInt(val, 10);
    otherValue = parseInt(otherValue, 10);

    tempObj[`${field}${step}_10times`] = val; // 玩家填的值
    tempObj[`${field}${step}_payoff_10times`] = 0.8 * (val + otherValue) + (20 - val); // 玩家收益

    tempObj[`${field}${step}_payoff_10times`] = tempObj[`${field}${step}_payoff_10times`].toFixed(2);

    Modal.confirm({
      title: '提示',
      content: `请确认你的新投入额为${val}元`,
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
        <h3>游戏十一</h3>
        <FormLayout
          isDisabled={disabled}
          onSubmit={this.handleSubmit}
          type={FormTypes.INPUT}
          formList={formList}
          titleIsHtml
          withConfirm={false}
          attr={{
            disabled,
            placeholder: '新的投入额',
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

export default Play11;
