import Bmob from './server';

class Question {
  /**
   * 获取题目列表
   * @param {String} id 题目实例的id
   */
  static async getQuestionList(id) {
    try {
      const Query = Bmob.Query('Question');
      const question = await Query.get(id);
      return question.formList;
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
      const question = Bmob.Query('Question');
      question.set('id', id);
      question.set('formList', list);
      return question.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Question;
