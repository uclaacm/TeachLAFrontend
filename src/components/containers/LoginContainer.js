import { useContext } from 'react';
import Login from '../Login.js'
import Context from '../../util/Context';
import {loadUserData, clearUserData, loadFailure} from '../../actions/userDataActions.js'

const LoginPage = (props) => {
  const { userData, userDataDispatch } = useContext(Context);

  return <Login
    loggedIn={userData.loggedIn}
    loadUserData={user => userDataDispatch(loadUserData(user))}
    clearUserData={() => userDataDispatch(clearUserData())}
    loadFailure={err => userDataDispatch(loadFailure(err))}
    {...props}
  />
}

export default LoginPage;
