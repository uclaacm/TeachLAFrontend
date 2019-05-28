import React from "react";
import { connect } from "react-redux";
import DropdownButton from "../components/DropdownButton.js";
import { setMostRecentProgram } from "../../../actions/userDataActions.js";
import { SketchThumbnailArray } from "../../Sketches/constants";

const mapStateToProps = (state, ownProps) => {
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

  let displayValue = mostRecentProgram;
  if (ownProps.useThumbnail) {
    displayValue = (
      <img
        src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${
          SketchThumbnailArray[state.programs.getIn([mostRecentProgram, "thumbnail"], 0)]
        }.svg`}
        width={"50px"}
      />
    );
  }
  return {
    dirty,
    dropdownItems: listOfPrograms,
    displayValue,
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
