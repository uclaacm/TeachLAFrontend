import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { ROUTER_BASE_NAME } from "../constants";
import LoginPage from "./containers/LoginContainer";
import MainContainer from "./containers/MainContainer";
import ViewOnlyContainer from "./containers/ViewOnlyContainer";
import LoadingPage from "./common/LoadingPage";
import Error from "./Error";
import PageNotFound from "./PageNotFound";
import firebase from "firebase/app";
import "firebase/auth";
import "styles/app.scss";

const provider = new firebase.auth.EmailAuthProvider();

const App = ({
  loadUserData,
  loadFailure,
  clearUserData,
  screenResize,
  uid,
  errorMsg,
}) => {
  const [checkedAuth, setCheckedAuth] = useState(false);

  const showErrorPage = (err) => {
    console.log(err);
    loadFailure(err);
  };

  /**
   *  TODO: Consider reducing the numerous side effects of this function in favor of the one function, one purpose principle
   * onAuthHandler - on execution will set a flag checkedAuth to true. If a valid user is passed to the function,
   * onAuthHandler will attempt to load the metadata and account data corresponding to this account.  If the user
   * has not set their displayName, it will be set to "New User". If no user is passed, we clear any existng user data from the
   * application.
   * @param  {firebase.auth().currentUser}  user - a user object as passed by firebase.auth()
   */
  const onAuthHandler = async (user) => {
    console.log("checking auth");
    if (user) {
      console.log("found user");
      const { uid } = user;
      if (uid) {
        await loadUserData(uid, showErrorPage);
        setCheckedAuth(true);
      } else {
        loadFailure("Failed to load user data...");
        setCheckedAuth(true);
      }
    } else {
      console.log("no user found");
      clearUserData();
      setCheckedAuth(true);
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      await onAuthHandler(user);
    });
  }, []);

  const handleResize = () => {
    screenResize(window.innerWidth, window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, true);
    return () => window.removeEventListener("resize", handleResize, true);
  }, []);

  const renderHome = (isValidUser) => {
    return isValidUser ? <Redirect to="/editor" /> : <Redirect to="/login" />;
  };


  if (!checkedAuth) {
    return <LoadingPage />;
  }

  //the user is not valid if there's no UID
  let isValidUser = uid;

  return (
    <Router basename={ROUTER_BASE_NAME}>
      <div className="App">
        <Switch>
          {/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
          <Route
            exact
            path="/"
            render={() =>
              errorMsg !== "" ? (
                <Error errorMsg={errorMsg} isValidUser={isValidUser} />
              ) : isValidUser ? (
                <Redirect to="/editor" />
              ) : (
                <LoginPage provider={provider} />
              )
            }
          />
          {/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
          <Route
            path="/login"
            render={() =>
              errorMsg !== "" ? (
                <Error errorMsg={errorMsg} isValidUser={isValidUser} />
              ) : isValidUser ? (
                <Redirect to="/editor" />
              ) : (
                <LoginPage provider={provider} />
              )
            }
          />
          {/*if the user is not loggedIn, redirect them to the login page, otherwise, show the editor page*?*/}
          <Route
            path="/editor"
            render={() =>
              errorMsg !== "" ? (
                <Error errorMsg={errorMsg} isValidUser={isValidUser} />
              ) : !isValidUser ? (
                <Redirect to="/login" />
              ) : (
                <MainContainer contentType="editor" />
              )
            }
          />
          {/*if the user is loggedIn, redirect them to the editor page, otherwise, show the createUser page*?*/}
          <Route
            path="/createUser"
            render={({ location }) =>
              errorMsg !== "" ? (
                <Error errorMsg={errorMsg} isValidUser={isValidUser} />
              ) : isValidUser ? (
                <Redirect to="/editor" />
              ) : (
                <LoginPage create={true} initialState={location.state} />
              )
            }
          />
          {/*if the user isn't loggedIn, redirect them to the login page, otherwise, show the view page*?*/}
          <Route
            path="/sketches"
            render={() =>
              errorMsg !== "" ? (
                <Error errorMsg={errorMsg} isValidUser={isValidUser} />
              ) : isValidUser ? (
                <MainContainer contentType="sketches" />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          {/* Get program endpoint */}
          <Route
            path="/p/:programid"
            render={({ match }) => (
              <ViewOnlyContainer contentType="view" programid={match.params.programid} />
            )}
          />
          {/* Default error page */}
          <Route
            path="/error"
            render={() =>
              errorMsg ? (
                <Error errorMsg={errorMsg} isValidUser={isValidUser} />
              ) : (
                renderHome(isValidUser)
              )
            }
          />

          {/* Matches all other paths */}
          <Route render={() => <PageNotFound />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
