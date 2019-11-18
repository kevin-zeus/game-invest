import React, { Component } from 'react';
import {
  Card, Modal, message, Button, Spin,
} from 'antd';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';

const questionID = 'AppoP66P';
const money = 20;
const step = 1;
const page = 3;

class Play1 extends Component {
  state = {
    disabled: false,
    formList: null,
    index: 1,
    no: null, // 随机的匹配者学号尾号
    spining: true,
    showNext: true,
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const no = Math.floor(Math.random() * 90) + 9;
    const formList = await QuestionService.getQuestionList(questionID);
    let title = formList[0].title || '';
    title = title.replace(/{no}/g, no);
    title = title.replace(/{money}/g, money);
    title = title.replace(/\n/g, '<br/>');
    formList[0].title = title;
    this.setState({
      formList,
      no,
    });
  }

  handleSubmit = (values) => {
    const { expeID, showBtn } = this.props;
    const { formList } = this.state;
    const { field } = formList[0];

    if (+values[field] < 0 || +values[field] > money || !values[field]) {
      message.error(`金额不能为空且必须为0~${money}的数字`);
      return;
    }

    const value = {};
    value[field] = parseInt(values[field], 10);

    Modal.confirm({
      title: '提示',
      content: `你的分享钱数是${values[field]}，是否确认？确认提交后不可以再修改！`,
      okText: '确认提交',
      cancelText: '返回重填',
      onOk: async () => {
        try {
          // 计算玩家收益 20-value
          value[`${field}_payoff`] = money - value[field];
          await ResultService.addResult(expeID, value, step);
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

  next = () => {
    const { index } = this.state;
    if (index === page - 1) {
      this.setState({
        showNext: false,
      });
    }
    if (index < page) {
      this.setState({
        index: index + 1,
      }, () => {
        this.showAndCloseSpin(2);
      });
    }
  }

  showAndCloseSpin = (cur) => {
    const { index } = this.state;
    if (index === cur) {
      this.setState({
        showNext: false,
      });
      const i = setInterval(() => {
        this.setState({
          spining: false,
          showNext: true,
        });
        clearInterval(i);
      }, 2000);
    }
  }

  render() {
    const {
      disabled, formList, index, no, spining, showNext,
    } = this.state;
    return (
      <Card>
        <h3>游戏一</h3>
        {
          index === 1 && (
            <p>
              你现在被随机配对和学号尾号为
              {no}
              的同学为一组玩本游戏。
              <br />
              我们给你们每个人
              {money}
              元，然后随机选择你们其中一位同学，被选中的同学需要做出以下的决策：
              <br />
              你是否愿意将在这
              {money}
              元中抽一部分分享给和你配对的同学（0元≤分享额≤
              {money}
              元）？
              <br />
              假如你分享的金额为c元。那么这一轮，你们各自的收益为：
              <br />
              该轮游戏你的收益为：
              {money}
              元－你的分享额c
              <br />
              该轮游戏他的收益为：
              {money}
              元＋你的分享额c
              <br />
              本轮游戏规则已了解，点击下一步获得随机抽取结果
            </p>
          )
        }
        {
          index === 2 && (
            <Spin
              tip="随机抽取中..."
              style={{
                backgroundColor: 'white',
              }}
              spinning={spining}
            >
              <div
                style={{
                  minHeight: '54px',
                  margin: '20px 0',
                }}
              >
              抽取结果：你被抽中啦！
              点击下一步去设置你愿意分享的钱数。
              </div>
            </Spin>
          )
        }
        {
          index === 3 && (
            <FormLayout
              isDisabled={disabled}
              onSubmit={this.handleSubmit}
              type={FormTypes.INPUT}
              formList={formList}
              titleIsHtml
              withConfirm={false}
              attr={{
                disabled,
              }}
              rules={[
                {
                  required: true,
                  message: '请填写完整',
                },
              ]}
            />
          )
        }
        {
          showNext && (
            <Button type="primary" block onClick={this.next}>下一步</Button>
          )
        }
      </Card>
    );
  }
}

export default Play1;
