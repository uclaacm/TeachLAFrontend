import { connect } from 'react-redux';
import { loadUserData, clearUserData, loadFailure } from '../../actions/userDataActions.js';
import Login from '../Login.js';

const mapStateToProps = (state) => ({
  loggedIn: state.userData,
});

const mapDispatchToProps = (dispatch) => ({
  loadUserData: (user) => {
    dispatch(loadUserData(user));
  },
  clearUserData: () => {
    dispatch(clearUserData());
  },
  loadFailure: (err) => {
    dispatch(loadFailure(err));
  },
});

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginPage;
