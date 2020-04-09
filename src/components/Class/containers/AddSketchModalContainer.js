import AddSketchModal from "../components/AddSketchModal.js";
import { connect } from "react-redux";
import { addClass } from "../../../actions/classesActions";

const mapStateToProps = (state) => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addClass: (classKey, data) => dispatch(addClass(classKey, data)),
  };
};

const AddSketchModalContainer = connect(mapStateToProps, mapDispatchToProps)(AddSketchModal);

export default AddSketchModalContainer;
