/**
 * 风险偏好的处理
 * 显示效果为几个单选项，单选项必须满足
 * 2.00美元10%这种格式
 * 最终返回的值是学生选择的选项下进行条件随机概率获取的金额
 */
import React, { Component } from 'react';
import { Radio, Checkbox } from 'antd';

// const reg = /\d+(.\d+)?%?/g;

const radioStyle = {
  display: 'block',
};

class RadioAndCheckbox extends Component {
  state = {
    // selectIndex: null,
    // results: [], // [{prob: [10, 90], dollar: [1, 1.6]}]
  }

  // 通知Form组件该项有更改
  emitChange = (value) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  handleChange = (e) => {
    const { type, options } = this.props;
    let value = e; // 如果是多选
    if (type === 'radio') { // 如果是单选
      value = e.target.value;
    }
    let res = '';
    if (Array.isArray(value)) { // 复选框的话就是数组
      value.forEach((item) => {
        res += `${item.substr(0, 1)},`;
      });
    } else {
      res = options[value].substr(0, 1);
    }
    this.emitChange(res);
  }

  render() {
    const { options, type } = this.props;
    return (
      <div>
        {
          type === 'radio' && (
            <Radio.Group
              onChange={this.handleChange}
            >
              {
                options.map((op, i) => (
                  <Radio style={radioStyle} key={op} value={i}>{op}</Radio>
                ))
              }
            </Radio.Group>
          )
        }
        {
          type === 'checkbox' && (
            <Checkbox.Group
              options={options}
              onChange={this.handleChange}
            />
          )
        }
      </div>
    );
  }
}

export default RadioAndCheckbox;
