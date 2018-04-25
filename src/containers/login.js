import React from 'react';
import Login from '../components/Login'
import {connect} from 'react-redux'
import {login} from '../actions'
// class LoginPage extends React.Component {
//   render() {
//     return(
//       <div>
//         <Login></Login>
//       </div>
//     )
//   }
// }

// export default LoginPage;


const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (id) => {
      dispatch(login(id))
    }
  }
}

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginPage