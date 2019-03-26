import Editor from "../Editor.js";
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

const EditorPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor);

export default EditorPage;
