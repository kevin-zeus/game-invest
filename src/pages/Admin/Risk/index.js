import React, { Component } from 'react';
import { Tabs } from 'antd';

import ExperimentService from '../../../server/Experiment';

import configs from './tabs.config';

const { TabPane } = Tabs;
const TYPENAME = 'risk';

class Risk extends Component {
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
        {
          configs.map((tab) => (
            <TabPane tab={tab.title} key={tab.key}>
              <tab.component />
            </TabPane>
          ))
        }
      </Tabs>
    );
  }
}

export default Risk;
