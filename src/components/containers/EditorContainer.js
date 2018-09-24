import Editor from '../Editor.js'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

const EditorPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor);

export default EditorPage;
