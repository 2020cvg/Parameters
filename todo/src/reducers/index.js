import { combineReducers } from 'redux';
import alert from './alert';
import param from './param';

export default combineReducers({
  alert,
  param
});
