import React, { PureComponent } from 'react';

import AdminForm from '../../../components/adminForm/FormLayout';
import FormItemTypes from '../../../components/adminForm/formItemTypes';

const questionID = '5dbd3ebdf884af0073391c08'; // 从后端获取

class Calculation extends PureComponent {
  render() {
    return (
      <div>
        <AdminForm
          type={FormItemTypes.ADMIN_FIELD_INPUT}
          questionID={questionID}
        />
      </div>
    );
  }
}

export default Calculation;
