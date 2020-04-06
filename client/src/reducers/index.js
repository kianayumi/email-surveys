import { combineReducers } from 'redux';
// Clarified what reducer refers to
// Redux-Form helps coordinate & simplify redux (we require and change state often)
// Takes care of calling action creators and pulling state out of store & providing
// to other components
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

// Keys rep keys w/in state obj
export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
