/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import {
  Layout, List, Button, Card, Modal,
} from 'antd';
import styled from 'styled-components';

import shaizi from '../../assets/shaizi.svg';
import RouterConfig from '../Experiment/router';

import UserService from '../../server/User';
import ExperimentService from '../../server/Experiment';
import ResultService from '../../server/Result';

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
  padding: 0 20px;
`;

class Home extends Component {
  state = {
    user: null,
    expeStartList: null,
    noPayment: true,
  }

  navigateTo = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  async componentDidMount() {
    const { history } = this.props;
    if (!UserService.isLogined()) {
      history.push('/login');
    }
    this.init();
    await this.setExpeList();
  }

  init = () => {
    const user = UserService.getCurrentUser();
    if (user) {
      this.setState({
        user,
      }, () => {
        if (user.payment) {
          this.setState({
            noPayment: false,
          });
        } else {
          Modal.warn({
            title: '提示',
            content: '请先在个人信息里面设置您的收益支付方式',
          });
        }
      });
    }
  }

  setExpeList = async () => {
    const expeList = await ExperimentService.getAllExperiment();
    const types = expeList.map((r) => ([
      r.type, r.isStart,
    ]));
    const tempObj = {};
    types.forEach((i) => {
      tempObj[i[0]] = i[1];
    });
    this.setState({
      expeStartList: tempObj,
    }, async () => {
      const { expeStartList } = this.state;
      const expe = await ResultService.getCurrentUserResult();
      if (expe) {
        const temp = { ...expeStartList };
        const keys = Object.keys(expeStartList);
        keys.forEach((type) => {
          if (expe[type]) {
            temp[type] = false;
          }
        });
        this.setState({
          expeStartList: temp,
        });
      }
    });
  }

  render() {
    const { user, expeStartList, noPayment } = this.state;
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
                  <p>姓名：{user.realname}</p>
                  <p>学号：{user.username}</p>
                  <p>学校：{user.school}</p>
                  <p>收益支付方式：
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
              expeStartList
                ? !expeStartList.test_b && <p style={{ padding: '20px 20px', color: 'red' }}>请按照实验E-S-R-W-A的顺序依次开始实验</p>
                : ''
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
                            disabled={noPayment || !expeStartList[item.type]}
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
