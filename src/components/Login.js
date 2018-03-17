import React from 'react';
import { observer } from 'mobx-react';
import { observable, configure, action } from 'mobx';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';

configure({ enforceActions: true });
@Form.create()
@observer
export default class Login extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     resData: 'state',
  //   };
  // }
  @observable resData = 'nothing';
  handleSubmit = e => {
    const { getFieldValue } = this.props.form;
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const data = JSON.stringify({
          zjh: getFieldValue('userName'),
          mm: getFieldValue('password'),
        });
        console.log(data);
        axios({
          method: 'post',
          baseURL: 'http://localhost:8101',
          url: '/loginAction',
          data: `zjh=${getFieldValue('userName')}&mm=${getFieldValue('password')}`,
        }).then(response => {
          this.resData = response.data;
          // this.setState({resData: response.data})
          if (response.data.includes('学分制综合教务')) {
            message.success('登录成功');
          } else message.warning('登录失败');
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('userName', {
            initialValue: 2014141462275,
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            initialValue: 'x9601157cd',
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input type="password" placeholder="Password" />)}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Login</Button>
        </Form.Item>
        <Form.Item>
          <Input.TextArea autosize value={this.resData} />
        </Form.Item>
      </Form>
    );
  }
}
