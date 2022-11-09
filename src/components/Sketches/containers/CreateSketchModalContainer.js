import { connect } from 'react-redux';
import { addProgram } from '../../../actions/programsActions';
import { setMostRecentProgram } from '../../../actions/userDataActions.js';
import CreateSketchModal from '../components/CreateSketchModal.js';

const mapStateToProps = (state) => ({
  uid: state.userData.uid,
});

const mapDispatchToProps = (dispatch) => ({
  addProgram: (program, data) => dispatch(addProgram(program, data)),
  setMostRecentProgram: (value, uid) => {
    try {
      fetch
        .updateUserData(uid, { mostRecentProgram: value })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
    dispatch(setMostRecentProgram(value));
  },
});

const CreateSketchModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateSketchModal);

export default CreateSketchModalContainer;
