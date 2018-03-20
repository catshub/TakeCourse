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
}
const user = new User();
const main = document.getElementById('main');
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Login} cookie={user} />
          <Route path="takecourse" component={TakeCourse} cookie={user} />
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
