// If file exports class or React component (fxn/class-based) = capitalized

import React, { Component } from 'react';
// BrowserRouter tells react-router how to behave (what comps should be visible
// based on URL)
// Route sets up rule btn route and comps that need to be rendered
import { BrowserRouter, Route } from 'react-router-dom';
// { connect } allows comps to call action creators
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => {
  return <h2>Dashboard</h2>;
};

const SurveyNew = () => {
  return <h2>SurveyNew</h2>;
};

class App extends Component {
  // Using compDidMount bc standard for initial AJAX reqs
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        {/* BrowserRouter only accepts one child (comp) */}
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// connect("mapStateToProps", "action creators")
// action creators will be passed to App as props
export default connect(null, actions)(App);
