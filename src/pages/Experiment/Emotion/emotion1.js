import React, { Component } from 'react';
import { Card, message } from 'antd';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';
// import ExperimentService from '../../../server/Experiment';

const questionID = 'SXJv2226';
const step = 1;

class emotion1 extends Component {
  state = {
    disabled: false,
    formList: null,
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const formList = await QuestionService.getQuestionList(questionID);
    this.setState({
      formList,
    });
  }

  handleSubmit = async (values) => {
    const { expeID, showBtn } = this.props;
    if (expeID) {
      try {
        await ResultService.addResult(expeID, values, step);
        message.success('你已完成该实验，谢谢参与');
        this.setState({
          disabled: true,
        });
        showBtn('结束实验');
      } catch (error) {
        console.error(error);
      }
    }
  }


  render() {
    const { disabled, formList } = this.state;
    return (
      <Card>
        <FormLayout
          isDisabled={disabled}
          onSubmit={this.handleSubmit}
          type={FormTypes.EMOTION_RADIO}
          formList={formList}
          withConfirm={false}
          attr={{
            disabled,
          }}
          rules={[
            {
              required: true,
              message: '请先完成该项',
            },
          ]}
        />
      </Card>
    );
  }
}

export default emotion1;
