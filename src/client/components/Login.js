import React from 'react';
import { observer } from 'mobx-react';
import { Button, Form, Input, message, Row } from 'antd';
import { hashHistory } from 'react-router';

@Form.create()
@observer
export default class Login extends React.Component {
  handleSubmit = e => {
    const { getFieldValue: GV } = this.props.form;
    e.preventDefault();
    this.props.form.validateFields(err => {
      if (!err) {
        fetch('http://draven-system.xhuyq.me:8101/loginAction', {
          method: 'post',
          body: JSON.stringify({ zjh: GV('zjh'), mm: GV('mm') }),
          credentials: 'include',
        })
          .then(res => res.text())
          .then(response => {
            if (response !== '登录失败') {
              const resData = typeof response === 'object' ? response : JSON.parse(response);
              this.props.route.user.cookie = resData.cookie;
              this.props.route.user.name = resData.name;
              this.props.route.user.zjh = GV('zjh');
              this.props.route.user.mm = GV('mm');
              // document.cookie = this.resData.cookie;
              console.warn(resData);
              if (resData.cookie) {
                message.success(`登录成功,欢迎${resData.name}`);
                hashHistory.push('/takecourse');
              } else message.warning('登录失败');
            } else message.warning(response);
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
            {getFieldDecorator('zjh', {
              // initialValue: 2014141462275,
              rules: [{ required: true, message: '请输入学号！' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码" {...itemLayout}>
            {getFieldDecorator('mm', {
              // initialValue: 'x9601157cd',
              rules: [{ required: true, message: '请输入密码！' }],
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button htmlType="submit">Login</Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>注: 需要使用课程号,请先自行登录教务处记下所选课的课程号和课序号.</div>
        </Form>
      </Row>
    );
  }
}
