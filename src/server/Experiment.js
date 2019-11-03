import AV from './server';
import typeConfig from '../pages/Experiment/config';

class Experiment {
  /**
   * 根据测试的类型获取当前的测试对象
   * @param {String} type 测试的种类
   * then方法里面的第一个参数是实例数据对象
   */
  static async getExperimentByType(type) {
    if (typeConfig[type]) {
      try {
        const query = new AV.Query('Experiment');
        query.equalTo('type', type);
        return query.find();
      } catch (error) {
        throw new Error(error.message);
      }
    }
    return null;
  }

  /**
   * 创建一个新的测试
   * @param {String} type 测试的类型
   */
  static async createExperiment(type) {
    if (typeConfig[type]) {
      try {
        const ExpeObj = await this.getExperimentByType(type);
        if (ExpeObj.length === 0) {
          const Expe = new AV.Object('Experiment');
          Expe.set('type', type);
          return Expe.save();
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
    return null;
  }

  /**
   * 更新音频文件
   * @param {String} id 该测试实例的ObjectID值
   * @param {File} sound 文件上传后获取的File对象
   */
  static async changeSound(id, sound) {
    try {
      const Expe = AV.Object.createWithoutData('Experiment', id);
      Expe.set('sound', sound);
      return Expe.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * 获取音频
   * @param {String} id 实例的id
   */
  static async getSounUrl(id) {
    try {
      const query = new AV.Query('Experiment');
      const expe = await query.get(id);
      return expe.get('sound').get('url');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * 更新音频中说到的单词
   * @param {String} id 实验的实例对象
   * @param {Array} words 单词数组
   */
  static async setWords(id, words) {
    try {
      const Expe = AV.Object.createWithoutData('Experiment', id);
      Expe.set('words', words);
      return Expe.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * 获取音频中的正确单词数组
   * @param {String} id 实验的实例ID
   */
  static async getWords(id) {
    try {
      const query = new AV.Query('Experiment');
      const expe = await query.get(id);
      return expe.get('words');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Experiment;
