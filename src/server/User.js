import Bmob from './server';

class User {
  /**
   * 通过学号（username）和密码（password）进行登录
   * @param {Object} params
   */
  static login(params) {
    const { username, password } = params;
    return Bmob.User.login(username, password);
  }

  /**
   * 判断是否登录
   */
  static isLogined() {
    const currentUser = Bmob.User.current();
    if (currentUser) {
      return true;
    }
    return false;
  }

  /**
   * 用户注册
   * @param {Object} params
   * { realname, username, password }
   * 提醒甲方，如果有同名同姓的人记得在用户名上面区分一下
   */
  static register(params) {
    // const {
    //   username, password, realname, school,
    // } = params;
    return Bmob.User.register(params);
  }

  /**
   * 退出当前用户
   */
  static logout() {
    Bmob.User.logout();
  }

  /**
   * 获取当前登录的用户
   */
  static getCurrentUser() {
    if (this.isLogined) {
      return Bmob.User.current();
    }
    return null;
  }

  // 设置支付方式
  static async setPayment(str) {
    if (this.isLogined) {
      const curUser = Bmob.User.current();
      const user = Bmob.User;
      user.set('id', curUser.objectId);
      user.set('payment', str);
      return user.save();
    }
    return null;
  }

  static async getUserBySchoolID(username) {
    const query = Bmob.Query('_User');
    query.equalTo('username', '==', username);
    const user = await query.find();
    if (user[0]) return user[0];
    return null;
  }
}

export default User;
