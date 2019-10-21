import React, { Component } from 'react';
import { Layout, List, Button } from 'antd';

import Footer from '../../components/Footer';
import styles from './home.module.less';
import shaizi from '../../assets/shaizi.svg';

const { Header, Content } = Layout;

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
    
    console.log(path);
  }

  render() {
    return (
      <div>
        <Layout>
          <Header className={styles.header}>投资小游戏</Header>
          <Content className={styles.whiteBackground}>
            <div className={styles.imgBox}>
              <img src={shaizi} alt="骰子" />
            </div>
            <div className={styles.list}>
              <List
                dataSource={games}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        onClick={() => { this.navigateTo(item.path) }}
                      >开始测试</Button>]}
                  >
                    {item.title}
                  </List.Item>
                )}
              />
            </div>
          </Content>
          <Footer />
        </Layout>
      </div>
    );
  }

}

export default Home;
