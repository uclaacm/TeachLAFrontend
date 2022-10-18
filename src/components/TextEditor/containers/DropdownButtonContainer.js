import { connect } from 'react-redux';
import { setMostRecentProgram, setError } from '../../../actions/userDataActions.js';
import { getLanguageData } from '../../../util/languages/languages.js';
import DropdownButton from '../../common/DropdownButton.js';

const mapStateToProps = (state) => {
  const { mostRecentProgram } = state.userData;

  const mostRecentLanguage = getLanguageData(
    state.programs.getIn([mostRecentProgram, 'language'], 'python'),
  );

  const displayValue = ` ${state.programs.getIn([mostRecentProgram, 'name'], mostRecentProgram)}`;

  const programStateValues = state.programs.keySeq().map((id) => ({
    display: state.programs.getIn([id, 'name'], id),
    value: id,
    icon: getLanguageData(state.programs.getIn([id, 'language'], 'python')).icon,
  }));

  const dirty = state.programs.getIn([mostRecentProgram, 'dirty'], false);

  const displayClass = 'editor';

  const toggleProps = {
    className: 'btn-language-dropdown',
    color: '',
    size: '',
  };

  const { icon } = mostRecentLanguage;

  return {
    displayValue,
    displayClass,
    dirty,
    DropdownItems: programStateValues,
    icon,
    toggleProps,
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setMostRecentProgram: (value) => dispatch(setMostRecentProgram(value)),
  setUserDataError: (errorMsg) => dispatch(setError(errorMsg)),
});

const DropdownButtonContainer = connect(mapStateToProps, mapDispatchToProps)(DropdownButton);

export default DropdownButtonContainer;
