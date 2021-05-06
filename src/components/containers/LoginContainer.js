import { useContext } from 'react';
import Login from '../Login.js'
import Context from '../../util/Context';
import {loadUserData, clearUserData, loadFailure} from '../../actions/userDataActions.js'

const LoginPage = (props) => {
  const { userData, dispatch } = useContext(Context);

  return <Login
    loggedIn={userData.loggedIn}
    loadUserData={user => dispatch(loadUserData(user))}
    clearUserData={() => dispatch(clearUserData())}
    loadFailure={err => dispatch(loadFailure(err))}
    {...props}
  />
}

export default LoginPage;
