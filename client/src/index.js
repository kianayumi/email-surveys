// If no path specified, webpack assumes referring to npm module
// Don't need to refer to var name for import, just need to import file
// Axios helps make AJAX reqs to backend API
// Redux-thunk maintains async action creators (action creators don't need to
// immediately return an action)
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// New instance of redux store
// createStore(reducer, )
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  // Provider hooks up Redux to React side of app
  // When Redux store's state changes, Provider updates its components (<App />)
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
