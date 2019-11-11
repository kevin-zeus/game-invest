import React, { PureComponent } from 'react';
import FormLayout from '../../../components/adminForm/FormLayout';
import types from '../../../components/adminForm/formItemTypes';

const questionID = '5dc1391ca91c9300939d9c76';

class Play6 extends PureComponent {
  render() {
    return (
      <div>
        <p>money：金额，result：题目中的例题计算结果</p>
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

export default Play6;
