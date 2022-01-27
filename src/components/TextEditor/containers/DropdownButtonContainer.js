import { connect } from 'react-redux';
import { setMostRecentProgram } from '../../../actions/userDataActions.js';
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSelect: ({ display, value, dirty }) => {
    if (dirty) {
      result = window.confirm('Are you sure you want to change programs? You have unsaved changes');
    } else {
      dispatch(setMostRecentProgram(value));
    }
  },
});

const DropdownButtonContainer = connect(mapStateToProps, mapDispatchToProps)(DropdownButton);

export default DropdownButtonContainer;
