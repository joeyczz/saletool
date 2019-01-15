import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from "@/pages/login/Login";

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
          <Route exact path="/" component={Login}></Route>
          <Route path="/login" component={Login}></Route>
        </div>
      </Router>
    );
  }
}

export default RouterView;
