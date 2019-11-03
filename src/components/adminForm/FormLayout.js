import React from 'react';
import {
  Form, Icon, Button, message,
} from 'antd';
import styled from 'styled-components';
import FieldInput from './FieldInput';
import Types from './formItemTypes';

import QuestionService from '../../server/Question';

let id = 0;
const IconWrap = styled(Icon)`
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
  &:hover {
    color: #faad14;
  }
`;
const FormItem = Form.Item;

class FormLayout extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  add = () => {
    const { form, max } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    if (keys.length === max) {
      message.warn(`本测试最多允许${max}个题`);
      return;
    }
    const nextKeys = keys.concat(id += 1);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, questionID } = this.props;
    if (!questionID) {
      message.error('questionID is undefined!');
      return;
    }
    form.validateFields(async (err, values) => {
      if (!err) {
        const { keys, names } = values;
        const result = keys.map((key) => names[key]);
        try {
          await QuestionService.setQuestionList(questionID, result);
          message.success('更新/保存成功');
        } catch (error) {
          console.error(error);
          message.error('更新/保存失败');
        }
      }
    });
  };

  switchItem = (type) => {
    let Comp = null;
    switch (type) {
      case Types.ADMIN_FIELD_INPUT: {
        Comp = FieldInput;
        break;
      }
      default: break;
    }
    return Comp;
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue }, type } = this.props;
    const Comp = this.switchItem(type);
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k) => (
      <FormItem key={k}>
        {getFieldDecorator(`names[${k}]`, {
        })(<Comp />)}
        {keys.length > 1 ? (
          <IconWrap
            type="close-circle"
            onClick={() => this.remove(k)}
            title="删除"
          />
        ) : null}
      </FormItem>
    ));
    return (
      <div>
        <p style={{ color: '#faad14' }}>程序未做为空验证，请注意更新/保存时确定每个空都填正确</p>
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              更新/保存
            </Button>
            <Button type="dashed" onClick={this.add} style={{ marginLeft: 20 }}>
              <Icon type="plus" />
              添加题目
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({})(FormLayout);
