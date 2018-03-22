import React from 'react';
import { observer } from 'mobx-react';
import { observable, configure, action } from 'mobx';
import { Button, Form, Input, message, Row, Col } from 'antd';
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
          baseURL: 'http://139.199.190.123:8101',
          url: '/loginAction',
          data: `zjh=${getFieldValue('userName')}&mm=${getFieldValue('password')}`,
          withCredentials: true,
          // headers: {
          //   Connection: 'keep-alive',
          // },
        })
          .then(response => {
            if (response.data !== '登录失败') {
              this.resData = typeof response.data === 'object' ? response.data : JSON.parse(response.data);
              this.props.route.user.cookie = this.resData.cookie;
              this.props.route.user.name = this.resData.name;
              this.props.route.user.zjh = getFieldValue('userName');
              this.props.route.user.mm = getFieldValue('password');
              // document.cookie = this.resData.cookie;
              console.warn(this.resData);
              // this.setState({resData: response.data})
              if (this.resData.cookie) {
                message.success(`登录成功,欢迎${this.resData.name}`);
                hashHistory.push('/takecourse');
              } else message.warning('登录失败');
            } else message.warning('登录失败');
          })
          .catch(error => message.warning(error));
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const itemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 10 }, style: { textAlign: 'center' } };
    return (
      <Row type="flex" justify="center">
        <Form onSubmit={this.handleSubmit} style={{ margin: '10px', width: '800px' }}>
          <Form.Item label="学号" {...itemLayout}>
            {getFieldDecorator('userName', {
              // initialValue: 2014141462275,
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input placeholder="Username" />)}
          </Form.Item>
          <Form.Item label="密码" {...itemLayout}>
            {getFieldDecorator('password', {
              // initialValue: 'x9601157cd',
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input type="password" placeholder="Password" />)}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            {/* <Link to="/takecourse"> */}
            <Button htmlType="submit">Login</Button>
            {/* </Link> */}
          </Form.Item>
          {/* <Form.Item>
          <Input.TextArea autosize value={this.resData} />
        </Form.Item> */}
          <div style={{ textAlign: 'center' }}>注: 需要使用课程号,请先自行登录教务处记下所选课的课程号和课序号.时间不足,存在较多问题,希望见谅</div>
        </Form>
      </Row>
    );
  }
}
