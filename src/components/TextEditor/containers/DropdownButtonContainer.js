import { connect } from 'react-redux';
import { setMostRecentProgram } from '../../../actions/userDataActions.js';
import { getLanguageData } from '../../../util/languages/languages.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownButton from '../../common/DropdownButton.js';
import { DropdownItem } from 'reactstrap';

const mapStateToProps = (state) => {
  const { mostRecentProgram } = state.userData;

  const mostRecentLanguage = getLanguageData(
    state.programs.getIn([mostRecentProgram, 'language'], 'python'),
  );

  const displayValue = ' ' + state.programs.getIn([mostRecentProgram, 'name'], mostRecentProgram);

  const programStateValues = state.programs.keySeq().map((id) => ({
    display: state.programs.getIn([id, 'name'], id),
    value: id,
    icon: getLanguageData(state.programs.getIn([id, 'language'], 'python')).icon,
  }));

  const dirty = state.programs.getIn([mostRecentProgram, 'dirty'], false);

  const displayClass = 'editor';

  const toggleProps = {
    class: 'btn-language-dropdown',
    color: '',
    size: '',
  };

  const icon = mostRecentLanguage.icon;

  return {
    displayValue,
    displayClass,
    dirty,
    programStateValues,
    icon,
    ...toggleProps,
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

const mergeProps = (stateProps, dispatchProps) => {
  const { displayValue, displayClass, dirty, icon, programStateValues, ...toggleProps } =
    stateProps;

  const { onSelect } = dispatchProps;

  const children = stateProps.programStateValues.map(({ display, value, icon }) => {
    return (
      <DropdownItem key={value} onClick={() => onSelect({ display, value, dirty })}>
        <FontAwesomeIcon icon={icon} fixedWidth />
        <span style={{ marginLeft: '10px' }}> {display}</span>
      </DropdownItem>
    );
  });

  return {
    children,
    displayValue,
    displayClass,
    icon,
    ...toggleProps,
  };
};

const DropdownButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DropdownButton);

export default DropdownButtonContainer;
