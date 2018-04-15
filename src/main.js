import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { observable } from 'mobx';
import Login from './client/components/Login';
import TakeCourse from './client/components/TakeCourse';
import App from './App';

class User {
  @observable cookie = '';
  @observable zjh = '';
  @observable mm = '';
  @observable name = '';
}
const user = new User();
const main = document.getElementById('main');
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} user={user} />
      <Route path="takecourse" component={TakeCourse} user={user} />
    </Route>
  </Router>,
  main
);
