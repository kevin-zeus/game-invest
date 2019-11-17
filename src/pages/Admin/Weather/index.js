import React, { Component } from 'react';
import { Tabs } from 'antd';

import ExperimentService from '../../../server/Experiment';

import configs from './tabs.config';
import ExportExcel from '../ExportExcel';

const { TabPane } = Tabs;
const TYPENAME = 'weather';

class Weather extends Component {
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

export default Weather;
