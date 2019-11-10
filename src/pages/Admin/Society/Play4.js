import React, { PureComponent } from 'react';
import FormLayout from '../../../components/adminForm/FormLayout';
import types from '../../../components/adminForm/formItemTypes';

const questionID = '5dc138b712215f0091d7d680';

class Play4 extends PureComponent {
  render() {
    return (
      <FormLayout
        type={types.ADMIN_FIELD_INPUT}
        questionID={questionID}
        max={1}
      />
    );
  }
}

export default Play4;
