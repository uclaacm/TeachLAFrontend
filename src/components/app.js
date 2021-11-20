import firebase from 'firebase/app';
import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { ROUTER_BASE_NAME } from '../constants';
import LoadingPage from './common/LoadingPage';
import LoginPage from './containers/LoginContainer';
import MainContainer from './containers/MainContainer';
import ViewOnlyContainer from './containers/ViewOnlyContainer';
import Error from './Error';
import PageNotFound from './PageNotFound';
import 'firebase/auth';
import '../styles/app.scss';

const provider = new firebase.auth.EmailAuthProvider();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedAuth: false,
    };
  }

  //= =============React Lifecycle Functions===================//

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      await this.onAuthHandler(user);
    });
    window.addEventListener('resize', this.handleResize, true);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, true);
  }

  handleResize = () => {
    this.props.screenResize(window.innerWidth, window.innerHeight);
  };

  /**
   * TODO: Consider reducing the numerous side effects of this function in favor of the one
   * function, one purpose principle onAuthHandler - on execution will set a flag checkedAuth
   * to true. If a valid user is passed to the function, onAuthHandler will attempt to load
   * the metadata and account data corresponding to this account.  If the user has not set
   * their displayName, it will be set to "New User". If no user is passed, we clear any existng
   * user data from the application.
   * @param  {firebase.auth().currentUser}  user - a user object as passed by firebase.auth()
   */
  onAuthHandler = async (user) => {
    console.log('checking auth');
    if (user) {
      console.log('found user');
      const { uid } = user;
      if (uid) {
        await this.props.loadUserData(uid, this.showErrorPage);
        this.setState({ checkedAuth: true });
      } else {
        this.props.loadFailure('Failed to load user data...');
        this.setState({ checkedAuth: true });
      }
    } else {
      console.log('no user found');
      this.props.clearUserData();
      this.setState({ checkedAuth: true });
    }
  };

  showErrorPage = (err) => {
    console.log(err);
    this.props.loadFailure(err);
  };

  renderHome = (isValidUser) => (isValidUser ? <Redirect to="/editor" /> : <Redirect to="/login" />);

  render() {
    // if we haven't checked if the user is logged in yet, show a loading screen
    if (!this.state.checkedAuth) {
      return <LoadingPage />;
    }

    // the user is not valid if there's no UID
    const isValidUser = this.props.uid;

    return (
      <Router basename={ROUTER_BASE_NAME}>
        <div className="app">
          <Switch>
            {/* if the user is loggedIn, redirect them to the editor, otherwise, show the login page*? */}
            <Route
              exact
              path="/"
              render={() => (this.props.errorMsg !== '' ? (
                <Error errorMsg={this.props.errorMsg} isValidUser={isValidUser} />
              ) : isValidUser ? (
                <Redirect to="/editor" />
              ) : (
                <LoginPage provider={provider} />
              ))}
            />
            {/* if the user is loggedIn, redirect them to the editor, otherwise, show the login page*? */}
            <Route
              path="/login"
              render={() => (this.props.errorMsg !== '' ? (
                <Error errorMsg={this.props.errorMsg} isValidUser={isValidUser} />
              ) : isValidUser ? (
                <Redirect to="/editor" />
              ) : (
                <LoginPage provider={provider} />
              ))}
            />
            {/* if the user is not loggedIn, redirect them to the login page, otherwise, show the editor page*? */}
            <Route
              path="/editor"
              render={() => (this.props.errorMsg !== '' ? (
                <Error errorMsg={this.props.errorMsg} isValidUser={isValidUser} />
              ) : !isValidUser ? (
                <Redirect to="/login" />
              ) : (
                <MainContainer contentType="editor" />
              ))}
            />
            {/* if the user is loggedIn, redirect them to the editor page, otherwise, show the createUser page*? */}
            <Route
              path="/createUser"
              render={({ location }) => (this.props.errorMsg !== '' ? (
                <Error errorMsg={this.props.errorMsg} isValidUser={isValidUser} />
              ) : isValidUser ? (
                <Redirect to="/editor" />
              ) : (
                <LoginPage create initialState={location.state} />
              ))}
            />
            {/* if the user isn't loggedIn, redirect them to the login page, otherwise, show the view page*? */}
            <Route
              path="/sketches"
              render={() => (this.props.errorMsg !== '' ? (
                <Error errorMsg={this.props.errorMsg} isValidUser={isValidUser} />
              ) : isValidUser ? (
                <MainContainer contentType="sketches" />
              ) : (
                <Redirect to="/login" />
              ))}
            />
            {/* Get program endpoint */}
            <Route
              path="/p/:programid"
              render={(props) => (
                <ViewOnlyContainer contentType="view" programid={props.match.params.programid} />
              )}
            />
            {/* Class page */}
            <Route
              path="/class"
              render={() => (this.props.errorMsg !== '' ? (
                <Error errorMsg={this.props.errorMsg} isValidUser={isValidUser} />
              ) : !isValidUser ? (
                <Redirect to="/login" />
              ) : this.props.developerAcc ? (
                <MainContainer contentType="classPage" />
              ) : (
                <Redirect to="/sketches" />
              ))}
            />
            {/* Classes page */}
            <Route
              path="/classes"
              render={() => (this.props.errorMsg !== '' ? (
                <Error errorMsg={this.props.errorMsg} isValidUser={isValidUser} />
              ) : !isValidUser ? (
                <Redirect to="/login" />
              ) : this.props.developerAcc ? (
                <MainContainer contentType="classes" />
              ) : (
                <Redirect to="/sketches" />
              ))}
            />
            {/* Default error page */}
            <Route
              path="/error"
              render={() => (this.props.errorMsg ? (
                <Error errorMsg={this.props.errorMsg} isValidUser={isValidUser} />
              ) : (
                this.renderHome(isValidUser)
              ))}
            />

            {/* Matches all other paths */}
            <Route render={() => <PageNotFound />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
