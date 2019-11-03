import AV from './server';

class File {
  /**
   * 上传文件，文件上传成功之后then里面返回一个file参数，该参数是云端的file对象属性，可以直接保存到表里面去
   * @param {File}} localFile
   * @param {String} filename
   * @param {Function} onprogress
   */
  static async upload(localFile, filename, onprogress) {
    try {
      const file = new AV.File(filename, localFile);
      return file.save({
        onprogress,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default File;
