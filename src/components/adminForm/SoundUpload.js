import React, { PureComponent } from 'react';
import {
  Upload, Icon, Button, Progress, message,
} from 'antd';

import FileService from '../../server/File';
import ExperimentService from '../../server/Experiment';

class SoundUpload extends PureComponent {
  state = {
    percent: 0,
  }

  uploadProps = {
    accept: 'audio/mp3',
    beforeUpload: async (file) => {
      const { expeID, onUpload } = this.props;
      this.setState({
        percent: 0,
      });
      const fileObj = await FileService.upload(file, '', this.onProgress);
      const expe = await ExperimentService.changeSound(expeID, fileObj);
      if (expe && expe.id === expeID) {
        message.success('上传成功');
        await onUpload();
      } else {
        message.error('上传失败');
      }
      return false;
    },
    showUploadList: false,
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
    const { expeID, soundUrl } = this.props;
    return (
      <div>
        <audio src={soundUrl} controls style={{ border: 0, outline: 'none', margin: '20px 0' }}>
          <track
            default
            kind="captions"
            srcLang="en"
            src={soundUrl}
          />
          您的浏览器版本太低，请使用最新的谷歌，火狐或360极速模式
        </audio>
        {
          expeID && (
            <div>
              <Upload {...this.uploadProps}>
                <Button>
                  <Icon type="upload" />
                  上传本次测试的MP3音频文件
                </Button>
              </Upload>
              <Progress style={{ display: 'block', maxWidth: 500, margin: '30px 0' }} percent={percent} />
            </div>
          )
        }
      </div>
    );
  }
}

export default SoundUpload;
