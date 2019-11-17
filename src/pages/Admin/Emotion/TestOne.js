import React, { PureComponent } from 'react';
import FormLayout from '../../../components/adminForm/FormLayout';
import types from '../../../components/adminForm/formItemTypes';

const questionID = 'SXJv2226';

class TestOne extends PureComponent {
  render() {
    return (
      <div>
        <p>
          情绪调查的选项都是统一的，所以这里不需要填选项，默认选项为
          <br />
          1. 几乎没有 2.比较少 3.中等程度 4.比较多 5.极其多
        </p>
        <FormLayout
          type={types.ADMIN_FIELD_INPUT}
          questionID={questionID}
          max={20}
          attr={{
            withAnswer: false,
          }}
        />
      </div>
    );
  }
}

export default TestOne;
