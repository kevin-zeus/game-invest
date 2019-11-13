import React, { Component } from 'react';
import { Card } from 'antd';

import FormLayout from '../../../components/homeForm/FormLayout';
import Types from '../../../components/homeForm/formItemTypes';
import QuestionService from '../../../server/Question';

const questionID = '5dca393043c257007f5c6805';

class Table1 extends Component {
  state = {
    formList: null,
  }

  componentDidMount() {
    this.init();
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

  handleSubmit = (values) => {
    console.log(values);
  }

  render() {
    const { formList } = this.state;
    return (
      <Card>
        <h3>第一页</h3>
        <p>该页中有10个小游戏，每个小游戏提供了两个含有几率收益的选项，请你根据自己的偏好，选出每个小游戏你偏好的选项</p>
        <FormLayout
          onSubmit={this.handleSubmit}
          type={Types.RISK_RADIO}
          formList={formList}
        />
      </Card>
    );
  }
}

export default Table1;
