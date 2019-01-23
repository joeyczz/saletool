import React, { Component } from 'react';
import './App.css';
import RouterView from './routes';
import storage from './utils/storage';
import Constant from './utils/constant';
import { injectUnmout, setCookie } from '@/utils/utils';

@injectUnmout
class App extends Component {
  componentWillMount() {
    // 处理token
    const cookies = storage.lsGetValue(Constant.cookiesInfo);
    setCookie(Constant.token, cookies.token);
    setCookie(Constant.saleId, cookies.saleId);
    setCookie(Constant.saleMobile, cookies.saleMobile);
  }

  render() {
    return (
      <div className="App">
        <RouterView></RouterView>
      </div>
    );
  }
}

export default App;
