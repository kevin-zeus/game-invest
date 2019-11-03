import React, { Component } from 'react';
import {
  Form, Input, message, Button,
} from 'antd';

import ExperimentService from '../../server/Experiment';

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class WordFormLayout extends Component {
  state = {
    formList: [],
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const { expeID } = this.props;
    try {
      const formList = await ExperimentService.getWords(expeID);
      this.setState({
        formList,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { expeID, form } = this.props;
    if (!expeID) {
      message.error('expeID is undefined');
      return;
    }
    form.validateFields(async (err, values) => {
      if (!err) {
        const { names } = values;
        let result = keys.map((key) => names[key]);
        result = result.filter((item) => item);
        try {
          await ExperimentService.setWords(expeID, result);
          message.success('更新/保存成功');
        } catch (error) {
          console.error(error);
          message.error('更新/保存失败');
        }
      }
    });
  }

  render() {
    const { formList } = this.state;
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        {
          keys.map((k, i) => (
            <Form.Item key={k}>
              {
                getFieldDecorator(`names[${k}]`, {
                  initialValue: formList[i],
                })(
                  <Input style={{ width: 80 }} />
                )
              }
            </Form.Item>
          ))
        }
        <Form.Item>
          <Button type="primary" htmlType="submit">提交单词</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({})(WordFormLayout);
