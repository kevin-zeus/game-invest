/**
 * 该组件是亲社会偏好里面的
 * 获取两个输入值，第一个一般是玩家猜测的对方或服务器的值
 * 第二个值是玩家自己输入的值，且必须第一个有值第二个才能输入
 */
import React, { Component } from 'react';
import { Input, message } from 'antd';

class DoubleInput extends Component {
  state = {
    guessValue: '',
    value: '',
  }

  // 通知Form组件该项有更改
  emitChange = () => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(this.state);
    }
  }

  handleChange = (e, type) => {
    const { labels, money } = this.props;
    const { value } = e.target;
    if (type === 'guess') {
      if (+value < 0 || +value > money) {
        message.error(`输入的值不能少于0或大于${money}`);
        return;
      }
      this.setState({
        guessValue: value.trim(),
      }, () => {
        this.emitChange();
      });
      return;
    }
    if (type === 'value') {
      const { guessValue } = this.state;
      if (!guessValue) {
        message.error(`请先填写${labels[0]}`);
        return;
      }
      if (+value < 0 || +value > money) {
        message.error(`输入的值不能少于0或大于${money}`);
        return;
      }
      this.setState({
        value: value.trim(),
      }, () => {
        this.emitChange();
      });
    }
  }

  render() {
    const { labels, disabled } = this.props;
    const { value, guessValue } = this.state;
    return (
      <div>
        <Input disabled={disabled} placeholder={labels && labels[0]} value={guessValue} onChange={(e) => this.handleChange(e, 'guess')} />
        <Input disabled={disabled} placeholder={labels && labels[1]} value={value} onChange={(e) => this.handleChange(e, 'value')} />
      </div>
    );
  }
}

export default DoubleInput;
