import React, { PureComponent } from 'react';
import {
  Upload, Icon, Button, message, Spin,
} from 'antd';

import FileService from '../../server/File';
import ExperimentService from '../../server/Experiment';

class SoundUpload extends PureComponent {
  state = {
    isLoadding: false,
  }

  uploadProps = {
    accept: 'audio/mp3',
    beforeUpload: async (file) => {
      const { expeID, onUpload } = this.props;
      this.setState({
        isLoadding: true,
      });
      const fileObj = await FileService.upload(file, file.name);
      const expe = await ExperimentService.changeSound(expeID, fileObj[0]);
      if (expe) {
        message.success('上传成功');
        await onUpload();
      } else {
        message.error('上传失败');
      }
      this.setState({
        isLoadding: false,
      });
      return false;
    },
    showUploadList: false,
  };

  render() {
    const { isLoadding } = this.state;
    const { expeID, soundUrl } = this.props;
    return (
      <Spin tip="上传中..." spinning={isLoadding} style={{ margin: '20px 0' }}>
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
            </div>
          )
        }
      </Spin>
    );
  }
}

export default SoundUpload;
