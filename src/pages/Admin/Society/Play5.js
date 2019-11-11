import React, { PureComponent } from 'react';
import FormLayout from '../../../components/adminForm/FormLayout';
import types from '../../../components/adminForm/formItemTypes';

const questionID = '5dc138c512215f0091d7d6ab';

class Play5 extends PureComponent {
  render() {
    return (
      <FormLayout
        type={types.ADMIN_FIELD_INPUT}
        questionID={questionID}
        max={1}
        attr={{
          withAnswer: false,
        }}
      />
    );
  }
}

export default Play5;
