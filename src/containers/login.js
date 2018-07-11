import React from 'react';
import Login from '../components/Login'
import {connect} from 'react-redux'
// import {dispatch} from 'redux'
import {loadUserData, clearUserData, loadFailure} from '../actions/userDataActions'

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.app.userDataReducers,
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
    }
  }
}

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginPage
