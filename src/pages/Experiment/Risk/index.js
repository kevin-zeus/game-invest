import React, { Component } from 'react';
import { Button, message } from 'antd';
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
    const index = await ResultService.getCurrentStep(expe[0].objectId);
    if (!expe[0].isStart) { // 如果当前应用没有在后端开启
      history.goBack();
    }
    if (index >= configs.length) {
      this.setState({
        btnMsg: '您已参与该实验，退回首页',
      });
    }

    let expeComped = localStorage.getItem('expe');
    expeComped = JSON.parse(expeComped);
    if (!expeComped || !expeComped.society) {
      message.warn('请先完成实验S');
      history.goBack();
    }

    this.setState({
      id: expe[0].objectId,
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
      let expeComped = localStorage.getItem('expe');
      expeComped = JSON.parse(expeComped);
      expeComped.risk = true;
      localStorage.setItem('expe', JSON.stringify(expeComped));
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
        <p>注意：人民币对美元汇率为：1美元=7.12元人民币</p>
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
