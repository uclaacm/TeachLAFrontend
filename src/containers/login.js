import React from 'react';
import Login from '../components/Login'
import {connect} from 'react-redux'
// import {dispatch} from 'redux'
import {login, logout, loginFailure} from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.loggedIn,
    ...ownProps,                        //all props passed to the container, put into the props
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (id) => {
      dispatch(login(id))
    },
    logout: () => {
      dispatch(logout())
    },
    loginFailure: (err) => {
      dispatch(loginFailure(err))
    }
  }
}

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginPage
