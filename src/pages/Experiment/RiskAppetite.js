import React, { Component } from 'react';
import { Form, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class RiskAppetite extends Component {

  state = {
    formItems: [
      {
        label: '游戏1',
        key: 'test1',
        options: [
          {
            label: '答案1',
            value: 'answer1'
          },
          {
            label: '答案2',
            value: 'answer2'
          }
        ]
      }
    ],
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formItems } = this.state;
    return (
      <div>
        <div style={{ height: '80px', lineHeight: '80px', textAlign: 'center' }}>
          <h2>风险偏好测试</h2>
        </div>
        <Form style={{ padding: '20px' }}>
          {
            formItems.map(item => (
              <FormItem {...formItemLayout} key={item.key} label={item.label}>
                {
                  getFieldDecorator(item.key, {

                  })(
                    <RadioGroup>
                      {
                        item.options.map(op => (
                          <Radio key={op.value} value={op.value}>{op.label}</Radio>
                        ))
                      }
                    </RadioGroup>
                  )
                }
              </FormItem>
            ))
          }
        </Form>
      </div>
    )
  }

}

export default Form.create()(RiskAppetite);
