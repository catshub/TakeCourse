import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import { observer } from 'mobx-react';
import { observable, configure } from 'mobx';
import { hot } from 'react-hot-loader';
import Login from './components/Login';
import TakeCourse from './components/TakeCourse';

// configure({ enforceActions: true });

// const main = document.getElementById('main');
// ReactDOM.render(
//   <Router history={browserHistory}>
//     <Route path="/" component={Login} />
//     <Route path="/takecourse" component={TakeCourse} />
//   </Router>,
//   main
// );
@observer
class App extends React.Component {
  @observable link = '/loging';
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
export default App;
