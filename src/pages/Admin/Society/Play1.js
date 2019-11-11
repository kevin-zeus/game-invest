import React, { PureComponent } from 'react';
import FormLayout from '../../../components/adminForm/FormLayout';
import types from '../../../components/adminForm/formItemTypes';

const questionID = '5dc1386ea91c9300939d9ba4';

class Play1 extends PureComponent {
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

export default Play1;
