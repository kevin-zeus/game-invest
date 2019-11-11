import React, { PureComponent } from 'react';
import FormLayout from '../../../components/adminForm/FormLayout';
import types from '../../../components/adminForm/formItemTypes';

const questionID = '5dc138c512215f0091d7d6ab';

class Play5 extends PureComponent {
  render() {
    return (
      <div>
        <p>num：关联游戏序号，no：关联游戏中的对手编号，money：金额，value：关联游戏玩家给的金额，guess：关联游戏玩家猜测的对方金额</p>
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

export default Play5;
