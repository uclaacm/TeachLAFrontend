import React from 'react';
import {
  BrowserRouter, Route, Navigate, Routes, useParams, useLocation, useMatch
} from 'react-router-dom';

import { ROUTER_BASE_NAME } from '../constants';
import { onAuthStateChanged } from '../firebase';
import history from '../history';
import store from '../store';
import LoadingPage from './common/LoadingPage';
import LoginPage from './containers/LoginContainer';
import MainContainer from './containers/MainContainer';
import ViewOnlyContainer from './containers/ViewOnlyContainer';
import Error from './Error';
import PageNotFound from './PageNotFound';
import '../styles/app.scss';

const Protected = ({ isValidUser, whenInvalid = <LoginPage />, errorMsg, children }) => {
  if (errorMsg !== '') {
    return <Error errorMsg={errorMsg} isValidUser={isValidUser} />;
  }

  if (!isValidUser) {
    return whenInvalid;
  }

  return children;
}


/**
 * takes the url param programid and checks if it exists using !programid
 * if it doesn't exist, it finds the most recent program (or creates an existing program if there it doesn't exist)
 * if there are no projects, it takes the user to the sketches page to make a new one
 * 
 * upon arriving at the new page, programid is no longer undefined so it loads the maincontainer w prop programid
 * 
 * 3 returns - most recent program, first program, sketches
 */

const EditorWrapper = ({ lastMostRecentProgram, programKeys, }) => {
  const { programid } = useParams();
  if (!programid) {
    const lastMostRecentProgram = store.getState().userData.mostRecentProgram;
    const programKeys = store.getState().programs.keySeq();
    if (programKeys.includes(lastMostRecentProgram)) {
      return <Navigate to={`/editor/${lastMostRecentProgram}`} />;
    }
    // mostRecentProgram no longer exists, fall back to one of the
    // programs that does exist
    if (programKeys.get(0)) {
      return <Navigate to={`/editor/${programKeys.get(0)}`} />;
    }
    // No programs exist, redirect to /sketches so the user can make one

    return <Navigate to="/sketches" />;
  }
  return <MainContainer contentType="editor" programid={programid} />;
}

/** For migration purposes
  * TODO: convert ViewOnlyContainer to functional component and
  * add a hook to useParams
  */
const ViewOnlyContainerWithParam = () => {
  let { programid } = useParams();
  return <ViewOnlyContainer contentType="view" programid={programid} />;
}

/** For migration purposes
  * TODO: convert LoginPage to functional component and
  * add a hook to useParams
  */
const LoginPageWithLocation = () => {
  let { state } = useLocation();
  return <LoginPage create initialState={state} />;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedAuth: false,
    };
  }

  //= =============React Lifecycle Functions===================//

  componentDidMount() {
    onAuthStateChanged(async (user) => {
      await this.onAuthHandler(user);
    });
    window.addEventListener('resize', this.handleResize, true);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, true);
  }

  handleResize = () => {
    const { screenResize } = this.props;
    screenResize(window.innerWidth, window.innerHeight);
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
    const { clearUserData, loadUserData, loadFailure } = this.props;

    if (user) {
      const { uid } = user;
      if (uid) {
        await loadUserData(uid, this.showErrorPage);
        this.setState({ checkedAuth: true });
      } else {
        loadFailure('Failed to load user data...');
        this.setState({ checkedAuth: true });
      }
    } else {
      console.error('no user found');
      clearUserData();
      this.setState({ checkedAuth: true });
    }
  };

  showErrorPage = (err) => {
    const { loadFailure } = this.props;
    console.error(err);
    loadFailure(err);
  };

  renderHome = (isValidUser) => (isValidUser ? <Navigate to="/editor" /> : <Navigate to="/login" />);

  render() {
    const { checkedAuth } = this.state;

    const { errorMsg, uid, developerAcc } = this.props;

    // if we haven't checked if the user is logged in yet, show a loading screen
    if (!checkedAuth) {
      return <LoadingPage />;
    }

    // the user is not valid if there's no UID
    const isValidUser = uid;

    return (
      <BrowserRouter basename={ROUTER_BASE_NAME} history={history}>
        <div className="app">
          <Routes>
            {/* if the user is loggedIn, redirect them to the editor, otherwise, show the login page */}
            <Route
              path="/"
              element={
                <Protected isValidUser={isValidUser} errorMsg={errorMsg}>
                  <Navigate to="/editor" />
                </Protected>
              }
            />
            {/* if the user is loggedIn, redirect them to the editor, otherwise, show the login page */}
            <Route
              path="/login"
              element={
                <Protected isValidUser={isValidUser} errorMsg={errorMsg}>
                  <Navigate to="/editor" />
                </Protected>
              }
            />
            {/* if the user is not loggedIn, redirect them to the login page, otherwise, show the editor page */}
            <Route
              path="/editor/:programid?"
              element={
                <Protected isValidUser={isValidUser} errorMsg={errorMsg}>
                  <EditorWrapper />
                </Protected>
              }
              render={({ match }) => {
                if (!match.params.programid) {
                  const lastMostRecentProgram = store.getState().userData.mostRecentProgram;
                  const programKeys = store.getState().programs.keySeq();
                  if (programKeys.includes(lastMostRecentProgram)) {
                    return <Navigate to={`/editor/${lastMostRecentProgram}`} />;
                  }
                  // mostRecentProgram no longer exists, fall back to one of the
                  // programs that does exist
                  if (programKeys.get(0)) {
                    return <Navigate to={`/editor/${programKeys.get(0)}`} />;
                  }
                  // No programs exist, redirect to /sketches so the user can make one

                  return <Navigate to="/sketches" />;
                }
                return <MainContainer contentType="editor" programid={match.params.programid} />;
              }}
            />
            {/* if the user is loggedIn, redirect them to the editor page, otherwise, show the createUser page */}
            <Route
              path="/createUser"
              element={
                <Protected isValidUser={isValidUser} errorMsg={errorMsg} whenInvalid={<LoginPageWithLocation />}>
                  <Navigate to="/editor" />
                </Protected>
              }
            />
            {/* if the user isn't loggedIn, redirect them to the login page, otherwise, show the view page */}
            <Route
              path="/sketches"
              element={
                <Protected isValidUser={isValidUser} errorMsg={errorMsg}>
                  <MainContainer contentType="sketches" />
                </Protected>
              }
            />
            {/* Get program endpoint */}
            <Route
              path="/p/:programid"
              element={<ViewOnlyContainerWithParam />}
            />
            {/* Class page */}
            <Route
              path="/class"
              element={
                <Protected isValidUser={isValidUser} errorMsg={errorMsg}>
                  {
                    (developerAcc)
                      ? <MainContainer contentType="classPage" />
                      : <Navigate to="/sketches" />
                  }
                </Protected>
              }
            />
            {/* Classes page */}
            <Route
              path="/classes"
              element={
                <Protected isValidUser={isValidUser} errorMsg={errorMsg}>
                  {
                    (developerAcc)
                      ? <MainContainer contentType="classes" />
                      : <Navigate to="/sketches" />
                  }
                </Protected>
              }
            />
            {/* Default error page */}
            <Route
              path="/error"
              element={
                <Protected isValidUser={isValidUser} errorMsg={errorMsg}>
                  <Navigate to="/editor" />
                </Protected>
              }
            />

            {/* Matches all other paths */}
            <Route element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
