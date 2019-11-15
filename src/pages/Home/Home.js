/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import {
  Layout, List, Button, Card,
} from 'antd';
import styled from 'styled-components';

import shaizi from '../../assets/shaizi.svg';
import RouterConfig from '../Experiment/router';

import UserService from '../../server/User';
import ExperimentService from '../../server/Experiment';

const { Content } = Layout;
const WrapLayout = styled(Layout)`
  & {
    background-color: white !important;
  }
`;
const Header = styled.div`
  text-align: center;
  margin: 20px;
  font-size: 20px;
  color: #FF9912;
`;
const ImgBox = styled.div`
  text-align: center;
  margin: 50px 0;
  img {
    width: 30%;
  }
`;
const ListBox = styled.div`
  padding: 30px 20px;
`;

class Home extends Component {
  state = {
    user: null,
    expeStartList: null,
  }

  navigateTo = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  componentDidMount() {
    const { history } = this.props;
    if (!UserService.isLogined()) {
      history.push('/login');
    }
    this.init();
    this.setExpeList();
  }

  init = () => {
    const user = UserService.getCurrentUser();
    if (user) {
      this.setState({
        user: user.attributes,
      });
    }
  }

  setExpeList = async () => {
    const expeList = await ExperimentService.getAllExperiment();
    const types = expeList.map((r) => ([
      r.get('type'), r.get('isStart'),
    ]));
    const tempObj = {};
    types.forEach((i) => {
      tempObj[i[0]] = i[1];
    });
    this.setState({
      expeStartList: tempObj,
    });
  }

  render() {
    const { user, expeStartList } = this.state;
    return (
      <div>
        <WrapLayout>
          <Header>投资小游戏</Header>
          <Content>
            <ImgBox>
              <img src={shaizi} alt="骰子" />
            </ImgBox>
            {
              user && (
                <Card style={{ margin: '0 20px' }}>
                  <h3>请查阅您的信息</h3>
                  <p>姓名：{user.realName}</p>
                  <p>学号：{user.username}</p>
                  <p>学校：{user.school}</p>
                  <p>收益方式：
                    {
                      user.payment || (
                        <Button type="link" onClick={() => this.navigateTo('/payment')}>设置</Button>
                      )
                    }
                  </p>
                </Card>
              )
            }
            {
              expeStartList && (
                <ListBox>
                  <List
                    dataSource={RouterConfig}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            type="link"
                            onClick={() => { this.navigateTo(item.path); }}
                            disabled={!expeStartList[item.type]}
                          >
                            开始实验
                          </Button>]}
                      >
                        {item.name}
                      </List.Item>
                    )}
                  />
                </ListBox>
              )
            }
          </Content>
        </WrapLayout>
      </div>
    );
  }
}

export default Home;
