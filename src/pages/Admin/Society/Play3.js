import React, { PureComponent } from 'react';
import FormLayout from '../../../components/adminForm/FormLayout';
import types from '../../../components/adminForm/formItemTypes';

const questionID = '5dc138a812215f0091d7d67e';

class Play3 extends PureComponent {
  render() {
    return (
      <FormLayout
        type={types.ADMIN_FIELD_INPUT}
        questionID={questionID}
        max={2}
        attr={{
          withAnswer: false,
        }}
      />
    );
  }
}

export default Play3;
