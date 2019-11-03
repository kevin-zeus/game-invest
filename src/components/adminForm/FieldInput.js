/**
 * 该组件支持输入字段名和题目的标题
 */
import React, { Component } from 'react';
import { Input, List } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styled from 'styled-components';

const Item = styled(List.Item)`
  display: flex;
  & span {
    width: 80px;
  }
`;

class FieldInput extends Component {
  state = { // 用来保存所有的该表单项数据
    field: null,
    title: null,
  }

  componentDidMount() {
    this.init();
  }

  // 通知Form组件该项有更改
  emitChange = () => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(this.state);
    }
  }

  handleChange = (e, type) => {
    const { value } = e.target;
    const temp = { ...this.state };
    temp[type] = value;
    this.setState({
      ...temp,
    }, () => {
      this.emitChange();
    });
  }

  init = () => {
    const { value: val = { field: '', title: '' } } = this.props;
    const { field, title } = val;
    this.setState({
      field,
      title,
    }, () => {
      this.emitChange();
    });
  }

  render() {
    const { field, title } = this.state;
    return (
      <List bordered column={3} size="small">
        <Item>
          <span>字段名：</span>
          <Input
            value={field}
            placeholder="请输入字段名"
            style={{ maxWidth: '120px' }}
            onChange={(e) => this.handleChange(e, 'field')}
          />
        </Item>
        <Item>
          <span>题目：</span>
          <TextArea
            value={title}
            style={{ width: '80%' }}
            autoSize={{ minRows: 2, maxRows: 3 }}
            placeholder="请输入题目标题"
            onChange={(e) => this.handleChange(e, 'title')}
          />
        </Item>
      </List>
    );
  }
}

export default FieldInput;
