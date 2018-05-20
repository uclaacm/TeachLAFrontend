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
      size:0.25,
      prevSize:0.25,
    };
    this.options = {
      mode: 'javascript',
      theme: 'material',
      lineNumbers: true
    };
  }

  handleOnVisibleChange = () => {
    this.setState({
      isVisible: !this.state.isVisible,
      size:this.state.isVisible ? 0.0 : 0.25,
      prevSize:this.state.isVisible ? 0.0 : 0.25,
    })
  }
  
  handleOnSizeChange = (newSize) => {
    this.setState({
      size:newSize,
      prevSize:this.state.size,
    })
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
    console.log(this.state.size)
    let {isVisible, size, prevSize} = this.state
    let {logout, user} = this.props

    //panelSize is how much of the screen the panel will take up
    let panelSize=(size*100.0).toString() + '%'

    let panelStyle = {width:panelSize}            //width of the panel should always be the percent of its size (which is a decimal)
    let codeStyle = {
      position:"fixed",                           //fixed bc we're using left
      width:"100%",                               //take up 100% of whats given
      left:panelSize,                             //panelSize determines how far left of the screen the code should be
      transition:(prevSize != size && (size != 0.0 || prevSize != 0.0)) ? "" : "left 0.2s ease-out, opacity 0.01s linear" //if they're using the slider to change the length of the panel, dont use a transition, otherwise (meaning they're using the toggle button) use a transition where when the left changes, it eases out
    }
    return(
      <div className="editor">
        <div style={panelStyle}>
          <Dock position='left'
                isVisible={isVisible}
                size={size}
                dimMode="transparent"
                onSizeChange={(newSize)=>{this.handleOnSizeChange(newSize)}}
                onVisibleChange={this.handleOnVisibleChange}
                dockStyle={{width:panelSize}}
          >
            <div className="panel">
              <div className="panel-collapse-button">
                <div/><div onClick={this.handleOnVisibleChange}>&larr;</div>
              </div>
              <div className="panel-content">
                <img className="panel-image" src={user.photoURL || "img/defaultProfile.png"}/>
                <div className="panel-name">{user.displayName || "Joe Bruin"}</div>
                <div className="panel-options">
                  <ul className="panel-options-list">
                    <li className="panel-options-item">Profile</li>
                    <li className="panel-options-item">Sketches</li>
                    <li className="panel-options-item" onClick={logout}>Signout</li>
                  </ul>
                </div>
              </div>
            </div>
          </Dock>
        </div>
        <div style={codeStyle}>
          {isVisible ? <div className='editor-expand-panel'>&nbsp;</div> : <div className='editor-expand-panel' onClick={this.handleOnVisibleChange}>></div>}
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
      </div>
    );
	}
}

export default Editor;
