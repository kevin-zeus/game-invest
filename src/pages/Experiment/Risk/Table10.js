/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import { Card, message } from 'antd';

import FormLayout from '../../../components/homeForm/FormLayout';
import Types from '../../../components/homeForm/formItemTypes';
import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';

const questionID = 'zqRtB66B';
const step = 10;

class Table10 extends Component {
  state = {
    formList: null,
    time: 10,
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
      showBtn('已完成全部测试，返回首页');
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
        <h3>第十页</h3>
        <p>
        同样以下这个游戏有
          {formList && formList.length}
        个选项。在做这个游戏前，我们额外支付0.6美元给你，计入你的总收益，以感谢你所付出的时间。同样，10s倒计时结束后才可以提交，在确认提交之前你都可以修改
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

export default Table10;
