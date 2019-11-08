import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import configs from './test.config';

import ExperimentService from '../../../server/Experiment';
import ResultService from '../../../server/Result'; // 获取step限制已经填过的内容不可再填

const TYPENAME = 'test_a';

const Wrap = styled.div`
  padding: 20px 16px;
`;

class TestA extends Component {
  state = {
    btnMsg: '',
    index: 0,
    soundUrl: null,
    id: null,
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const expe = await ExperimentService.getExperimentByType(TYPENAME);
    if (expe.length === 0) {
      expe[0] = await ExperimentService.createExperiment(TYPENAME);
    }
    const index = await ResultService.getCurrentStep(expe[0].id);
    if (index >= configs.length) {
      this.setState({
        btnMsg: '已参与，退回首页',
      });
    }
    this.setState({
      id: expe[0].id,
      index,
    }, async () => {
      await this.getSound();
    });
  }

  getSound = async () => {
    const { id } = this.state;
    const sound = await ExperimentService.getSounUrl(id);
    this.setState({
      soundUrl: sound,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    let { index } = this.state;
    if (index < configs.length - 1) {
      this.setState({
        index: index += 1,
      });
    } else {
      history.push('/');
    }
  }

  hideBtn = () => {
    this.setState({
      btnMsg: null,
    });
  }

  showBtn = (msg = '下一个测试') => {
    this.setState({
      btnMsg: msg,
    });
  }

  render() {
    const {
      btnMsg, index, soundUrl, id,
    } = this.state;
    return (
      <Wrap>
        <h1>实验一</h1>
        <div>
          {
            configs.map((item, i) => (
              index === i && (
                <item.component
                  soundUrl={soundUrl}
                  expeID={id}
                  key={item.key}
                  hideBtn={this.hideBtn}
                  showBtn={this.showBtn}
                />
              )
            ))
          }
        </div>
        {
          btnMsg && (
            <Button
              style={{ margin: '20px 0' }}
              type="primary"
              block
              onClick={this.handleClick}
            >
              {btnMsg}
            </Button>
          )
        }
      </Wrap>
    );
  }
}

export default TestA;
