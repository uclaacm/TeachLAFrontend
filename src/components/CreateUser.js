import React from "react";
import Footer from "./common/Footer.js";
import CreateUserForm from "./CreateUser/CreateUserForm.js";
import LoginGuy from "../img/blueguy.png";

/**--------Props--------
 * None
 */

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-page-content" style={{ backgroundImage: `url(${LoginGuy})` }}>
          <CreateUserForm />
        </div>
        <Footer />
      </div>
    );
  }
}

export default CreateUser;
