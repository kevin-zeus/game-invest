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
      const query = new AV.Query('Experiment');
      query.equalTo('type', type);
      return query.find();
    }
    return null;
  }

  /**
   * 创建一个新的测试
   * @param {String} type 测试的类型
   */
  static async createExperiment(type) {
    if (typeConfig[type]) {
      const ExpeObj = await this.getExperimentByType(type);
      if (ExpeObj.length === 0) {
        const Expe = new AV.Object('Experiment');
        Expe.set('type', type);
        return Expe.save();
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
    const Expe = AV.Object.createWithoutData('Experiment', id);
    Expe.set('sound', sound);
    return Expe.save();
  }

  /**
   * 获取音频
   * @param {String} id 实例的id
   */
  static async getSounUrl(id) {
    const query = new AV.Query('Experiment');
    const expe = await query.get(id);
    return expe.get('sound').get('url');
  }
}

export default Experiment;
