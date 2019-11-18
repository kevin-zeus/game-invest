import moment from 'moment';
import Bmob from './server';

class Result {
  static async addResult(expeID, value, step = 0, { beginTime, endTime } = {}) {
    try {
      const User = Bmob.User.current();

      const Experiment = Bmob.Query('Experiment');
      const expe = await Experiment.get(expeID);
      const PUser = Bmob.Pointer('_User').set(User.objectId);
      const PExpe = Bmob.Pointer('Experiment').set(expe.objectId);

      const res = Bmob.Query('Result');
      res.equalTo('user', '==', PUser);
      res.equalTo('experiment', '==', PExpe);
      const result = await res.find();

      const query = Bmob.Query('Result');
      if (result[0]) {
        query.set('id', result[0].objectId);
      } else {
        query.set('user', PUser);
        query.set('experiment', PExpe);
        query.set('student', User.realname);
        query.set('expename', expe.name);
        query.set('expetype', expe.type);
      }

      const tempObj = { ...value };
      const keys = Object.keys(tempObj);
      const prev = keys[0];
      if (beginTime) {
        tempObj[`${prev}_begintime`] = beginTime;
      }
      if (endTime) {
        tempObj[`${prev}_endtime`] = endTime;
      }
      if (beginTime && endTime) {
        const spanTime = moment(endTime) - moment(beginTime);
        tempObj[`${prev}_timespan`] = moment(spanTime).format('mm:ss');
      }

      query.set('step', step);
      query.addUnique('resultList', [tempObj]);
      return query.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCurrentUserResult() {
    try {
      const User = Bmob.User.current();
      const PUser = Bmob.Pointer('_User').set(User.objectId);

      const res = Bmob.Query('Result');
      res.equalTo('user', '==', PUser);
      const result = await res.find();

      if (result.length === 0) {
        return null;
      }
      let data = result.filter((r) => r.isComplete);
      data = data.reduce((pre, cur) => {
        const temp = { ...pre };
        temp[cur.expetype] = true;
        return temp;
      }, {});
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // eslint-disable-next-line consistent-return
  static async setComplete(expeID) {
    try {
      const User = Bmob.User.current();
      const PUser = Bmob.Pointer('_User').set(User.objectId);
      const PExpe = Bmob.Pointer('Experiment').set(expeID);

      const query = Bmob.Query('Result');
      query.equalTo('user', '==', PUser);
      query.equalTo('experiment', '==', PExpe);

      const res = await query.find();
      if (!res[0]) {
        return null;
      }

      query.set('id', res[0].objectId);
      query.set('isComplete', true);
      return query.save();
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllResult(expeID) {
    try {
      const Experiment = Bmob.Query('Experiment');
      const expe = await Experiment.get(expeID);
      const PExpe = Bmob.Pointer('Experiment').set(expe.objectId);

      const res = Bmob.Query('Result');
      res.equalTo('experiment', '==', PExpe);
      res.include('user');
      const result = await res.find();

      if (result) {
        const data = result.map((r) => {
          const arr = r.resultList;

          const name = r.user.realname;
          const schoolID = r.user.username;
          const { school } = r.user;
          const { payment } = r.user;
          const o = {};
          o.Name = name;
          o.Student_id = schoolID;
          o.University = school;
          o.Payment = payment;

          arr.unshift(o);
          return arr;
        });
        const cleanData = data.map((item) => {
          const temp = item.reduce((pre, cur) => Object.assign(pre, cur), {});
          // const keys = Object.keys(temp).sort();
          // const newObj = {};
          // for (let i = 0; i < keys.length; i += 1) {
          //   newObj[keys[i]] = temp[keys[i]];
          // }
          // return newObj;
          return temp;
        });
        return cleanData;
      }
      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCurrentStep(expeID) {
    try {
      const User = Bmob.User.current();

      const Experiment = Bmob.Query('Experiment');
      const expe = await Experiment.get(expeID);
      const PUser = Bmob.Pointer('_User').set(User.objectId);
      const PExpe = Bmob.Pointer('Experiment').set(expe.objectId);

      const res = Bmob.Query('Result');
      res.equalTo('user', '==', PUser);
      res.equalTo('experiment', '==', PExpe);
      const result = await res.find();

      if (!result[0]) {
        return 0;
      }
      const data = result[0];
      return data.step;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Result;
