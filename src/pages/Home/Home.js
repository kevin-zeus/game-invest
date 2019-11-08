/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Layout, List, Button } from 'antd';
import styled from 'styled-components';

import shaizi from '../../assets/shaizi.svg';
import RouterConfig from '../Experiment/router';

import UserService from '../../server/User';

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
  }

  navigateTo = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const user = UserService.getCurrentUser();
    if (user) {
      this.setState({
        user: user.attributes,
      });
    }
  }

  render() {
    const { user } = this.state;
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
                <div style={{ textAlign: 'center' }}>
                  <p>学生信息</p>
                  <p>姓名：{user.realName}</p>
                  <p>学号：{user.username}</p>
                  <p>学校：{user.school}</p>
                </div>
              )
            }
            <ListBox>
              <List
                dataSource={RouterConfig}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        onClick={() => { this.navigateTo(item.path); }}
                      >
                        开始实验
                      </Button>]}
                  >
                    {item.name}
                  </List.Item>
                )}
              />
            </ListBox>
          </Content>
        </WrapLayout>
      </div>
    );
  }
}

export default Home;
