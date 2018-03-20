import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute, Redirect } from 'react-router';
import { observable } from 'mobx';
import { AppContainer } from 'react-hot-loader';
import Login from './components/Login';
import TakeCourse from './components/TakeCourse';
import App from './App';

class User {
  @observable cookie = '';
  @observable name = ''
}
const user = new User();
const main = document.getElementById('main');
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Login} user={user} />
          <Route path="takecourse" component={TakeCourse} user={user} />
        </Route>
      </Router>
    </AppContainer>,
    main
  );
};
render();
// if (module.hot) {
//   console.warn('hoting');
//   module.hot.accept('./App', () => {
//     console.warn('Apping');
//     render();
//   });
// }
