import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import Dock from 'react-dock'
import '../../styles/Editor.css'
// Specify imports for codemirror usage
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript.js';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "// Code",
      isVisible:true,
    };
    this.options = {
      mode: 'javascript',
      theme: 'material',
      lineNumbers: true
    };
  }

	updateCode = (newCode) => {
		this.setState({
			code: newCode,
		});
  }

  runCode = () => {
    // eval(this.state.code);
  }

	render() {
    let {isVisible} = this.state
    let {logout, user} = this.props

    return(
      <div className="editor">
        <Dock position='left' isVisible={isVisible} dimMode="opaque" onVisibleChange={() => this.setState({ isVisible: !isVisible })}>
            <div className="panel">
              <div className="panel-collapse-button">
                <div/><div onClick={() => this.setState({ isVisible: !isVisible })}>&larr;</div>
              </div>
              <img className="panel-image" src={user.photoURL || "img/defaultProfile.png"}/>
              <div className="panel-name">{user.displayName || "Joe Bruin"}</div>
              <div className="panel-options">
                <ul className="panel-options-list">
                  <li className="panel-options-item">Profile</li>
                  <li className="panel-options-item">Sketches</li>
                  <li className="panel-options-item">Signout</li>
                </ul>
              </div>
            </div>
        </Dock>
        <button onClick={logout}>Logout</button>
        <button onClick={()=>{this.setState({isVisible:true})}}>Open Dock</button>
        <CodeMirror
          value={this.state.code}
          options={this.options}
          onBeforeChange={(editor, data, code) => {
            this.setState({code});
          }}
          onChange={(editor, data, code) => {
            this.updateCode(code);
          }}
        />
        <input type="button" value="Run" onClick={this.runCode}/>
      </div>
    );
	}
}

export default Editor;
