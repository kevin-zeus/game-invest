import React, { Component } from 'react';
import { Switch, Spin } from 'antd';
import styled from 'styled-components';
import ExperimentService from '../../../server/Experiment';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  &>span {
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-right: 10px;
  }
`;

class StartExperiment extends Component {
  state = {
    list: null,
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const expeList = await ExperimentService.getAllExperiment();
    const list = expeList.map((r) => ({
      isStart: r.isStart,
      name: r.name,
      id: r.objectId,
    }));
    this.setState({
      list,
    });
  }

  handleClick = async (checked, id) => {
    const { list } = this.state;
    try {
      await ExperimentService.setIsStartByID(id, checked);
      const tempList = [...list];
      const item = tempList.find((li) => li.id === id);
      item.isStart = checked;
      this.setState({
        list: tempList,
      });
    } catch (error) {
      console.error('程序错误:', error);
    }
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <h3>设置是否开启某个实验</h3>
        <Spin
          spinning={!list}
          tip="加载中"
        >
          {
            list && list.map((item) => (
              <Wrap key={item.id}>
                <span>{item.name}</span>
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  checked={item.isStart}
                  onClick={(checked) => this.handleClick(checked, item.id)}
                />
              </Wrap>
            ))
          }
        </Spin>
      </div>
    );
  }
}

export default StartExperiment;
