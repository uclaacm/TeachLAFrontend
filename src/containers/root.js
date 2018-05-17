/*
	used to link state to App which contains the router, could link functions, but rather do that in each individual container
*/

import React from 'react';
import App from './app';
import {connect} from 'react-redux'
import {login, logout} from '../actions'


const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

const Root = connect(
  mapStateToProps
)(App)

export default Root;
