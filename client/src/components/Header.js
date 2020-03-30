import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      // Must be logged in
      default:
        // Returning an array bc being rendered as a UL
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="3" style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Email Surveys
          </Link>
          <ul className="right">
            <ul className="right">{this.renderContent()}</ul>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  // Only care about auth prop (from authReducer)
  return {
    auth: {}
  };
}

export default connect(mapStateToProps)(Header);
