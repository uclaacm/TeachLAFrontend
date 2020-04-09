import ClassPage from "../index.js";
import { connect } from "react-redux";
import { togglePanel } from "../../../actions/uiActions.js";
import { OPEN_PANEL_LEFT, CLOSED_PANEL_LEFT, PANEL_SIZE } from "../../../constants";
import Immutable from "immutable";

const mapStateToProps = (state) => {
  const left = (state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT) + PANEL_SIZE;
  const calculatedWidth = state.ui.screenWidth - (left || 0);

  let sketches = [];
  sketches.push({
    key: "1",
    name: "Will's Python Sketch",
    language: "python",
    thumbnail: 14,
    code: "blah blah blah",
  });
  sketches.push({
    key: "2",
    name: "Some HTML",
    language: "html",
    thumbnail: 2,
    code: "<div>blah</div>",
  });

  let students = [];
  students.push({
    key: "1",
    name: "Bob",
  });
  students.push({
    key: "2",
    name: "Jim",
  });
  students.push({
    key: "3",
    name: "Clark",
  });

  return {
    calculatedWidth,
    left,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
    name: "Will's Class",
    instructors: ["Yours Truly"],
    sketches: sketches,
    isInstr: true,
    students: students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePanel: () => dispatch(togglePanel()),
  };
};

const ClassPageContainer = connect(mapStateToProps, mapDispatchToProps)(ClassPage);

export default ClassPageContainer;
