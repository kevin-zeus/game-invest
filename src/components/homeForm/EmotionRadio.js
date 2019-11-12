/**
 * 该组件是亲社会偏好里面的
 * 获取两个输入值，第一个一般是玩家猜测的对方或服务器的值
 * 第二个值是玩家自己输入的值，且必须第一个有值第二个才能输入
 */
import React, { Component } from 'react';
import { Radio } from 'antd';

class EmotionRadio extends Component {
  state = {
    value: '',
  }

  // 通知Form组件该项有更改
  emitChange = () => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(this.state);
    }
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      value,
    }, () => {
      this.emitChange(value);
    });
  }

  render() {
    return (
      <div>
        <Radio.Group>
          <Radio value={1}>几乎没有</Radio>
          <Radio value={2}>比较少</Radio>
          <Radio value={3}>中等程度</Radio>
          <Radio value={4}>比较多</Radio>
          <Radio value={5}>极其多</Radio>
        </Radio.Group>
      </div>
    );
  }
}

export default EmotionRadio;
