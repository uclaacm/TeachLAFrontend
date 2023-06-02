import { connect } from 'react-redux';
import { setMostRecentProgram } from '../../../actions/userDataActions';
import * as fetch from '../../../lib/fetch';
import { getLanguageData } from '../../../util/languages/languages';
import DropdownButton from '../../common/DropdownButton';

const mapStateToProps = (state) => {
  const { mostRecentProgram } = state.userData;

  console.log('DBDWEFWEFE', mostRecentProgram, "bob");

  const mostRecentLanguage = getLanguageData(
    state.programs[mostRecentProgram].language
  );

  const displayValue = ` ${state.programs[mostRecentProgram].name}`;

  const programStateValues = Object.keys(state.programs).map((id) => ({
    display: state.programs[id].name,
    value: id,
    icon: getLanguageData(state.programs[id].language).icon,
  }));

  const dirty = state.programs[mostRecentProgram].dirty;

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
  onSelect: ({
    _display, value, _dirty, uid,
  }) => {
    // TODO: Fix this dirty check
    // if (dirty) {
    //   result = window.confirm('Are you sure you want to change programs? You have unsaved changes');
    // }
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

const DropdownButtonContainer = connect(mapStateToProps, mapDispatchToProps)(DropdownButton);

export default DropdownButtonContainer;
