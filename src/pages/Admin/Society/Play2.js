import React, { PureComponent } from 'react';
import FormLayout from '../../../components/adminForm/FormLayout';
import types from '../../../components/adminForm/formItemTypes';

const questionID = 'x816E00E';

class Play2 extends PureComponent {
  render() {
    return (
      <div>
        <h3 style={{ color: 'red' }}>游戏二和游戏七的题目</h3>
        <p>no：随机编号，money：游戏给的金额</p>
        <FormLayout
          type={types.ADMIN_FIELD_INPUT}
          questionID={questionID}
          max={1}
          attr={{
            withAnswer: false,
          }}
        />
      </div>
    );
  }
}

export default Play2;
