import AddSketchModal from "../components/AddSketchModal.js";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const AddSketchModalContainer = connect(mapStateToProps, mapDispatchToProps)(AddSketchModal);

export default AddSketchModalContainer;
