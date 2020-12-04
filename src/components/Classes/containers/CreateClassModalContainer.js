import CreateClassModal from "../components/CreateClassModal.js";
import { connect } from "react-redux";
import { addInstrClass } from "../../../actions/classesActions";
import { setCurrentClass } from "../../../actions/userDataActions";

const mapStateToProps = (state) => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addInstrClass: (cid, data) => dispatch(addInstrClass(cid, data)),
    setCurrentClass: (cid) => dispatch(setCurrentClass(cid)),
  };
};

const CreateClassModalContainer = connect(mapStateToProps, mapDispatchToProps)(CreateClassModal);

export default CreateClassModalContainer;
