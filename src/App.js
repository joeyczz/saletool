import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import reducers from './store/reducers/index';

import Login from '@/pages/login/Login';
import Home from '@/pages/home/Home';
import Report from '@/pages/report/Report';
import Me from '@/pages/me/Me';

// const store = createStore(reducers);

const store = createStore(
  reducers /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  componentWillMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/report" component={Report} />
            <Route path="/me" component={Me} />
            <Route path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
