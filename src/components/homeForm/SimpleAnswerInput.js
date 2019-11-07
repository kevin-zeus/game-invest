/**
 * 该组件会将用户填写的词和正确的词对比，然后把正确的个数作为回答提交
 */
import React, { Component } from 'react';
import { Input } from 'antd';

class SimpleAnswerInput extends Component {
  state = {
    value: '',
  }

  // 通知Form组件该项有更改
  emitChange = (result) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(result);
    }
  }

  judgeCount = () => {
    const { value } = this.state;
    const { answer } = this.props;
    if (value === answer) {
      this.emitChange(true);
    } else {
      this.emitChange(false);
    }
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      value: value.trim(),
    }, () => {
      this.judgeCount();
    });
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        {
          <Input value={value} onChange={this.handleChange} />
        }
      </div>
    );
  }
}

export default SimpleAnswerInput;
