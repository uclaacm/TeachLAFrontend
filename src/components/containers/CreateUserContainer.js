import CreateUser from "../CreateUser.js";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { compose } from "redux";

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

const CreateUserPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFirestore,
)(CreateUser);

export default CreateUserPage;
