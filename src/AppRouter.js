import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import HomeRoot from './pages/Home';
import Admin from './pages/Admin/Admin';

class AppRouter extends PureComponent {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route path="/admin" exact component={Admin} />
            <Route path="/" component={HomeRoot} />
          </Switch>
        </Router>
      </ConfigProvider>
    );
  }
}

export default AppRouter;
