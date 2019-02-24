import { combineReducers } from 'redux';
import activeStore from './activeStore';
import userInfo from './userInfo';

const reducers = combineReducers({
  activeStore,
  userInfo,
});

export default reducers;
