import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import configs from './test.config';

import ExperimentService from '../../../server/Experiment';
import ResultService from '../../../server/Result'; // 获取step限制已经填过的内容不可再填

const TYPENAME = 'emotion';
// const step = 1;

const Wrap = styled.div`
  padding: 20px 16px;
`;
const myFont = {
  fontWeight: 'bolder',
  padding: '0 5px 0 9px',
  fontSize: '19px',
};
const myStyle = {
  fontWeight: 'bolder',
  padding: '0 5px 0 1px',
  fontSize: '19px',
};
class Emotion extends Component {
  state = {
    btnMsg: '',
    index: 0,
    id: null,
    senconds: 180,
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    if (this.time) {
      clearInterval(this.time);
    }
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

    this.time = setInterval(() => {
      const { senconds } = this.state;
      this.setState({
        senconds: senconds - 1,
      }, () => {
        const { senconds: sec } = this.state;
        if (sec === 0) {
          clearInterval(this.time);
          // 上传
        }
      });
    }, 1000);

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
      btnMsg, index, id, senconds,
    } = this.state;
    return (
      <Wrap>
        <h1>实验E</h1>
        <div>
          <h3>题目：</h3>
          <p>
这是一个由20个描述不同情感、情绪的词汇组成的量表，请阅读每一个词语。用这些词语所表示的情感、情绪对您今天的感受进行评估，请选择相应的选项作为评估结果，时间为3分钟。剩余
            <span style={myFont}>{senconds}</span>
            <span style={myStyle}>s</span>
            <span>赶快作答</span>
          </p>
        </div>
        <div>
          {
            configs.map((item, i) => (
              index === i && (
                <item.component
                  expeID={id}
                  key={item.key}
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

export default Emotion;
