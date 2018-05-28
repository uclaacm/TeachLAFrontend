import React from 'react';
import CreateUser from '../components/CreateUser'
import {connect} from 'react-redux'
import {login, logout} from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,                        //all props passed to the container, put into the props
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // login: (userInfo, token) => {
    //   firebase.auth().signInWithCustomToken(token)
    //   dispatch(login(userInfo))
    // },
  }
}

const CreateUserPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser)

export default CreateUserPage