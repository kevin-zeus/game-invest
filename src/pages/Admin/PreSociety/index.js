import React, { Component } from 'react';
import { Tabs } from 'antd';

import Play1 from './Play1';
import Play2 from './Play2';
import Play3 from './Play3';
import Play4 from './Play4';

import ExperimentService from '../../../server/Experiment';
import ExportExcel from '../ExportExcel';

const { TabPane } = Tabs;
const TYPENAME = 'pre_society';

class Society extends Component {
  state = {
    id: null,
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const expe = await ExperimentService.getExperimentByType(TYPENAME);
    if (!expe[0]) {
      expe[0] = await ExperimentService.createExperiment(TYPENAME);
    }
    this.setState({
      id: expe[0].objectId,
    });
  }

  handleTabChange = () => {

  }

  render() {
    const { id } = this.state;
    return (
      <Tabs defaultActiveKey="0" onChange={this.handleTabChange}>
        <TabPane tab="导出数据" key="0">
          <ExportExcel expeID={id} />
        </TabPane>
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
      </Tabs>
    );
  }
}

export default Society;
