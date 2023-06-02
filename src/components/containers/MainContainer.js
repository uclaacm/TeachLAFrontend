import { connect } from 'react-redux';
import { setOutput } from '../../actions/outputActions.js';

import { setMostRecentProgram } from '../../actions/userDataActions.js';
import Main from '../Main.js';

const mapStateToProps = (state) => {
  return {
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setMostRecentProgram: (value) => dispatch(setMostRecentProgram(value)),
  runCode: (code, language) => dispatch(setOutput(code, language)),
});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;
