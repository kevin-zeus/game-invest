import React, { PureComponent } from 'react';
import FormLayout from '../../../components/adminForm/FormLayout';
import types from '../../../components/adminForm/formItemTypes';

const questionID = '5dc138a812215f0091d7d67e';

class Play3 extends PureComponent {
  render() {
    return (
      <div>
        <p>no：随机编号，money：游戏给的金额</p>
        <FormLayout
          type={types.ADMIN_FIELD_INPUT}
          questionID={questionID}
          max={2}
          attr={{
            withAnswer: false,
          }}
        />
      </div>
    );
  }
}

export default Play3;
