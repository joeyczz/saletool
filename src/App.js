import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '@/pages/login/Login';
import Home from '@/pages/home/Home';
import StoreList from '@/pages/storeList/StoreList';

class App extends Component {

  componentWillMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/storeList" component={StoreList}></Route>
          <Route path="/" component={Home}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </Router>
    );
  }
}

export default App;
