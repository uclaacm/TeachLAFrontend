import CreateClassModal from "../components/CreateClassModal.js";
import { connect } from "react-redux";
import { addInstrClass } from "../../../actions/classesActions";

const mapStateToProps = (state) => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addInstrClass: (cid, data) => dispatch(addInstrClass(cid, data)),
  };
};

const CreateClassModalContainer = connect(mapStateToProps, mapDispatchToProps)(CreateClassModal);

export default CreateClassModalContainer;
