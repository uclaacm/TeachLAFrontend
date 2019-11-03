import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import LoginPage from "./containers/LoginContainer";
import MainContainer from "./containers/MainContainer";
import LoadingPage from "./common/LoadingPage";
import CreateUserPage from "./CreateUser";
import Error from "./Error";
import PageNotFound from "./PageNotFound";
import firebase from "firebase";
import * as fetch from "../lib/fetch.js";
import "styles/app.scss";

const provider = new firebase.auth.EmailAuthProvider();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedAuth: false,
    };
  }

  //==============React Lifecycle Functions===================//
  componentDidUpdate(a, b) {}

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(async user => {
      await this.onAuthHandler(user);
    });
    window.addEventListener("resize", this.handleResize, true);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleResize, true);
  };

  handleResize = () => {
    this.props.screenResize(window.innerWidth, window.innerHeight);
  };

  /**
   *  TODO: Consider reducing the numerous side effects of this function in favor of the one function, one purpose principle
   * onAuthHandler - on execution will set a flag checkedAuth to true. If a valid user is passed to the function,
   * onAuthHandler will attempt to load the metadata and account data corresponding to this account.  If the user
   * has not set their displayName, it will be set to "New User". If no user is passed, we clear any existng user data from the
   * application.
   * @param  {firebase.auth().currentUser}  user - a user object as passed by firebase.auth()
   */
  onAuthHandler = async user => {
    console.log("checking auth");
    if (user) {
      console.log("found user");
      const { uid } = user;
      if (uid) {
        await this.props.loadUserData(uid, this.showErrorPage);
        this.setState({ checkedAuth: true });
      } else {
        this.props.loadFailure("Failed to load user data...");
        this.setState({ checkedAuth: true });
      }
    } else {
      console.log("no user found");
      this.props.clearUserData();
      this.setState({ checkedAuth: true });
    }
  };

  getProgram = async programid => {
    const { ok, sketch } = await fetch.getSketch(programid);
    return ok ? true : false;
  };

  showErrorPage = err => {
    console.log(err);
    this.props.loadFailure(err);
  };

  renderHome = isValidUser => {
    return isValidUser ? <Redirect to="/editor" /> : <Redirect to="/login" />;
  };

  render() {
    //if we haven't checked if the user is logged in yet, show a loading screen
    if (!this.state.checkedAuth) {
      return <LoadingPage />;
    }

    if (this.props.errorMsg !== "") {
      return <Error errorMsg={this.props.errorMsg} />;
    }

    //the user is not valid if there's no UID
    let isValidUser = this.props.uid;

    return (
      <Router basename="/TeachLAFrontend">
        <div className="App">
          <Switch>
            {/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
            <Route
              exact
              path="/"
              render={() =>
                isValidUser ? <Redirect to="/editor" /> : <LoginPage provider={provider} />
              }
            />
            {/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
            <Route
              path="/login"
              render={() =>
                isValidUser ? <Redirect to="/editor" /> : <LoginPage provider={provider} />
              }
            />
            {/*if the user is not loggedIn, redirect them to the login page, otherwise, show the editor page*?*/}
            <Route
              path="/editor"
              render={() =>
                !isValidUser ? <Redirect to="/login" /> : <MainContainer contentType="editor" />
              }
            />
            {/*if the user is loggedIn, redirect them to the editor page, otherwise, show the createUser page*?*/}
            <Route
              path="/createUser"
              render={() => (isValidUser ? <Redirect to="/editor" /> : <CreateUserPage />)}
            />
            {/*if the user isn't loggedIn, redirect them to the login page, otherwise, show the view page*?*/}
            <Route
              path="/sketches"
              render={() =>
                isValidUser ? <MainContainer contentType="sketches" /> : <Redirect to="/login" />
              }
            />
            {/* Get program endpoint */}
            <Route
              path="/p/:programid"
              render={props =>
                this.getProgram(props.match.params.programid) ? (
                  <MainContainer contentType="editor" />
                ) : (
                  <PageNotFound />
                )
              }
            />
            {/* Default error page */}
            <Route
              path="/error"
              render={() =>
                this.props.errorMsg ? (
                  <Error errorMsg={this.props.errorMsg} />
                ) : (
                  this.renderHome(isValidUser)
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
}

export default App;
