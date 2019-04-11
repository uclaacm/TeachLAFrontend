import Sketches from "../Sketches.js";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const SketchesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sketches);

export default SketchesPage;
