import React from "react";
import { Button } from "reactstrap";
import Footer from "./common/Footer";
import { Link } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "styles/Page.scss";
import { GH_REPO_NAME } from "../constants";

class Error extends React.Component {
  render() {
    return (
      <div className="page-container">
        <h2>Uh oh, something went wrong!</h2>
        <h1>Error: {this.props.errorMsg}</h1>
        <br />
        <Button color="primary" size="lg" target="_blank" href={`${GH_REPO_NAME}/issues`}>
          Let Us Know!
        </Button>
        &nbsp;
        <Link to="/">
          <Button color="success" size="lg">
            Back to safety
          </Button>
        </Link>
        &nbsp;
        {this.props.isValidUser && (
          <Button color="danger" size="lg" onClick={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        )}
        <Footer />
      </div>
    );
  }
}
export default Error;
