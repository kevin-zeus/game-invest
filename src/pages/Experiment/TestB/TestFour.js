import React, { Component } from 'react';
import { Card, message } from 'antd';
import moment from 'moment';

import QuestionService from '../../../server/Question';
import ExperimentService from '../../../server/Experiment';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';

const questionID = '5dbe780b12215f0091d51000';
let beginTime = null;
let endTime = null;

class TestFour extends Component {
  state = {
    formList: null,
    words: null,
    isDisabled: false,
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    beginTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const { expeID, hideBtn } = this.props;
    try {
      hideBtn();
      const formList = await QuestionService.getQuestionList(questionID);
      const words = await ExperimentService.getWords(expeID);
      this.setState({
        formList,
        words,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleSubmit = async (values) => {
    endTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const { showBtn, expeID } = this.props;
    if (expeID) {
      try {
        await ResultService.addResult(expeID, values, 4, { beginTime, endTime });
        this.setState({
          isDisabled: true,
        });
        message.success('你已完成该实验，谢谢参与');
      } catch (error) {
        console.error(error);
      }
    }
    showBtn('结束实验');
  }

  render() {
    const {
      formList, words, isDisabled,
    } = this.state;
    return (
      <Card>
        <FormLayout
          isDisabled={isDisabled}
          onSubmit={this.handleSubmit}
          type={FormTypes.WORD_JUDGE_INPUT}
          formList={formList}
          attr={{
            words,
          }}
        />
      </Card>
    );
  }
}

export default TestFour;
