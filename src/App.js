import React from 'react';
import { observer } from 'mobx-react';

@observer
class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
export default App;
