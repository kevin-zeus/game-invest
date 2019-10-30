import React, { PureComponent } from 'react';
import {
  Upload, Icon, Button, message, Progress,
} from 'antd';

import FileService from '../../../server/File';


class Music extends PureComponent {
  state = {
    percent: 0,
  }

  uploadProps = {
    accept: 'audio/mp3',
    beforeUpload: (file) => {
      this.setState({
        percent: 0,
      });
      FileService.upload(file, '', this.onProgress)
        .then(() => {
          message.success('上传成功');
        })
        .catch(() => {
          message.error('上传失败');
        });
      return false;
    },
  };

  onProgress = (progress) => {
    let { percent } = progress;
    percent = Math.floor(percent);
    if (percent % 2 === 0) {
      this.setState({
        percent,
      });
    }
  }

  render() {
    const { percent } = this.state;
    return (
      <div>
        <Upload {...this.uploadProps}>
          <Button>
            <Icon type="upload" />
            上传本次测试的MP3音频文件
          </Button>
        </Upload>
        <Progress style={{ maxWidth: 500, margin: '30px 0' }} percent={percent} />
      </div>
    );
  }
}

export default Music;
