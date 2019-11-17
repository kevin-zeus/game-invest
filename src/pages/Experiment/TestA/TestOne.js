/* eslint-disable max-len */
import React, { Component } from 'react';
import { Card, Icon, message } from 'antd';
import moment from 'moment';

import QuestionService from '../../../server/Question';
import ExperimentService from '../../../server/Experiment';
import ResultService from '../../../server/Result';
import FormLayout from '../../../components/homeForm/FormLayout';
import FormTypes from '../../../components/homeForm/formItemTypes';

const questionID = 'RUaf444G';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1493707_561bigr6lmm.js',
});

let beginTime = null;
let endTime = null;

class TestOne extends Component {
  state = {
    playStatus: 'icon-circle-play',
    canPlay: true,
    formList: null,
    words: null,
    senconds: 10, // 倒计时120秒
    disabled: false, // 是否禁用表单项
    hideFormSubmitBtn: false,
  }

  componentWillReceiveProps() {
    this.init();
  }

  init = async () => {
    const { expeID } = this.props;
    let { words } = this.state;
    try {
      const formList = await QuestionService.getQuestionList(questionID);
      if (expeID) {
        words = await ExperimentService.getWords(expeID);
      }
      this.setState({
        formList,
        words,
      });
    } catch (error) {
      console.error(error);
    }
  }

  playMusic = () => {
    const { canPlay } = this.state;
    if (canPlay) {
      this.setState({
        playStatus: 'icon-circle-pause',
      }, () => {
        this.audioValue.play();
      });
    }
  }

  startCountdown = () => {
    beginTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const siv = setInterval(() => {
      const { senconds } = this.state;
      this.setState({
        senconds: senconds - 1,
      }, () => {
        const { senconds: sec } = this.state;
        if (sec === 0) {
          clearInterval(siv);
          this.setState({
            disabled: true,
          });
        }
      });
    }, 1000);
  }

  onAudioEnded = () => {
    this.setState({
      canPlay: false,
    });
    this.startCountdown();
  }

  handleSubmit = async (values) => {
    endTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const { showBtn, expeID } = this.props;
    if (expeID) {
      try {
        await ResultService.addResult(expeID, values, 1, { beginTime, endTime });
        this.setState({
          hideFormSubmitBtn: true,
        });
        message.success('提交成功');
      } catch (error) {
        console.error(error);
      }
    }
    showBtn();
  }

  render() {
    const { soundUrl } = this.props;
    const {
      playStatus, canPlay, formList, words, hideFormSubmitBtn, disabled, senconds,
    } = this.state;
    return (
      <Card>
        <audio
          onEnded={this.onAudioEnded}
          src={soundUrl}
          ref={(audio) => { this.audioValue = audio; }}
        >
          <track kind="captions" />
          您的浏览器不支持 audio 元素。
        </audio>
        <p>实验人员将读十个词,读完以后,请你回忆这些词(可以不按顺序) 。这十个词只读一遍,所以请你仔细听,尽量多记。正确回忆一个单词，给予0.5元钱的收益。音频播放结束后，会有120秒倒计时，倒计时结束后你将不能继续填写</p>
        {
          soundUrl && canPlay && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MyIcon
                style={{ fontSize: '32px', marginRight: '20px' }}
                type={playStatus}
                onClick={this.playMusic}
              />
              点击按钮播放音频，该音频只播放一次！且不能暂停，请认真听！
            </div>
          )
        }
        {
          canPlay ? null : (<div>音频已播放结束，请根据提示在下面作答</div>)
        }
        <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
          倒计时
          <span
            style={{
              color: 'red',
              display: 'inline-block',
              width: '80px',
            }}
          >
            {senconds}
          </span>
          秒
        </h2>
        {/* 题目和表单选项在这里 */}
        {
          !canPlay && (
            <div>
              <FormLayout
                isDisabled={hideFormSubmitBtn}
                onSubmit={this.handleSubmit}
                type={FormTypes.WORD_JUDGE_INPUT}
                formList={formList}
                attr={{
                  words,
                  disabled,
                }}
              />
            </div>
          )
        }
      </Card>
    );
  }
}

export default TestOne;
