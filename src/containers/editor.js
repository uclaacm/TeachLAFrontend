import React from 'react';
import Editor from '../components/Editor';
import CSSTransition from 'react-transition-group/CSSTransition'
import '../styles/editor.css'

class EditorPage extends React.Component {

  state = {
    loggedIn : false
  }

  render() {
    const { loggedIn } = this.state
    return(

      <CSSTransition in={loggedIn} timeout={300} classNames="editor" unmountOnExit>
        <div className="editor-container">
          <Editor></Editor>
        </div>
      </CSSTransition> 
    )
  }
}

export default EditorPage;
