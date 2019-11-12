/* eslint-disable react/no-array-index-key */
/**
 * 单选或多选的设置组件
 */

/**
 * 该组件支持输入字段名和题目的标题
 */
import React, { Component } from 'react';
import {
  Input, List, Radio, Button, message,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styled from 'styled-components';

const Item = styled(List.Item)`
  display: flex;
  & > span {
    width: 80px;
  }
`;
const OptionItem = styled(List.Item)`
  display: flex;
  flex-direction: column;
`;

const OptionWrap = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0;
  align-items: center;
  & input {
    width: 70%;
    margin-right: 20px;
  }
`;
const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

class RadioCheckbox extends Component {
  state = { // 用来保存所有的该表单项数据
    field: null,
    title: null,
    type: 'radio',
    options: ['', ''],
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
    if (type === 'type') {
      temp[type] = e;
    } else {
      temp[type] = value;
    }
    this.setState({
      ...temp,
    }, () => {
      this.emitChange();
    });
  }

  addOption = () => {
    const { options } = this.state;
    const temp = [...options];
    temp.push('');
    this.setState({
      options: temp,
    });
  }

  delOption = (i) => {
    const { options } = this.state;
    if (options.length === 2) {
      message.error('选项最少有两个');
      return;
    }
    const temp = [...options];
    temp.splice(i, 1);
    this.setState({
      options: temp,
    });
  }

  handleOptionInputChange = (e, i) => {
    const { value } = e.target;
    const { options } = this.state;
    const temp = [...options];
    temp[i] = value;
    this.setState({
      options: temp,
    }, () => {
      this.emitChange();
    });
  }

  init = () => {
    const { value: val = { field: '', title: '', options: ['', ''] } } = this.props;
    this.setState({
      ...val,
    }, () => {
      this.emitChange();
    });
  }

  render() {
    const {
      field, title, type, options,
    } = this.state;
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
        <Item>
          <span>类型：</span>
          <Radio.Group
            className="radio"
            defaultValue={type}
            onChange={(e) => this.handleChange(e, 'type')}
          >
            <Radio value="radio">单选题</Radio>
            <Radio value="checkbox">多选题</Radio>
          </Radio.Group>
        </Item>
        {/* 单选或多选的选项 */}
        <OptionItem>
          <Title>
            <div className="left">选项：</div>
            <Button type="dashed" icon="plus" onClick={this.addOption}>添加选项</Button>
          </Title>
          {
            options.map((text, i) => (
              <OptionWrap key={`option_${i}`}>
                <Input value={text} onChange={(e) => this.handleOptionInputChange(e, i)} />
                <Button
                  shape="circle"
                  icon="close"
                  size="small"
                  onClick={() => this.delOption(i)}
                />
              </OptionWrap>
            ))
          }
        </OptionItem>
      </List>
    );
  }
}

export default RadioCheckbox;
