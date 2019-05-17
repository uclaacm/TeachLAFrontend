import { connect } from "react-redux";
import DropdownButton from "../components/DropdownButton.js";
import { setMostRecentProgram } from "../../../actions/userDataActions.js";

const mapStateToProps = state => {
  const { mostRecentProgram } = state.userData;
  let mostRecentLanguage;
  let listOfPrograms = [];
  let programsJSON = state.programs.toJS();
  Object.keys(programsJSON).forEach(function(key) {
    listOfPrograms.push({ name: key, language: programsJSON[key]["language"] });
    if (key === mostRecentProgram) {
      mostRecentLanguage = programsJSON[key]["language"];
    }
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
