import React, { Component } from 'react';
import { Card, message } from 'antd';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';
// import ExperimentService from '../../../server/Experiment';

const questionID = 'SXJv2226';
const step = 1;

const myFont = {
  fontWeight: 'bolder',
  padding: '0 5px 0 9px',
  fontSize: '19px',
};
const myStyle = {
  fontWeight: 'bolder',
  padding: '0 5px 0 1px',
  fontSize: '19px',
};

class emotion1 extends Component {
  state = {
    disabled: false,
    formList: null,
    senconds: 60,
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    if (this.time) {
      clearInterval(this.time);
    }
  }

  init = async () => {
    const formList = await QuestionService.getQuestionList(questionID);
    this.setState({
      formList,
    });

    this.time = setInterval(() => {
      const { senconds } = this.state;
      this.setState({
        senconds: senconds - 1,
      }, () => {
        const { senconds: sec } = this.state;
        if (sec === 0) {
          clearInterval(this.time);
          // 上传
        }
      });
    }, 1000);
  }

  handleSubmit = async (values) => {
    const { expeID, showBtn } = this.props;
    const { senconds } = this.state;
    if (senconds !== 0) {
      message.error(`请等到${senconds}秒之后再提交`);
      return;
    }
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
    const { disabled, formList, senconds } = this.state;
    return (
      <Card>
        <div>
          <h3>题目：</h3>
          <p>
            这是一个由
            {formList && formList.length}
            个描述不同情感、情绪的词汇组成的量表，请阅读每一个词语。用这些词语所表示的情感、情绪对您今天的感受进行评估，请选择相应的选项作为评估结果，1分钟之后才可提交。倒计时
            <span style={myFont}>{senconds}</span>
            <span style={myStyle}>s</span>
          </p>
        </div>
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
