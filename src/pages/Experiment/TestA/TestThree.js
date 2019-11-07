import React, { Component } from 'react';
import { Card, message } from 'antd';
import moment from 'moment';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';

import FormLayout from '../../../components/homeForm/FormLayout';
import Types from '../../../components/homeForm/formItemTypes';

const questionID = '5dbe839512215f0091d51d70';
let beginTime = null;
let endTime = null;

class TestThree extends Component {
  state = {
    formList: [],
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
    const keys = Object.keys(value);
    const tempArr = keys.filter((item) => value[item]);
    const count = tempArr.length;

    let field = keys[0];
    field = field.replace(/_\d*$/, '');
    const tempObj = {};
    tempObj[field] = count;

    const { showBtn, expeID } = this.props;
    await ResultService.addResult(expeID, tempObj, 3, { beginTime, endTime });

    this.setState({
      isDisabled: true,
    });
    message.success('提交成功');
    showBtn(); // 提示可以进行下一个测试啦
  }

  render() {
    const { isDisabled, formList } = this.state;
    return (
      <Card>
        <p>在小测试3中，会给出一行数字，其中有一位是空白的。请从左往右观察这些数字，然后在下划线部分填出空白处应有的数字。 同样做对一道题给予0.5元钱报酬。</p>
        <FormLayout
          type={Types.SIMPLE_ANSWER_INPUT}
          isDisabled={isDisabled}
          onSubmit={this.handleSubmit}
          formList={formList}
        />
      </Card>
    );
  }
}

export default TestThree;
