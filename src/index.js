import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'lib-flexible';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
// import App from './App';
import * as serviceWorker from './serviceWorker';

import _ from 'lodash';
import RouterView from './routes';
import storage from './utils/storage';
import Constant from './utils/constant';
import { setCookie } from '@/utils/utils';

// 处理token
const cookies = storage.lsGetValue(Constant.cookiesInfo);
if (!_.isNil(cookies)) {
  setCookie(Constant.token, cookies.token);
  setCookie(Constant.saleId, cookies.saleId);
  setCookie(Constant.saleMobile, cookies.saleMobile);
}

ReactDOM.render(<RouterView />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
