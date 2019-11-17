import React, { Component } from 'react';

import FormLayout from '../../../components/adminForm/FormLayout';
import Types from '../../../components/adminForm/formItemTypes';

const questionID = 'QFn1L55L';

class Survey1 extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <p>
          【提示】
          {'<br/>'}
          是换行符
        </p>
        <FormLayout
          type={Types.RADIO_CHECKBOX}
          questionID={questionID}
        />
      </div>
    );
  }
}

export default Survey1;
