import React, { Component } from 'react';
import { Tabs } from 'antd';
import ExperimentService from '../../../server/Experiment';
import TestOne from './TestOne';

const { TabPane } = Tabs;
const TYPENAME = 'emotion';

class Emotion extends Component {
  componentDidMount() {
    this.init();
  }

  init = async () => {
    const expe = await ExperimentService.getExperimentByType(TYPENAME);
    if (expe.length === 0) {
      expe[0] = await ExperimentService.createExperiment(TYPENAME);
    }
  }

  handleTabChange = () => {

  }

  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
        <TabPane tab="测试1-默写题" key="1">
          <TestOne />
        </TabPane>
      </Tabs>
    );
  }
}

export default Emotion;
