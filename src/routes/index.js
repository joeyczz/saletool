import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '@/pages/login/Login';
import Home from '@/pages/home/Home';

// const routeConfig = [
//   {
//     path: '/',
//     component: App,
//     indexRoute: { component: Login},
//     childRoutes: [
//       { path: 'login', component: Login}
//     ]
//   }
// ];

class RouterView extends Component {

  componentWillMount() {
    console.log('===== router');
    console.log(this.props);
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
        </div>
      </Router>
    );
  }
}

export default RouterView;
