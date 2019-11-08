import React, { Component } from 'react';
import { Input, Button } from 'antd';

let count = 0; // 正确的答题个数

class StepByStepFormLayout extends Component {
  state = {
    index: 0,
    value: [],
    btnMsg: '下一题',
  }

  constructor(props) {
    super(props);
    count = 0;
  }

  handleChange = (e, i) => {
    const { value: val } = e.target;
    const { value } = this.state;
    const temp = [...value];
    temp[i] = val.trim();
    this.setState({
      value: temp,
    });
  }

  handleClick = () => {
    const { formList, onSubmit } = this.props;
    const { index, value } = this.state;
    if (index === formList.length) { // 点击了确认提交
      const tempObj = {};
      let { field } = formList[0];
      field = field.replace(/_\d*$/, '');
      tempObj[field] = count;
      onSubmit(tempObj);
      return;
    }
    // 在最后一题的时候
    if (index + 1 === formList.length) {
      this.setState({
        btnMsg: '确认提交',
      });
    }
    // 如果当前结果正确就+1
    if (value[index] === formList[index].answer) {
      count += 1;
    }
    this.setState({
      index: index + 1,
    });
  }

  render() {
    const { formList, isDisabled } = this.props;
    const { index, value, btnMsg } = this.state;
    return (
      <div>
        {
          formList && formList.map((item, i) => (
            i === index && (
              <div key={item.field} style={{ margin: '10px 0' }}>
                <p>{item.title}</p>
                <Input value={value[i]} onChange={(e) => this.handleChange(e, i)} />
              </div>
            )
          ))
        }
        {
          btnMsg === '确认提交' && (
            <p>你已经完成所有的题目，请点击下方按钮提交</p>
          )
        }
        {
          btnMsg && (
            <Button
              type="primary"
              block
              disabled={isDisabled}
              onClick={this.handleClick}
            >
              {btnMsg}
            </Button>
          )
        }
      </div>
    );
  }
}

export default StepByStepFormLayout;
