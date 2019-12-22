import React, { Component } from 'react';
import {
  Input, Button, Select, message, Modal,
} from 'antd';
import styled from 'styled-components';

import UserService from '../../../server/User';
import ResultService from '../../../server/Result';

const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
const Item = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 10px 0;
  & > span {
    width: 60px;
    margin-right: 16px;
    text-align: right;
  }
  & > .ant-input,
  & > .ant-select {
    width: 180px;
  }
`;

const expeList = [
  {
    value: 'test_a',
    label: '认知测试A',
  },
  {
    value: 'test_b',
    label: '认知测试B',
  },
  {
    value: 'risk',
    label: '风险偏好',
  },
  {
    value: 'weather',
    label: '天气与空气感知',
  },
  {
    value: 'society',
    label: '亲社会偏好',
  },
  {
    value: 'emotion',
    label: '情绪调查',
  },
  {
    value: 'pre_society',
    label: '【预】亲社会偏好',
  },
  {
    value: 'pre_risk',
    label: '【预】风险偏好',
  },
];

class ClearUserResult extends Component {
  state = {
    params: {
      username: '',
      experiment: 'test_b',
    },
  }

  handleInputChange = (e) => {
    const { value } = e.target;
    const { params } = this.state;
    const temp = { ...params };
    temp.username = value.trim();
    this.setState({
      params: temp,
    });
  }

  handleSelectChange = (val) => {
    const { params } = this.state;
    const temp = { ...params };
    temp.experiment = val;
    this.setState({
      params: temp,
    });
  }

  handleSubmit = async () => {
    const { params } = this.state;
    if (!params.username) {
      message.error('学号信息不能为空!');
      return;
    }
    const user = await UserService.getUserBySchoolID(params.username);
    if (!user) {
      message.warn(`未找到学号为${params.username}的学生`);
      return;
    }
    const expe = expeList.find((r) => r.value === params.experiment);
    Modal.confirm({
      title: '询问',
      content: (
        <div>
          <p>
            学号为
            {params.username}
            的学生信息如下：
          </p>
          <p>
            姓名：
            {user.realname}
          </p>
          <p>
            学校：
            {user.school}
          </p>
          <p>
            您确认要清除该学生在【
            {expe.label}
            】实验的数据吗？点击确认之后会被清除且不能恢复！！
          </p>
        </div>
      ),
      onOk: async () => {
        try {
          const result = await ResultService.clearData(user.objectId, params.experiment);
          if (result) {
            message.success('清除成功！');
            return;
          }
          message.error(`该用户还未做${expe.label}实验`);
        } catch (error) {
          console.error(error);
        }
      },
    });
  }

  render() {
    const { params: { username, experiment } } = this.state;
    return (
      <div>
        <h3>设置清除某个用户某个实验数据</h3>
        <p>如果需要删除全部的学生实验数据，请在第三方Bmob数据服务商那里删除，该功能只能一次清空某位同学某个实验数据</p>
        <Wrap>
          <Item>
            <span>学号：</span>
            <Input value={username} onChange={this.handleInputChange} />
          </Item>
          <Item>
            <span>实验：</span>
            <Select defaultValue={experiment} onChange={this.handleSelectChange}>
              {
                expeList.map((expe) => (
                  <Select.Option key={expe.value} value={expe.value}>{expe.label}</Select.Option>
                ))
              }
            </Select>
          </Item>
          <Item>
            <span />
            <Button type="primary" icon="delete" onClick={this.handleSubmit}>删除实验数据</Button>
          </Item>
        </Wrap>
      </div>
    );
  }
}

export default ClearUserResult;
