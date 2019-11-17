import moment from 'moment';
import AV from './server';

class Result {
  static async addResult(expeID, value, step = 0, { beginTime, endTime } = {}) {
    try {
      const User = AV.User.current();

      const Experiment = new AV.Query('Experiment');
      const expe = await Experiment.get(expeID);

      const res = new AV.Query('Result');
      res.equalTo('user', User);
      res.equalTo('experiment', expe);
      let result = await res.find();
      if (!result[0]) {
        result = AV.Object.createWithoutData('Result');
      } else {
        result = AV.Object.createWithoutData('Result', result[0].id);
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


      result.set('user', User);
      result.set('experiment', expe);
      result.set('step', step);
      result.addUnique('resultList', tempObj);
      const newResult = await result.save();
      return newResult;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCurrentUserResult(expeID) {
    try {
      const User = AV.User.current();

      const Experiment = new AV.Query('Experiment');
      const expe = await Experiment.get(expeID);

      const res = new AV.Query('Result');
      res.equalTo('user', User);
      res.equalTo('experiment', expe);
      const result = await res.find();

      if (!result[0]) {
        return null;
      }
      const data = result[0];
      return data.get('resultList');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllResult(expeID) {
    try {
      const Experiment = new AV.Query('Experiment');
      const expe = await Experiment.get(expeID);

      const res = new AV.Query('Result');
      res.equalTo('experiment', expe);
      res.include('user');
      const result = await res.find();

      if (result) {
        const data = result.map((r) => {
          const arr = r.get('resultList');

          const name = r.get('user').get('realName');
          const schoolID = r.get('user').get('username');
          const school = r.get('user').get('school');
          const payment = r.get('user').get('payment');
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
          const keys = Object.keys(temp).sort();
          const newObj = {};
          for (let i = 0; i < keys.length; i += 1) {
            newObj[keys[i]] = temp[keys[i]];
          }
          return newObj;
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
      const User = AV.User.current();

      const Experiment = new AV.Query('Experiment');
      const expe = await Experiment.get(expeID);

      const res = new AV.Query('Result');
      res.equalTo('user', User);
      res.equalTo('experiment', expe);
      const result = await res.find();

      if (!result[0]) {
        return 0;
      }
      const data = result[0];
      return data.get('step');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Result;
