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
        console.log(data);
        axios({
          method: 'post',
          baseURL: 'http://localhost:8101',
          url: '/skAction',
          headers: {
            Cookie: this.cookie,
          },
          data,
        }).then(response => {
          this.resData = response.data;
          console.warn(this.resData);
        });
      }
    });
  };
  render() {
    this.cookie = this.props.route.cookie.cookie;
    const { getFieldDecorator: GD } = this.props.form;
    const itemLayout = { labelCol: { span: 4, offset: 7 }, wrapperCol: { span: 6 }, style: { textAlign: 'center' } };
    const selectConfig = {
      allowClear: true,
      dropdownMatchSelectWidth: true,
    };
    return (
      // <TABLE id=tblView border=0 cellSpacing=0 cellPadding=0><TBODY>
      // <TR>
      // <TD width="25%" height=25 class=fieldName>课程号:&nbsp;</TD>
      // <TD width="75%"><INPUT name=kch style="FONT-SIZE: 9pt; BORDER-TOP: #9a9999 1px solid; BORDER-RIGHT: #9a9999 1px solid; WIDTH: 150px; BORDER-BOTTOM: #9a9999 1px solid; BORDER-LEFT: #9a9999 1px solid" onmouseover=this.focus() onfocus=this.select() type=text></TD></TR>
      // <TR>
      // <TD width="25%" height=25 class=fieldName>课序号:&nbsp;</TD>
      // <TD width="75%"><INPUT name=cxkxh style="FONT-SIZE: 9pt; BORDER-TOP: #9a9999 1px solid; BORDER-RIGHT: #9a9999 1px solid; WIDTH: 150px; BORDER-BOTTOM: #9a9999 1px solid; BORDER-LEFT: #9a9999 1px solid" onmouseover=this.focus() onfocus=this.select() type=text></TD></TR>
      // <TR>
      // <TD width="25%" height=25 class=fieldName>课程名:&nbsp;</TD>
      // <TD width="75%"><INPUT name=kcm style="FONT-SIZE: 9pt; BORDER-TOP: #9a9999 1px solid; BORDER-RIGHT: #9a9999 1px solid; WIDTH: 150px; BORDER-BOTTOM: #9a9999 1px solid; BORDER-LEFT: #9a9999 1px solid" onmouseover=this.focus() onfocus=this.select() type=text></TD></TR>
      // <TR>
      // <TD width="25%" height=25 class=fieldName>教师:&nbsp;</TD>
      // <TD width="75%"><INPUT name=skjs style="FONT-SIZE: 9pt; BORDER-TOP: #9a9999 1px solid; BORDER-RIGHT: #9a9999 1px solid; WIDTH: 150px; BORDER-BOTTOM: #9a9999 1px solid; BORDER-LEFT: #9a9999 1px solid" onmouseover=this.focus() onfocus=this.select() type=text></TD></TR>
      // <TR>
      // <TD width="25%" height=25 class=fieldName>开课系:&nbsp;</TD>
      // <TD width="75%"><INPUT name=kkxsjc style="FONT-SIZE: 9pt; BORDER-TOP: #9a9999 1px solid; BORDER-RIGHT: #9a9999 1px solid; WIDTH: 150px; BORDER-BOTTOM: #9a9999 1px solid; BORDER-LEFT: #9a9999 1px solid" onmouseover=this.focus() onfocus=this.select() type=text></TD></TR>
      // <TR>
      // <TD width="25%" height=25 class=fieldName>上课星期</TD>
      // <TD width="75%" height=25><SELECT name=skxq> <OPTION selected></OPTION> <OPTION value=1>星期1</OPTION> <OPTION value=2>星期2</OPTION> <OPTION value=3>星期3</OPTION> <OPTION value=4>星期4</OPTION> <OPTION value=5>星期5</OPTION> <OPTION value=6>星期6</OPTION> <OPTION value=7>星期7</OPTION></SELECT> </TD></TR>
      // <TR>
      // <TD width="25%" height=25 class=fieldName>上课节次</TD>
      // <TD width="75%" height=25 > <SELECT name=skjc > <OPTION selected></OPTION> <OPTION value=1 > 第一节</OPTION> <OPTION value=2 > 第二节</OPTION> <OPTION value=3 > 第三节</OPTION> <OPTION value=4 > 第四节</OPTION> <OPTION value=5 > 第五节</OPTION> <OPTION value=6 > 第六节</OPTION> <OPTION value=7 > 第七节</OPTION> <OPTION value=8 > 第八节</OPTION> <OPTION value=9 > 第九节</OPTION> <OPTION value=10 > 第十节</OPTION> <OPTION value=11 > 第十一节</OPTION> <OPTION value=12 > 第十二节</OPTION> <OPTION value=13 > 第十三节</OPTION></SELECT> </TD></TR > <INPUT name=pageNumber type=hidden value=-2 > </ TBODY></TABLE>
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="课程号" {...itemLayout}>
          {GD('kch', { initialValue: '', rules: [{ type: 'number', message: 'Please input number' }] })(<Input />)}
        </Form.Item>
        <Form.Item label="课序号" {...itemLayout}>
          {GD('cxkxh', { initialValue: '', rules: [{ type: 'number', message: 'Please input number' }] })(<Input />)}
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
