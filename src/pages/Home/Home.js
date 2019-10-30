import React, { Component } from 'react';
import { Layout, List, Button } from 'antd';
import styled from 'styled-components';

import shaizi from '../../assets/shaizi.svg';

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


const games = [
  {
    title: '1、风险偏好测试',
    path: '1',
  },
  {
    title: '2、亲社会偏好测试',
    path: '2',
  },
  {
    title: '3、情绪调查',
    path: '3',
  },
  {
    title: '4、认知测试',
    path: '4',
  },
];

class Home extends Component {
  navigateTo = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    return (
      <div>
        <WrapLayout>
          <Header>投资小游戏</Header>
          <Content>
            <ImgBox>
              <img src={shaizi} alt="骰子" />
            </ImgBox>
            <ListBox>
              <List
                dataSource={games}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        onClick={() => { this.navigateTo(item.path); }}
                      >
                        开始测试
                      </Button>]}
                  >
                    {item.title}
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
