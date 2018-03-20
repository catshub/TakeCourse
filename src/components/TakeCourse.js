import React from 'react';
import { observer } from 'mobx-react';
import { observable, configure, action } from 'mobx';
import { Button, Form, Input, message, Select } from 'antd';
import axios from 'axios';

// configure({ enforceActions: true });
const NUM = [];
for (let i = 0; i < 13; i++) NUM[i] = i + 1;
@Form.create()
@observer
export default class TakeCourse extends React.Component {
  @observable cookie = '';
  handleSubmit = e => {
    e.preventDefault();
    const { getFieldsValue: GVs, validateFields } = this.props.form;
    validateFields((err, value) => {
      if (!err) {
        const data = Object.assign({}, GVs(), { pageNumber: -2, preActionType: 3, actionType: 5 });
        console.log(JSON.stringify(data));
        axios({
          method: 'post',
          baseURL: 'http://localhost:8101',
          url: '/skAction',
          // headers: {
          //   Cookie: this.cookie,
          // },
          data: JSON.stringify(data),
          withCredentials: true,
        }).then(response => {
          this.resData = response.data;
          console.warn(this.resData);
        });
      }
    });
  };
  render() {
    this.cookie = this.props.route.user.cookie;
    this.name = this.props.route.user.name;
    const { getFieldDecorator: GD } = this.props.form;
    const itemLayout = { labelCol: { span: 4, offset: 7 }, wrapperCol: { span: 6 }, style: { textAlign: 'center' } };
    const selectConfig = {
      allowClear: true,
      dropdownMatchSelectWidth: true,
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item style={{ textAlign: 'center' }}>
          <span>{this.name}</span>
        </Form.Item>
        <Form.Item label="课程号" {...itemLayout}>
          {GD('kch', { initialValue: '' })(<Input />)}
        </Form.Item>
        <Form.Item label="课序号" {...itemLayout}>
          {GD('cxkxh', { initialValue: '' })(<Input />)}
        </Form.Item>
        <Form.Item label="课程名" {...itemLayout}>
          {GD('kcm', { initialValue: '' })(<Input />)}
        </Form.Item>
        <Form.Item label="教师" {...itemLayout}>
          {GD('skjs', { initialValue: '' })(<Input />)}
        </Form.Item>
        <Form.Item label="开课系" {...itemLayout}>
          {GD('kkxsjc', { initialValue: '' })(<Input />)}
        </Form.Item>
        <Form.Item label="上课星期" {...itemLayout}>
          {GD('skxq', { initialValue: '' })(<Select {...selectConfig}>
            {NUM.slice(0, 7).map(x => (
              <Select.Option value={x} key={x}>
                  星期{x}
              </Select.Option>
              ))}
          </Select>)}
        </Form.Item>
        <Form.Item label="上课节次" {...itemLayout}>
          {GD('skjc', { initialValue: '' })(<Select {...selectConfig}>
            {NUM.map(x => (
              <Select.Option value={x} key={x}>
                  第{x}节
              </Select.Option>
              ))}
          </Select>)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 6, offset: 9 }} style={{ textAlign: 'center' }}>
          {/* <Link to="/takecourse"> */}
          <Button htmlType="submit">搜索</Button>
          {/* </Link> */}
        </Form.Item>
      </Form>
    );
  }
}
