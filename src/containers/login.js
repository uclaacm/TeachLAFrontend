import React from 'react';
import Login from '../components/Login'
import {connect} from 'react-redux'
import {login, logout} from '../actions'
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
    }
  }
}

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginPage