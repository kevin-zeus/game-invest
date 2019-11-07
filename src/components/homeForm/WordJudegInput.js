/**
 * 该组件会将用户填写的词和正确的词对比，然后把正确的个数作为回答提交
 */
import React, { Component } from 'react';
import { Input } from 'antd';

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class WordJudgeInput extends Component {
  state = {
    answer: null,
    cache: {},
  }

  // 通知Form组件该项有更改
  emitChange = () => {
    const { onChange } = this.props;
    const { answer } = this.state;
    if (typeof onChange === 'function') {
      onChange(answer);
    }
  }

  judgeCount = () => {
    const { words } = this.props;
    const { cache } = this.state;
    const tempObj = keys.map((k) => cache[k]);
    const result = words.filter((x) => tempObj.includes(x));
    this.setState({
      answer: result.length,
    }, () => {
      this.emitChange();
    });
  }

  handleChange = (e, type) => {
    const { value } = e.target;
    const { cache } = this.state;
    const temp = { ...cache };
    temp[type] = value.trim();
    this.setState({
      cache: { ...temp },
    }, () => {
      this.judgeCount();
    });
  }

  render() {
    const { words, disabled = false } = this.props;
    const { cache } = this.state;
    return (
      <div>
        {
          words && keys.map((item) => (
            <Input
              value={cache[item]}
              key={item}
              style={{ width: '80px', margin: '10px 5px' }}
              onChange={(e) => this.handleChange(e, item)}
              disabled={disabled}
            />
          ))
        }
      </div>
    );
  }
}

export default WordJudgeInput;
