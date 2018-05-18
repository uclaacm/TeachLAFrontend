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

const mapDispatchToProps = dispatch => {
  return {
    login: (id) => {
      dispatch(login(id))
    },
    logout: () => {
      dispatch(logout())
    }
  }
}


const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Root;
