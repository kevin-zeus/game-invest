import React, { Component } from 'react';
import { Tabs } from 'antd';
import ExperimentService from '../../../server/Experiment';
import TestOne from './TestOne';
import ExportExcel from '../ExportExcel';

const { TabPane } = Tabs;
const TYPENAME = 'emotion';

class Emotion extends Component {
  state = {
    id: null,
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
        <TabPane tab="测试1-默写题" key="1">
          <TestOne />
        </TabPane>
      </Tabs>
    );
  }
}

export default Emotion;
