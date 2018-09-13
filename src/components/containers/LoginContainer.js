import React from 'react';
import Login from '../Login.js'
import {connect} from 'react-redux'
import {loadUserData, clearUserData, loadFailure} from '../../actions/userDataActions.js'
import {onLoginRequest} from '../../actions/userStateActions.js'

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.app.userDataReducers,
    waiting: state.app.userStateReducers.waiting,
    message: state.app.userStateReducers.message,
    ...ownProps,                        //all props passed to the container, put into the props
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
    onLoginRequest: (emailHash, passwordHash, loginProvider=null) => {
      dispatch(onLoginRequest(emailHash, passwordHash, loginProvider))
    }
  }
}

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginPage
