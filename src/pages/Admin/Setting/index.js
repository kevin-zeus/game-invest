import React, { PureComponent } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

import StartExperiment from './StartExperiment';
import ClearUserResult from './ClearUserResult';

const CradWrap = styled(Card)`
  margin: 20px 0;
`;

class Setting extends PureComponent {
  render() {
    return (
      <div>
        <CradWrap>
          <StartExperiment />
        </CradWrap>
        <CradWrap>
          <ClearUserResult />
        </CradWrap>
      </div>
    );
  }
}

export default Setting;
