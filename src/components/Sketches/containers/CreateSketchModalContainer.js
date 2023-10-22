import { connect } from 'react-redux';
import { addProgram } from '../../../reducers/programsReducer'
import { setMostRecentProgram } from '../../../actions/userDataActions';
import * as fetch from '../../../lib/fetch';
import CreateSketchModal from '../components/CreateSketchModal';

const mapStateToProps = (state) => ({
  uid: state.userData.uid,
});

const mapDispatchToProps = (dispatch) => ({
  addProgram: (program, data) => dispatch(addProgram(program, data)),
  setMostRecentProgram: (value, uid) => {
    try {
      fetch.updateUserData(uid, { mostRecentProgram: value }).catch((err) => {
        console.error(err);
      });
    } catch (err) {
      console.error(err);
    }
    dispatch(setMostRecentProgram(value));
  },
});

const CreateSketchModalContainer = connect(mapStateToProps, mapDispatchToProps)(CreateSketchModal);

export default CreateSketchModalContainer;
