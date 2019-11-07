import moment from 'moment';
import AV from './server';

class Result {
  static async addResult(expeID, value, step = 0, { beginTime, endTime }) {
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
      tempObj[`${prev}_begintime`] = beginTime;
      tempObj[`${prev}_endtime`] = endTime;
      const spanTime = moment(endTime) - moment(beginTime);
      tempObj[`${prev}_timespan`] = moment(spanTime).format('HH:mm:ss');


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

  static async getResult(expeID) {
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
