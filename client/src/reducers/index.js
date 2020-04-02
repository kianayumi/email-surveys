import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Keys rep keys w/in state obj
export default combineReducers({
  auth: authReducer
});
