import { FETCH_USER } from '../actions/types';

// Initial state is null (don't know if user is logged in)
export default function(state = null, action) {
  switch (action.type) {
    // When FETCH_USER action responds, can tell if signed in
    case FETCH_USER:
      // User model
      // authReducer model will return null/action.payload/false(empty string)
      return action.payload || false;
    default:
      return state;
  }
}
