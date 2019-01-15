import React, { Component } from 'react';
import './App.css';
import RouterView from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RouterView></RouterView>
      </div>
    );
  }
}

export default App;
