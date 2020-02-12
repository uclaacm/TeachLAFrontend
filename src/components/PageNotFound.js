import React from "react";
import { Button } from "reactstrap";
import Footer from "./common/Footer";
import { Link } from "react-router-dom";
import "styles/Page.scss";

class Error extends React.Component {
  render() {
    return (
      <div className="page-container">
        <span>Error: 404</span>
        <h1>Uh oh, page not found!</h1>
        <br />
        <Link to="/">
          <Button color="success" size="lg">
            Back to safety
          </Button>
        </Link>
        <br />
        <p>
          Getting this problem a lot? Let us know{" "}
          <a rel="noopener noreferrer" href="https://github.com/uclaacm/TeachLAFrontend/issues">
            on GitHub
          </a>
          .
        </p>
        <Footer />
      </div>
    );
  }
}
export default Error;
