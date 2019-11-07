import React, { Component } from 'react';
import {
  Form, Button, Modal,
} from 'antd';
import Types from './formItemTypes';

import WordJudegInput from './WordJudegInput';
import SimpleAnswerInput from './SimpleAnswerInput';

const FormItem = Form.Item;

class FormLayout extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form, onSubmit,
    } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
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
      default: break;
    }
    return Comp;
  }

  render() {
    const {
      form: { getFieldDecorator },
      type,
      attr,
      formList,
      isDisabled,
    } = this.props;
    const Comp = this.switchItem(type);
    return (
      <Form onSubmit={this.handleSubmit}>
        {
          formList && formList.map((item) => (
            <FormItem
              key={item.field}
              label={item.title}
            >
              {
                getFieldDecorator(item.field, {})(
                  <Comp {...attr} answer={item.answer || ''} />
                )
              }
            </FormItem>
          ))
        }
        <FormItem>
          <Button disabled={isDisabled} htmlType="submit" type="primary" block>
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({})(FormLayout);
