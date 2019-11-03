import AV from './server';

class Question {
  /**
   * 获取题目列表
   * @param {String} id 题目实例的id
   */
  static async getQuestionList(id) {
    try {
      const Query = new AV.Query('Question');
      const question = await Query.get(id);
      return question.get('formList');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * 更新或设置题目列表
   * @param {String} id 题目实例的ID
   * @param {Array} list 题目的列表数组
   */
  static async setQuestionList(id, list) {
    try {
      const question = AV.Object.createWithoutData('Question', id);
      question.set('formList', list);
      return question.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Question;
