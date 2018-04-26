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
      // Delete this outer container when you finish
      <div>
      {/* DELETE this button in your final commit as the oauth ticket will make an actual login button. */}
      {/* This button "exits" the login component. We'll work with them to finalize the animation. */}
      <button onClick={() => {this.setState(state =>({ loggedIn: true}))}}> TEST ENTER </button>
       
      {/* Read the doc on your ticket to figure out what's happening here. */}
      <CSSTransition in={loggedIn} timeout={300} classNames="editor" unmountOnExit>
        <div className="editor-container">
          <Editor></Editor>
        </div>
      </CSSTransition> 
      </div>
    )
  }
}

export default EditorPage;