import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/carteira" component={ Wallet } />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
