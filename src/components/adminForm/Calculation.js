import React, { Component } from 'react';
import {
  Form, Input, Button, Icon, message,
} from 'antd';

import QuestionSevice from '../../server/Question';

let id = 0;
const { TextArea } = Input;

class Calculation extends Component {
  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id += 1);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, questionID } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        console.log('开始上传');
        const result = this.formatResult(values);
        const question = await QuestionSevice.setQuestionList(questionID, result);
        if (question) message.success('更新成功!');
      }
    });
  }

  formatResult = (fieldResult) => {
    const result = [];
    const { values } = fieldResult;
    const keys = Object.keys(values);
    keys.forEach((k) => {
      result.push(values[k]);
    });
    return result;
  }

  render() {
    const { form: { getFieldValue, getFieldDecorator } } = this.props;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k) => (
      <Form.Item
        required={false}
        key={k}
      >
        {
          getFieldDecorator(`values[${k}]`, {
            rules: [
              {
                required: true,
                whitespace: true,
                message: '如果不需要该输入框请删除否则请将问题补充好',
              },
            ],
          })(<TextArea autoSize={{ minRows: 1, maxRows: 3 }} style={{ maxWidth: '529px', marginRight: 8 }} />)
        }
        {
          keys.length > 1 ? (
            <Icon
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null
        }
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item>
          <Button type="dashed" block onClick={this.add} style={{ maxWidth: '529px' }}>
            <Icon type="plus" />
            添加问题
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({})(Calculation);
