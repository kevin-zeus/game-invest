import React, { Component } from 'react';
import {
  Form, Input, Button, Icon,
} from 'antd';

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
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
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
          getFieldDecorator(`names[${k}]`, {
            rules: [
              {
                required: true,
                whitespace: true,
                message: '如果不需要该输入框请删除否则请将问题补充好',
              },
            ],
          })(<TextArea autoSize={{ minRows: 1, maxRows: 3 }} style={{ width: '60%', marginRight: 8 }} />)
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
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
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
