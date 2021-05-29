import { connect } from 'react-redux';
import { setMostRecentProgram } from '../../../actions/userDataActions.js';
import { getLanguageData } from '../../../util/languages/languages.js';
import DropdownButton from '../DropdownButton.js';

const mapStateToProps = (state) => {
  const { mostRecentProgram } = state.userData;
  const mostRecentLanguage = getLanguageData(
    state.programs.getIn([mostRecentProgram, 'language'], 'python'),
  );
  const displayValue = state.programs.getIn([mostRecentProgram, 'name'], mostRecentProgram);

  const listOfPrograms = state.programs.keySeq().map((id) => ({
    name: state.programs.getIn([id, 'name'], id),
    language: getLanguageData(state.programs.getIn([id, 'language'], 'python')),
    key: id,
  }));

  const dirty = state.programs.getIn([mostRecentProgram, 'dirty'], false);

  const isSketchCallee = false;

  return {
    isSketchCallee,
    dirty,
    dropdownItems: listOfPrograms,
    displayValue,
    currentLanguage: mostRecentLanguage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSelect: (value) => {
    dispatch(setMostRecentProgram(value));
  },
});

const DropdownButtonContainer = connect(mapStateToProps, mapDispatchToProps)(DropdownButton);

export default DropdownButtonContainer;
