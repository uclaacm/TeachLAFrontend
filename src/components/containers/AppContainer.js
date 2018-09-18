/*
	used to link state to App which contains the router, could link functions, but rather do that in each individual container
*/

import React from 'react';
import App from '../app.js';
import {connect} from 'react-redux'
import {loadUserData, loadUserPrograms, clearUserData} from '../../actions/userDataActions.js'
import * as fetch from '../../lib/fetch.js'


const mapStateToProps = state => {
  return {
    uid: state.userData.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeUserData: async (uid) => {
      const result = await fetch.initializeUserData(uid)
      const userData = await result.json()
      console.log(result, userData)
      //check if the result comes back ok
      dispatch(loadUserData(userData.data))
    },
    loadUserData: async (uid) => {
      const result = await fetch.getUserData(uid)
      console.log(result)
      const userData = await result.json()
      console.log(userData)
      dispatch(loadUserData(userData.data))
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
