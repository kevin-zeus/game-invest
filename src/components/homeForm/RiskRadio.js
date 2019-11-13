/**
 * 风险偏好的处理
 * 显示效果为几个单选项，单选项必须满足
 * 2.00美元10%这种格式
 * 最终返回的值是学生选择的选项下进行条件随机概率获取的金额
 */
import React, { Component } from 'react';
import { Radio } from 'antd';

const reg = /\d+(.\d+)?%?/g;

class RiskRadio extends Component {
  state = {
    radioValue: '',
    results: [], // [{prob: [10, 90], dollar: [1, 1.6]}]
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const { options } = this.props;
    const results = options.map((op) => {
      const arr = op.match(reg);
      const obj = {
        prob: [],
        dollar: [],
      };
      for (let i = 0, j = 0; i < arr.length / 2; i += 1, j += 2) {
        const field = parseInt(arr[j + 1], 10);
        const value = parseFloat(arr[j]);
        obj.prob.push(field);
        obj.dollar.push(value);
      }
      return obj;
    });
    this.setState({
      results,
    });
  }

  // 通知Form组件该项有更改
  emitChange = (value) => {
    const { onChange, options } = this.props;
    const { radioValue } = this.state;
    // 汇率换算
    const val = (value * 7.12).toFixed(2);
    console.log(`概率下获取金额：${val} = (${value} * 7.12)`);
    if (typeof onChange === 'function') {
      onChange([
        val,
        options[radioValue],
      ]);
    }
  }

  handleChange = (e) => {
    const { value: index } = e.target;
    const { results } = this.state;
    const tempObj = results[index];
    let { prob } = tempObj;
    const { dollar } = tempObj;
    prob = prob.sort();

    const randonDollarIndex = Math.floor(Math.random() * dollar.length);
    let result = dollar[randonDollarIndex]; // 防止随机概率为0

    const random = Math.floor(Math.random() * 100);
    for (let i = 0; i < prob.length; i += 1) {
      if (random < +prob[i]) {
        result = dollar[i];
        break;
      }
    }

    this.setState({
      radioValue: index,
    }, () => {
      this.emitChange(result);
    });
  }

  render() {
    const { options } = this.props;
    const { radioValue } = this.state;
    return (
      <Radio.Group
        value={radioValue}
        onChange={this.handleChange}
      >
        {
          options.map((op, i) => (
            <Radio key={op} value={i}>{op}</Radio>
          ))
        }
      </Radio.Group>
    );
  }
}

export default RiskRadio;
