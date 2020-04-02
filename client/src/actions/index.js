// Action creators return an action, sent to reducers, state values updated in store
// Action : JS obj w type prop & optional payload
// Redux-thunk sends actions to the reducers in the store & allows them to
// instantly recalculate state

// Helps w AJAX reqs
import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () =>
  // Dispatch action helps w async (want function to run after axios req completes)
  async dispatch => {
    // Route handler (from authRoutes file)
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  };

export const handleToken = token => async dispatch => {
  // Sending data to backend
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
