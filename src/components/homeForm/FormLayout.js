/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import {
  Form, Button, Modal, Input,
} from 'antd';
import Types from './formItemTypes';

import WordJudegInput from './WordJudegInput';
import SimpleAnswerInput from './SimpleAnswerInput';
import DoubleInput from './DoubleInput';
import EmotionRadio from './EmotionRadio';
import RiskRadio from './RiskRadio';
import RadioAndCheckbox from './RadioAndCheckbox';

const FormItem = Form.Item;

class FormLayout extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form, onSubmit, withConfirm = true,
    } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        if (!withConfirm) {
          await onSubmit(values);
          return;
        }
        Modal.confirm({
          title: '提示',
          content: '你确定现在提交你的作答内容吗？',
          onOk: async () => {
            await onSubmit(values);
          },
        });
      }
    });
  }

  switchItem = (type) => {
    let Comp = null;
    switch (type) {
      case Types.WORD_JUDGE_INPUT: {
        Comp = WordJudegInput;
        break;
      }
      case Types.SIMPLE_ANSWER_INPUT: {
        Comp = SimpleAnswerInput;
        break;
      }
      case Types.DOUBLE_INPUT: {
        Comp = DoubleInput;
        break;
      }
      case Types.EMOTION_RADIO: {
        Comp = EmotionRadio;
        break;
      }
      case Types.RISK_RADIO: {
        Comp = RiskRadio;
        break;
      }
      case Types.RADIO_CHECKBOX: {
        Comp = RadioAndCheckbox;
        break;
      }
      case Types.INPUT: {
        Comp = Input;
        break;
      }
      default: break;
    }
    return Comp;
  }

  getLabel = (label, isHtml) => {
    if (isHtml) {
      return (
        <span dangerouslySetInnerHTML={{ __html: label }} />
      );
    }
    return label;
  }

  render() {
    const {
      form: { getFieldDecorator },
      type,
      attr,
      formList,
      isDisabled,
      titleIsHtml = false,
      rules,
    } = this.props;
    const Comp = this.switchItem(type);
    return (
      <Form onSubmit={this.handleSubmit}>
        {
          formList && formList.map((item) => (
            <FormItem
              key={item.field}
              label={this.getLabel(item.title, titleIsHtml)}
            >
              {
                getFieldDecorator(item.field, { rules })(
                  <Comp {...attr} type={item.type} options={item.options} answer={item.answer || ''} />
                )
              }
            </FormItem>
          ))
        }
        {
          formList && (
            <FormItem>
              <Button disabled={isDisabled} htmlType="submit" type="primary" block>
                提交
              </Button>
            </FormItem>
          )
        }
      </Form>
    );
  }
}

export default Form.create({})(FormLayout);
