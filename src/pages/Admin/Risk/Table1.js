import React, { Component } from 'react';

import FormLayout from '../../../components/adminForm/FormLayout';
import Types from '../../../components/adminForm/formItemTypes';

const questionID = '5dca393043c257007f5c6805';

class Table1 extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <FormLayout
        type={Types.RADIO_CHECKBOX}
        questionID={questionID}
        max={10}
      />
    );
  }
}

export default Table1;
