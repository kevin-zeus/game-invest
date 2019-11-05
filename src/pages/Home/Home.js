import React, { Component } from 'react';
import { Layout, List, Button } from 'antd';
import styled from 'styled-components';

import shaizi from '../../assets/shaizi.svg';
import RouterConfig from '../Experiment/router';

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
                dataSource={RouterConfig}
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
