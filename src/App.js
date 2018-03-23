import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

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
