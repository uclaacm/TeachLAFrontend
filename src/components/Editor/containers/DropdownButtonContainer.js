import { connect } from "react-redux";
import DropdownButton from "../components/DropdownButton.js";
import { setMostRecentProgram } from "../../../actions/userDataActions.js";

const mapStateToProps = state => {
  const { mostRecentProgram } = state.userData;
  let mostRecentLanguage = state.programs
    .find(function(_, key) {
      return key === mostRecentProgram;
    })
    .get("language");
  let listOfPrograms = [];
  state.programs.keySeq().forEach(key => {
    listOfPrograms.push(key);
  });
  const dirty = state.programs.getIn([mostRecentProgram, "dirty"], false);
  return {
    dirty,
    dropdownItems: listOfPrograms,
    displayValue: mostRecentProgram,
    currentLanguage: mostRecentLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelect: value => {
      dispatch(setMostRecentProgram(value));
    },
  };
};

const DropdownButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropdownButton);

export default DropdownButtonContainer;
