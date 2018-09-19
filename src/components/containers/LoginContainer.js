import React from 'react';
import Login from '../Login.js'
import {connect} from 'react-redux'
import {loadUserData, clearUserData, loadFailure} from '../../actions/userDataActions.js'
import {onLoginRequest} from '../../actions/userStateActions.js'

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.userData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUserData: (user) => {
      dispatch(loadUserData(user))
    },
    clearUserData: () => {
      dispatch(clearUserData())
    },
    loadFailure: (err) => {
      dispatch(loadFailure(err))
    },
  }
}

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginPage
