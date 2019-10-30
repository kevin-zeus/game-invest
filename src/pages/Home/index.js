import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer';

import Home from './Home';
import Register from './Register';
import Login from './Login';

import UserService from '../../server/User';

const Wrap = styled.div`
  @media screen and (min-width: 800px) {
    min-height: 100%;
    & {
      max-width: 480px;
      margin: 0 auto;
      box-shadow: 0 2px 3px #989898;
    }
  }
`;

class HomeRoot extends Component {
  // 在这里进行用户权限判断，看是否进行登录
  componentDidMount() {
    const { history } = this.props;
    if (!UserService.isLogined()) {
      history.push('/login');
    }
  }

  render() {
    return (
      <Wrap>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <Footer {...this.props} />
      </Wrap>
    );
  }
}

export default HomeRoot;
