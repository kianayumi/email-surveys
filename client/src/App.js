// Using own server for React bc Express server only sends JSON
// React server takes components > Webpack & Babel bundles > server > bundled
// data > browser
// React server send frontend assets (Express server sends data assets)

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hi There</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a href="http://localhost:5000/auth/google">Sign In with Google</a>
      </header>
    </div>
  );
}

export default App;
