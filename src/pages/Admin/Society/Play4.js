import React, { PureComponent } from 'react';
import FormLayout from '../../../components/adminForm/FormLayout';
import types from '../../../components/adminForm/formItemTypes';

const questionID = 'K5ogXEEX';

class Play4 extends PureComponent {
  render() {
    return (
      <div>
        <h3 style={{ color: 'red' }}>游戏四和游戏九的题目</h3>
        <p>money：游戏给的金额</p>
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

export default Play4;
