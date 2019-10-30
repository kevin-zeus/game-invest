import React, { PureComponent } from 'react';
import { Tabs } from 'antd';

import Music from './Music';
import Calculation from './Calculation';

const { TabPane } = Tabs;

class TestA extends PureComponent {
  handleTabChange = () => {

  }

  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
        <TabPane tab="上传音频" key="1">
          <Music />
        </TabPane>
        <TabPane tab="测试2-计算题" key="2">
          <Calculation />
        </TabPane>
      </Tabs>
    );
  }
}

export default TestA;
