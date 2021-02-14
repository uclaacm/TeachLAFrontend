import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Footer from './common/Footer';
import 'styles/Page.scss';
import { GH_REPO_NAME } from '../constants';
import * as cookies from '../lib/cookies.js';

class PageNotFound extends React.Component {
  render() {
    return (
      <div className={`full-container theme-${cookies.getThemeFromCookie()}`}>
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
            Getting this problem a lot? Let us know
            {' '}
            <a target="_blank" rel="noopener noreferrer" href={`${GH_REPO_NAME}/issues`}>
              on GitHub
            </a>
            .
          </p>
          <Footer />
        </div>
      </div>
    );
  }
}
export default PageNotFound;
