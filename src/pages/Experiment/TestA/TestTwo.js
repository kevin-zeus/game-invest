import React, { Component } from 'react';
import { Card, message } from 'antd';
import moment from 'moment';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';
import StepLayout from '../../../components/homeForm/StepByStepFormLayout';

const questionID = 'bEBAKKKS';
let beginTime = null;
let endTime = null;

class TestTwo extends Component {
  state = {
    formList: null,
    isDisabled: false,
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    beginTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const { hideBtn } = this.props;
    try {
      hideBtn();
      const formList = await QuestionService.getQuestionList(questionID);
      this.setState({
        formList,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleSubmit = async (value) => {
    endTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const { showBtn, expeID } = this.props;
    await ResultService.addResult(expeID, value, 2, { beginTime, endTime });
    this.setState({
      isDisabled: true,
    });
    message.success('提交成功');
    showBtn(); // 提示可以进行下一个测试啦
  }

  render() {
    const { formList, isDisabled } = this.state;
    return (
      <Card>
        <StepLayout
          isDisabled={isDisabled}
          onSubmit={this.handleSubmit}
          formList={formList}
        />
      </Card>
    );
  }
}

export default TestTwo;
