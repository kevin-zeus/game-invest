import React, { Component } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import configs from './test.config';

import ExperimentService from '../../../server/Experiment';
import ResultService from '../../../server/Result'; // 获取step限制已经填过的内容不可再填

const TYPENAME = 'risk';

const Wrap = styled.div`
  padding: 20px 16px;
`;

class Risk extends Component {
  state = {
    btnMsg: '',
    index: 0,
    id: null,
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const { history } = this.props;
    const expe = await ExperimentService.getExperimentByType(TYPENAME);
    if (expe.length === 0) {
      expe[0] = await ExperimentService.createExperiment(TYPENAME);
    }
    const index = await ResultService.getCurrentStep(expe[0].id);
    if (!expe[0].get('isStart')) { // 如果当前应用没有在后端开启
      history.goBack();
    }
    if (index >= configs.length) {
      this.setState({
        btnMsg: '您已参与该实验，退回首页',
      });
    }
    this.setState({
      id: expe[0].id,
      index,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    const { index } = this.state;
    if (index < configs.length - 1) {
      this.setState({
        index: index + 1,
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

  showBtn = (msg = '下一页') => {
    this.setState({
      btnMsg: msg,
    });
  }

  render() {
    const {
      btnMsg, index, id,
    } = this.state;
    return (
      <Wrap>
        <h1>实验R</h1>
        <div>
          {
            configs.map((item, i) => (
              index === i && (
                <item.component
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

export default Risk;
