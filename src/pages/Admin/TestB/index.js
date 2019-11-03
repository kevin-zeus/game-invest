import React, { Component } from 'react';
import { Tabs } from 'antd';

import TestOne from './TestOne';
import TestTwo from './TestTwo';
import TestThree from './TestThree';
import TestFour from './TestFour';
import SoundUpload from '../../../components/adminForm/SoundUpload';
import FormLayout from '../../../components/adminForm/wordFormLayout';
// import Calculation from './Calculation';

import ExperimentService from '../../../server/Experiment';

const { TabPane } = Tabs;
const TYPENAME = 'test_b';

class TestB extends Component {
  state = {
    id: null,
    soundUrl: '',
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const expe = await ExperimentService.getExperimentByType(TYPENAME);
    if (expe.length === 0) {
      expe[0] = await ExperimentService.createExperiment(TYPENAME);
    }
    this.setState({
      id: expe[0].id,
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

  handleTabChange = () => {

  }

  render() {
    const { id, soundUrl } = this.state;
    return (
      <Tabs defaultActiveKey="2" onChange={this.handleTabChange}>
        <TabPane tab="上传音频" key="1">
          <SoundUpload expeID={id} soundUrl={soundUrl} onUpload={this.getSound} />
          <FormLayout expeID={id} />
        </TabPane>
        <TabPane tab="测试1-默写题" key="2">
          <TestOne />
        </TabPane>
        <TabPane tab="测试2-计算题" key="3">
          <TestTwo />
        </TabPane>
        <TabPane tab="测试3-看规律" key="4">
          <TestThree />
        </TabPane>
        <TabPane tab="测试4-再次默写" key="5">
          <TestFour />
        </TabPane>
      </Tabs>
    );
  }
}

export default TestB;
