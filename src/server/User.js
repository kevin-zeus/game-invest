import AV from './server';

class User {
  /**
   * 通过学号（username）和密码（password）进行登录
   * @param {Object} params
   */
  static login(params) {
    const { username, password } = params;
    return AV.User.logIn(username, password);
  }

  /**
   * 判断是否登录
   */
  static isLogined() {
    const currentUser = AV.User.current();
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
    const {
      username, password, realname, school,
    } = params;
    const user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    user.set('realName', realname);
    user.set('school', school);
    return user.signUp();
  }

  /**
   * 退出当前用户
   */
  static logout() {
    AV.User.logOut();
  }

  /**
   * 获取当前登录的用户
   */
  static getCurrentUser() {
    if (this.isLogined) {
      return AV.User.current();
    }
    return null;
  }

  // 设置支付方式
  static async setPayment(str) {
    if (this.isLogined) {
      const user = AV.User.current();
      user.set('payment', str);
      return user.save();
    }
    return null;
  }
}

export default User;
