import Main from "../components/Main.js";
import { connect } from "react-redux";
import { setMostRecentProgram } from "../../../actions/userDataActions.js";

const mapStateToProps = state => {
  const { mostRecentProgram } = state.userData;

  let listOfPrograms = [];

  //create list of jsons with 2 keys
  //name: the name of the sketch
  //language: language the sketch uses
  state.programs.keySeq().forEach(key => {
    listOfPrograms.push({
      name: key,
      language: state.programs.getIn([key, "language"], "HTML"),
    });
  });

  return {
    mostRecentProgram,
    listOfPrograms,
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMostRecentProgram: value => dispatch(setMostRecentProgram(value)),
  };
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

export default MainContainer;
