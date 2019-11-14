/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import { Card, message } from 'antd';

import FormLayout from '../../../components/homeForm/FormLayout';
import Types from '../../../components/homeForm/formItemTypes';
import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';

const questionID = '5dcbacf343c257007f5e2d14';
const step = 9;

class Table9 extends Component {
  state = {
    formList: null,
    time: 30,
    disabled: false,
  }

  componentDidMount() {
    this.init();
    this.startTimeDown();
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
    const { time } = this.state;
    const { showBtn, expeID } = this.props;
    if (time !== 0) {
      message.error(`对不起，${time}秒之后才可提交，请再仔细思考各个选项`);
      return;
    }
    const fields = Object.keys(values);
    const resultObj = {};
    fields.forEach((field) => {
      resultObj[field] = values[field][1];
      resultObj[`${field}_payoff`] = values[field][0];
    });
    try {
      await ResultService.addResult(expeID, resultObj, step);
      message.success('提交成功');
      showBtn();
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
        <h3>第九页</h3>
        <p>
          该页中有
          {formList && formList.length}
          个小游戏，每个小游戏提供了五个含有几率收益的选项，请你根据自己的偏好，选出每个小游戏你偏好的选项。半分钟倒计时结束后才可提交，在确认提交之前你都可以修改
        </p>
        <h3>
          倒计时剩余
          {time}
          秒
        </h3>
        <FormLayout
          rules={[
            {
              required: true,
              message: '该项不能为空，请选择一个选项',
            },
          ]}
          isDisabled={disabled}
          onSubmit={this.handleSubmit}
          type={Types.RISK_RADIO}
          formList={formList}
        />
      </Card>
    );
  }
}

export default Table9;
