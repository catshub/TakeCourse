import React from 'react';
import { observer } from 'mobx-react';
import { observable, configure, action } from 'mobx';
import { Button } from 'antd';

configure({ enforceActions: true });
@observer
export default class Login extends React.Component {
  @observable count = 10;
  @action add = () => {
    this.count = this.count + 1;
  };
  render() {
    // const count = this.count;
    console.log(this.count);
    return <Button onClick={this.add}>{this.count}..</Button>;
  }
}
