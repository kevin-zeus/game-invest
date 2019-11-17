import React, { Component } from 'react';

import FormLayout from '../../../components/adminForm/FormLayout';
import Types from '../../../components/adminForm/formItemTypes';

const questionID = 'zqRtB66B';

class Table1 extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <p>【注意】金额的数字必须在百分比概率前面，百分比必须是10%这种格式，不支持多选！！！</p>
        <FormLayout
          type={Types.RADIO_CHECKBOX}
          questionID={questionID}
          max={10}
        />
      </div>
    );
  }
}

export default Table1;
