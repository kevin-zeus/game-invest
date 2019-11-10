import React, { PureComponent } from 'react';
import { Card } from 'antd';
import StartExperiment from './StartExperiment';

class Setting extends PureComponent {
  render() {
    return (
      <Card>
        <StartExperiment />
      </Card>
    );
  }
}

export default Setting;
