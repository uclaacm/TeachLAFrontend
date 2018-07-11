/*
	used to link state to App which contains the router, could link functions, but rather do that in each individual container
*/

import React from 'react';
import App from './app';
import {connect} from 'react-redux'
import {loadUserData, clearUserData} from '../actions/userDataActions'


const mapStateToProps = state => {
  return {
    loggedInUserData: state.app.userDataReducers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUserData: (userData) => {
      dispatch(loadUserData(userData))
    },
    clearUserData: () => {
      dispatch(clearUserData())
    }
  }
}


const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Root;
