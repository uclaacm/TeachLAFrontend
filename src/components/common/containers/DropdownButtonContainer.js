import { connect } from 'react-redux';
import { setMostRecentProgram } from '../../../actions/userDataActions.js';
import { getLanguageData } from '../../../util/languages/languages.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownButton from '../DropdownButton.js';

const mapStateToProps = (state) => {
  const { mostRecentProgram } = state.userData;

  const mostRecentLanguage = getLanguageData(
    state.programs.getIn([mostRecentProgram, 'language'], 'python'),
  );

  const displayValue = (
    <div>
      {' '}
      <FontAwesomeIcon icon={mostRecentLanguage.icon} fixedWidth />{' '}
      {state.programs.getIn([mostRecentProgram, 'name'], mostRecentProgram)}
    </div>
  );

  const listOfPrograms = state.programs.keySeq().map((id) => ({
    display: (
      <div>
        <FontAwesomeIcon
          icon={getLanguageData(state.programs.getIn([id, 'language'], 'python')).icon}
          fixedWidth
        />{' '}
        <span style={{ marginLeft: '10px' }}> {state.programs.getIn([id, 'name'], id)} </span>
      </div>
    ),
    value: id,
  }));

  const dirty = state.programs.getIn([mostRecentProgram, 'dirty'], false);

  const displayClass = 'editor';

  const toggleClass = 'btn-language-dropdown';

  const toggleColor = '';

  const toggleSize = '';

  return {
    toggleColor,
    toggleSize,
    toggleClass,
    displayValue,
    displayClass,
    dirty,
    children: listOfPrograms,
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
