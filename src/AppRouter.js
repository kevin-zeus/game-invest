import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import Home from './pages/Home/Home';
import RiskAppetite from './pages/Experiment/RiskAppetite';

class AppRouter extends Component {
  
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/risk' exact component={RiskAppetite} />
          </Switch>
        </Router>
      </ConfigProvider>
    );
  }

}

export default AppRouter;
