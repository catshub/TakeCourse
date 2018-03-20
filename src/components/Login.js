import React from 'react';
import { observer } from 'mobx-react';
import { observable, configure, action } from 'mobx';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { browserHistory, hashHistory, Link } from 'react-router';

// configure({ enforceActions: true });
@Form.create()
@observer
export default class Login extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     resData: 'state',
  //   };
  // }
  @observable resData = 'nothin';
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
          withCredentials: true,
        }).then(response => {
          this.resData = typeof response.data === 'object' ? response.data : JSON.parse(response.data);
          this.props.route.user.cookie = this.resData.cookie;
          this.props.route.user.name = this.resData.name;
          document.cookie = this.resData.cookie;
          console.warn(this.resData);
          // this.setState({resData: response.data})
          if (this.resData.cookie) {
            message.success(`登录成功,欢迎${this.resData.name}`);
            hashHistory.push('/takecourse');
          } else message.warning('登录失败');
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const itemLayout = { labelCol: { span: 4, offset: 7 }, wrapperCol: { span: 6 }, style: { textAlign: 'center' } };
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="学号" {...itemLayout}>
          {getFieldDecorator('userName', {
            initialValue: 2014141462275,
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item label="密码" {...itemLayout}>
          {getFieldDecorator('password', {
            initialValue: 'x9601157cd',
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input type="password" placeholder="Password" />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 6, offset: 9 }} style={{ textAlign: 'center' }}>
          {/* <Link to="/takecourse"> */}
          <Button htmlType="submit">Login</Button>
          {/* </Link> */}
        </Form.Item>
        {/* <Form.Item>
          <Input.TextArea autosize value={this.resData} />
        </Form.Item> */}
      </Form>
    );
  }
}
