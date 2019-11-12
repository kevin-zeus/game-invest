import React, { Component } from 'react';
import { Tabs } from 'antd';

import ExperimentService from '../../../server/Experiment';

import Table1 from './Table1';

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
        <TabPane tab="表格1" key="1">
          <Table1 />
        </TabPane>
      </Tabs>
    );
  }
}

export default Risk;
