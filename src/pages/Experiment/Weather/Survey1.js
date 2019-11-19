/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import { Card, message } from 'antd';

import FormLayout from '../../../components/homeForm/FormLayout';
import Types from '../../../components/homeForm/formItemTypes';
import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';

const questionID = 'QFn1L55L';
const step = 1;

class Survey extends Component {
  state = {
    formList: null,
    time: 180,
    disabled: false,
  }

  componentDidMount() {
    this.init();
    this.startTimeDown();
  }

  componentWillUnmount() {
    if (this.time) {
      clearInterval(this.time);
    }
  }

  init = async () => {
    const { hideBtn } = this.props;
    hideBtn();
    try {
      const formList = await QuestionService.getQuestionList(questionID);
      this.setState({
        formList,
      });
    } catch (error) {
      console.warn(error);
    }
  }

  startTimeDown = () => {
    this.time = setInterval(() => {
      const { time } = this.state;
      this.setState({
        time: time - 1,
      }, () => {
        const { time: ti } = this.state;
        if (ti === 0) {
          clearInterval(this.time);
        }
      });
    }, 1000);
  }

  handleSubmit = async (values) => {
    const { expeID, showBtn } = this.props;
    const { time } = this.state;
    if (time !== 0) {
      message.error(`对不起，请等待${time}秒后再提交`);
      return;
    }
    try {
      await ResultService.addResult(expeID, values, step);
      showBtn('已结束，返回首页');
      message.success('提交成功');
      this.setState({
        disabled: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { formList, time, disabled } = this.state;
    return (
      <Card>
        <p>
          该问卷至少需要3分钟才可提交，请在倒计时结束后再提交
        </p>
        <h3>
          倒计时剩余
          {time}
          秒
        </h3>
        <FormLayout
          isDisabled={disabled}
          onSubmit={this.handleSubmit}
          type={Types.RADIO_CHECKBOX}
          titleIsHtml
          formList={formList}
        />
      </Card>
    );
  }
}

export default Survey;
