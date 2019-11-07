import React, { Component } from 'react';
import { Button } from 'antd';

import XlsxService from '../../../server/XlsxService';

class ExportExcel extends Component {
  state = {

  }

  handleClick = async () => {
    const { expeID } = this.props;
    await XlsxService.exportResult(expeID);
  }

  render() {
    const { expeID } = this.props;
    return (
      <div>
        {
          expeID && (
            <Button
              type="primary"
              icon="download"
              onClick={this.handleClick}
            >
              导出Excel文件
            </Button>
          )
        }
      </div>
    );
  }
}

export default ExportExcel;
