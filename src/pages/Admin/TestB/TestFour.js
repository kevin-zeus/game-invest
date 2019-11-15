import React, { PureComponent } from 'react';
import FormLayout from '../../../components/adminForm/FormLayout';
import types from '../../../components/adminForm/formItemTypes';

const questionID = '5dbe780b12215f0091d51000';

class TestFour extends PureComponent {
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

export default TestFour;
