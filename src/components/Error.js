import React from "react";
import { Button } from "reactstrap";
import Footer from "./common/Footer";
import { Link } from "react-router-dom";
import firebase from "firebase";
import "styles/Page.scss";

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-container">
        <h2>Uh oh, something went wrong!</h2>
        <h1>Error: {this.props.errorMsg}</h1>
        <br />
        <Link to="/">
          <Button color="success" size="lg">
            Back to safety
          </Button>
        </Link>
        &nbsp;
        <Button color="danger" size="lg" onClick={() => firebase.auth().signOut()}>
          Log Out
        </Button>
        <Footer />
      </div>
    );
  }
}
export default Error;
