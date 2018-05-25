import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SplitPane from 'react-split-pane'
import Dock from 'react-dock'
// Specify imports for codemirror usage
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/yeti.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/dracula.css';
import '../../styles/Editor.css'
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/clike/clike.js';



class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "// Codeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      isVisible:true,
      size:0.25,
      prevSize:0.25,
      codeSize:0.50,
      isOpen:false,
      language:"Python",
      mode:"python",
      codeMirrorInstance:null,
      currentLine:0,
    };
  }

  nameToMode = (name) => {
    const conversion={
      "Python":"python",
      "Javascript":"javascript",
      "C++":"text/x-csrc",
      "Java":"text/x-java",
      "HTML":"htmlmixed",
      "Processing":"javascript",
    }

    return conversion[name] || "python"
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
    const {isVisible, size, prevSize, isOpen, language, mode, codeMirrorInstance} = this.state
    const {logout, user} = this.props
    const options = {
      mode: mode,
      theme: 'material',
      lineNumbers: true,
      lineWrapping:true,
    };
    //panelSize is how much of the screen the panel will take up
    let panelSize=(size*100.0).toString() + '%'

    let panelStyle = {width:panelSize}            //width of the panel should always be the percent of its size (which is a decimal)
    let codeStyle = {
      position:"fixed",                           //fixed bc we're using left
      width:"100%",                               //take up 100% of whats given
      height:"100%",
      left:panelSize,                             //panelSize determines how far left of the screen the code should be
      transition:(prevSize != size && (size != 0.0 || prevSize != 0.0)) ? "" : "left 0.2s ease-out, opacity 0.01s linear" //if they're using the slider to change the length of the panel, dont use a transition, otherwise (meaning they're using the toggle button) use a transition where when the left changes, it eases out
    }
    
    if(codeMirrorInstance){
      console.log("hey")
      console.log(codeMirrorInstance.getCursor().line)
    }

    return(
      <div className="editor">
        <div style={panelStyle}>
          <Dock position='left'
                isVisible={isVisible}
                size={size}
                dimMode="transparent"
                onSizeChange={(newSize)=>{
                  if(newSize < 0.3)           //basically limiting the max size of the panel
                    this.handleOnSizeChange(newSize)
                  
                }}
                onVisibleChange={this.handleOnVisibleChange}
                dockStyle={{width:panelSize}}
          >
            <div className="panel">
              <div className="panel-collapse-button">
                <div/><div onClick={this.handleOnVisibleChange}>&larr;</div>
              </div>
              <div className="panel-content">
                <img className="panel-image" src={user.photoURL+"?height=500" || "img/defaultProfile.png"}/>
                <div className="panel-name">{user.displayName || "Joe Bruin"}</div>
                <div className="panel-options">
                  <ul className="panel-options-list">
                    <li className="panel-options-item">Profile</li>
                    <li className="panel-options-item">Sketches</li>
                    <li className="panel-options-item" onClick={logout}>Signout</li>
                  </ul>
                </div>
              </div>
              <div className="editor-footer">
                <img className="editor-footer-image" src="img/tla-footer.png"/>
              </div>
            </div>
          </Dock>
        </div>
        <div style={codeStyle}>
          <SplitPane
            split="vertical"
            minSize={window.innerWidth*(1-size)/5}   //minimum size of code is 20% of screen not including panel adn max size is 50%
            maxSize={window.innerWidth*(1-size)*3/4}
            defaultSize="37.5%"
            allowResize={true}
            onChange={ (codeSize) => {
              console.log(codeSize)
              this.setState({codeSize})
            }}
          >
            <div  className="code-section">
              <div className="editor-header">
                {isVisible ? <div className='editor-expand-panel'/> : <div className='editor-expand-panel' title="Open Profile Panel" onClick={this.handleOnVisibleChange}>></div>}
                <div className="editor-language-dropdown">
                  <Dropdown isOpen={isOpen} toggle={()=>{this.setState({isOpen:!isOpen})}}>
                    <DropdownToggle caret>
                      <div style={{display:"inline-block"}}>{language}</div>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => {this.setState({language:"Python", mode:this.nameToMode("Python")})}}>Python</DropdownItem>
                      <DropdownItem onClick={() => {this.setState({language:"Javascript", mode:this.nameToMode("Javascript")})}}>Javascript</DropdownItem>
                      <DropdownItem onClick={() => {this.setState({language:"Processing", mode:this.nameToMode("Processing")})}}>Processing</DropdownItem>
                      <DropdownItem onClick={() => {this.setState({language:"Java", mode:this.nameToMode("Java")})}}>Java</DropdownItem>
                      {/* <DropdownItem onClick={() => {this.setState({language:"C++", mode:this.nameToMode("C++")})}}>C++</DropdownItem> */}
                      <DropdownItem onClick={() => {this.setState({language:"HTML", mode:this.nameToMode("HTML")})}}>HTML</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="editor-run-button">
                  <div>run</div>
                </div>
              </div>
              <div className="text-editor-container">
                <CodeMirror
                  editorDidMount={(codeMirrorInstance)=>{this.setState({codeMirrorInstance})}}
                  value={this.state.code}
                  lineWrapping
                  height="100%"
                  options={options}
                  onCursor={(nextState)=>{
                    const {codeMirrorInstance, currentLine} = this.state
                    let {line} = nextState.getCursor()
                    if(codeMirrorInstance){
                      codeMirrorInstance.removeLineClass(currentLine, 'wrap', 'selected-line')
                      codeMirrorInstance.addLineClass(line, 'wrap', 'selected-line')
                    }
                    this.setState({currentLine:line})
                  }}
                  onBeforeChange={(editor, data, code) => {
                    this.setState({code});
                  }}
                  onChange={(editor, data, code) => {
                    this.updateCode(code);
                  }}
                />
              </div>
            </div>
            <div className="editor-output">test</div>
          </SplitPane>
        </div>
      </div>
    );
	}
}

export default Editor;
