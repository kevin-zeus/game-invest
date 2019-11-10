import React, { Component } from 'react';
import { Tabs } from 'antd';

import Play1 from './Play1';
import Play2 from './Play2';
import Play3 from './Play3';
import Play4 from './Play4';
import Play5 from './Play5';
import Play6 from './Play6';

import ExperimentService from '../../../server/Experiment';

const { TabPane } = Tabs;
const TYPENAME = 'society';

class Society extends Component {
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
        <TabPane tab="游戏1" key="1">
          <Play1 />
        </TabPane>
        <TabPane tab="游戏2" key="2">
          <Play2 />
        </TabPane>
        <TabPane tab="游戏3" key="3">
          <Play3 />
        </TabPane>
        <TabPane tab="游戏4" key="4">
          <Play4 />
        </TabPane>
        <TabPane tab="游戏5" key="5">
          <Play5 />
        </TabPane>
        <TabPane tab="游戏6" key="6">
          <Play6 />
        </TabPane>
      </Tabs>
    );
  }
}

export default Society;
