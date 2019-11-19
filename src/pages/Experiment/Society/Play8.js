import React, { Component } from 'react';
import {
  Card, message, Modal, Spin, Button,
} from 'antd';

import QuestionService from '../../../server/Question';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';

const questionID = '572k8448';
const money = 200;
const step = 8;
const page = 3;

class Play8 extends Component {
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
    const { hideBtn } = this.props;
    hideBtn();

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

  handleSubmit = (values) => {
    const { expeID, showBtn } = this.props;
    const { formList } = this.state;
    const { field } = formList[0];
    const val = { ...values[field] }; // {guessValue, value}

    const tempObj = {};
    const otherRealValue = Math.floor(Math.random() * 20); // 服务器模拟的对方真实值
    let { value, guessValue } = val;
    value = parseInt(value, 10);
    guessValue = parseInt(guessValue, 10);

    tempObj[`${field}_10times`] = value; // 玩家填的值
    tempObj[`${field}_guess_10times`] = guessValue; // 玩家猜测的值
    tempObj[`${field}_computer_10times`] = otherRealValue; // 服务器模拟的值
    tempObj[`${field}_payoff_10times`] = 0.8 * (value + otherRealValue) + (20 - value); // 玩家收益
    tempObj[`${field}_guess_payoff_10times`] = 20 - Math.abs(guessValue - otherRealValue); // 玩家猜测收益

    tempObj[`${field}_payoff_10times`] = tempObj[`${field}_payoff_10times`].toFixed(2);
    tempObj[`${field}_guess_payoff_10times`] = tempObj[`${field}_guess_payoff_10times`].toFixed(2);

    Modal.confirm({
      title: '提示',
      content: `请确认猜测服务器代对方投入金额${guessValue}元，你的投入额为${value}元`,
      okText: '确认提交',
      cancelText: '返回重填',
      onOk: async () => {
        try {
          await ResultService.addResult(expeID, tempObj, step);
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

  render() {
    const {
      disabled, formList, no, index, showNext, spining,
    } = this.state;
    return (
      <Card>
        <h3>游戏八</h3>
        {
          index === 1 && (
            <p>
              你现在被随机配对和学号尾号为
              {no}
              的同学为一组玩该游戏。
              <br />
              我们会给你们每人
              {money}
              元，你们可以用这
              {money}
              元作为“初始资金” 对一个项目进行投资（0元≤投资额≤
              {money}
              元）。
              <br />
              但是，我们会在你们两人中随机抽一个，被抽到的同学在本次游戏的投资额由游戏服务器代为做出（即抽到的人本次游戏的投资额由服务器随机从0-
              {money}
              元中抽取）。未被抽到的同学决策仍由自己做出。
              <br />
              本轮游戏规则已了解的话，点击下一步获得随机抽取结果
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
              抽取结果：你未被抽中，本轮仍然可以自己选择投入额，而另一位同学则由电脑随机待投。
                <br />
              </div>
            </Spin>
          )
        }
        {
          index === 3 && (
            <FormLayout
              isDisabled={disabled}
              onSubmit={this.handleSubmit}
              type={FormTypes.DOUBLE_INPUT}
              formList={formList}
              titleIsHtml
              withConfirm={false}
              attr={{
                disabled,
                labels: [
                  '猜测服务器代投金额',
                  '你的投入金额',
                ],
                money,
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

export default Play8;
