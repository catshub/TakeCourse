import React from 'react';
import { observer } from 'mobx-react';
import { Button, Form, Input, message, Row } from 'antd';

@Form.create()
@observer
export default class TakeCourse extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { getFieldValue: GV, validateFields } = this.props.form;
    const { zjh, mm, name } = this.props.route.user;
    validateFields(err => {
      if (!err) {
        const data = {
          query: {
            second: {
              kch: GV('kch'),
              cxkxh: GV('cxkxh'),
              preActionType: 2,
              actionType: 5,
              pageNumber: -2,
              kcm: '',
              skjs: '',
              kkxsjc: '',
              skxq: '',
              skjc: '',
            },
            third: {
              kcId: `${GV('kch')}_${GV('cxkxh')}`,
              preActionType: 5,
              actionType: 9,
            },
          },
          user: { zjh, mm, name },
        };
        console.log(JSON.stringify(data));
        const loading = message.loading('...', 0);
        fetch('http://draven-system.xhuyq.me:8101/xkAction', {
          method: 'post',
          body: JSON.stringify(data),
          credentials: 'include',
        })
          .then(res => res.text())
          .then(response => {
            this.resData = response;
            loading();
            setTimeout(() => message.info(this.resData), 700);
          })
          .catch(error => message.info(error));
      }
    });
  };
  render() {
    const { name } = this.props.route.user;
    const { getFieldDecorator: GD } = this.props.form;
    const itemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 10 }, style: { textAlign: 'center' } };
    return (
      <Row type="flex" justify="center">
        <Form onSubmit={this.handleSubmit} style={{ margin: '10px', width: '800px' }}>
          <Form.Item style={{ textAlign: 'center' }}>
            <span>{name}</span>
          </Form.Item>
          <Form.Item label="课程号" {...itemLayout}>
            {GD('kch', { initialValue: '', rules: [{ required: true, message: '请输入数字课程号!' }] })(<Input placeholder="如: 909019020" />)}
          </Form.Item>
          <Form.Item label="课序号" {...itemLayout}>
            {GD('cxkxh', { initialValue: '', rules: [{ required: true, message: '请输入数字课序号!' }] })(<Input placeholder="如: 01" />)}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button htmlType="submit">抢课</Button>
          </Form.Item>
        </Form>
      </Row>
    );
  }
}
