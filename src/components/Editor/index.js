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

import defaultPic from '../../img/defaultProfile.png'

const DEFAULT_MODE = "python"

class Editor extends React.Component {

  /**
   * constructor
   * 
   * @param {object} props 
   *    @key {object} user - information of user; (should never be null bc if someone's not logged in, sends them to the login page)
   *      @key {}
   *    @key {function} logout - redux action to log the user out, brings you to homepage after (bc if you're not logged in, you're rerouted to the home page)
   */
  constructor(props) {
    super(props);
    /**
     * state
     * 
     *  @key {string} code        - contents of the text editor
     *      @todo allow user to load in previous code/set the opening language/starter code
     *  @key {boolean} isVisible  - true if left panel is open, false otherwise
     *  @key {float} size         - size of the left panel; fraction of the screen width 
     *  @key {float} prevSize     - last size of screen; used to determine if the collapse button was used or the panel resizer is being used (makes slide transition of panel work)
     *  @key {float} codeSize     - width of the text editor (the middle panel); fraction of the screen width
     *  @key {boolean} isOpen     - true if language selector dropdown is open, false otherwise
     *  @key {string} language    - name displayed in the language selector dropdown; for presentation, need to convert this name into the mode for CodeMirror
     *  @key {string} mode        - mode to be used in the options for CodeMirror, modes can be found here https://github.com/codemirror/CodeMirror/tree/master/mode
     *  @key {object} codeMirrorInstance   - component instance of CodeMirror; used to highlight the line the cursor is on
     *  @key {int} currentLine    - cursor is currently on this line (initialized to 0 bc it is the line number - 1, i.e. the first line)
     */
    this.state = {
      code: "def helloWorld():\n\tprint(\"Hello world!\")\n\nhelloWorld()",
      isVisible:true,
      size:0.25,
      prevSize:0.25,
      codeSize:"37.5%",
      isOpen:false,
      language:"Python",
      mode:"python",
      codeMirrorInstance:null,
      currentLine:0,
      paneStyle:{transition:"none"},
    };
  }

  /**
   * nameToMode - converts the presentation name in the language selector dropdown to the mode string used by CodeMirror
   *    example: nameToMode("C++") returns "text/x-csrc"
   *    @todo add more languages/add all of them and let the user determine which to use
   *  @param {string} name - the presentation name (the name seen in the language selector dropdown)
   *  
   *  @return {string} - mode used by CodeMirror for syntax highlighting (if there is no conversion, defaults to constant)
   */
  nameToMode = (name) => {
    const conversion={
      "Python":"python",
      "Javascript":"javascript",
      "C++":"text/x-csrc",
      "Java":"text/x-java",
      "HTML":"htmlmixed",
      "Processing":"javascript",
    }

    return conversion[name] || DEFAULT_MODE   //if there's no conversion, use the DEFAULT_MODE
  }

  /**
   *  handleOnVisibleChange - handler for when the collapse panel button or expand panel button is pressed
   *    if the panel is open, closes it and sets the size to 0
   *    if the panel is closed, opens it and sets the size to 0.25 (25% of the screen)
   * 
   */
  handleOnVisibleChange = () => {
    this.setState({
      isVisible: !this.state.isVisible,           //open it if its closed, close it if its open
      size:this.state.isVisible ? 0.0 : 0.25,     //give it a size of 0 if it was open, 0.25 if it was closed
      prevSize:this.state.isVisible ? 0.0 : 0.25, //set the previous size to the same as the new size (used to make the slide transition only trigger when the expand/collapse button is pressed)
      codeSize:"50%",
      paneStyle:{transition:"width 0.3s ease"},
    })
  }
  
  /**
   *  handleOnSizeChange - handler for when the panel is being resized by the resizer (right edge of the panel)
   *    stores the old size in prevSize
   *    
   *    @param {float} newSize - the new size of the panel as a fraction of the width of the screen
   */
  handleOnSizeChange = (newSize) => {
    this.setState({
      size:newSize,
      prevSize:this.state.size,         //storing the previous size in prevSize
      paneStyle:{transition:"none"},
    })
  }
  
  /**
   *  updateCode - handler for when text in the text editor changes
   *    
   *    @param {float} newCode - the new text in the screen (not just what changed, the whole text)
   */
  updateCode = (newCode) => {
    this.setState({
      code: newCode,
    });
  }

  //DEPRECATED: eventually going to make an API call and wait for the result to come back
  runCode = () => {
    // eval(this.state.code);
  }
  /**
   *  render
   */
	render() {
    const {isVisible, size, prevSize, isOpen, language, mode, codeMirrorInstance, codeSize} = this.state
    const {logout, user} = this.props

    //json required by CodeMirror
    const options = {
      mode: mode,
      theme: 'material',          //requires lots of CSS tuning to get a theme to work, be wary of changing
      lineNumbers: true,          //text editor has line numbers
      lineWrapping:true,          //text editor does not overflow in the x direction, uses word wrap (NOTE: it's like MO Word wrapping, so words are not cut in the middle, if a word overlaps, the whole word is brough to the next line)
    };

    //panelSize: {string} - how much of the screen the panel will take up 
    let panelSize=(size*100.0).toString() + '%'

    //style to be applied to left panel
    let panelStyle = {width:panelSize}            //width of the panel should always be the percent of its size (which is a decimal)
    
    //style to be applied to non panel (sections containing text editor and code output)
    let codeStyle = {
      position:"fixed",                                                        //fixed bc we're using left
      width:((1.0-size)*100.0).toString() + '%',                               //take up the rest of the screen/screen not being used by the left panel
      height:"100%",
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
                onSizeChange={(newSize)=>{
                  if(newSize < 0.3)                                     //limiting the max size of the panel to 30% of the screen
                    this.handleOnSizeChange(newSize)
                }}
                onVisibleChange={this.handleOnVisibleChange}
                dockStyle={{width:panelSize}}                           
          >
            <div className="panel">
              <div className="panel-collapse-button">
                <div/><div onClick={this.handleOnVisibleChange}>&larr;</div>                                        {/*character is leftward facing arrow*/}
              </div>
              <div className="panel-content">
                <img className="panel-image" src={user.photoURL ? user.photoURL+"?height=800" : defaultPic}/>        {/*if there's a photourl, use it, otherwise use the default image (the ?height=500 to make sure the picture sent is resized to 500px tall*/}
                <div className="panel-name">{user.displayName || "Joe Bruin"}</div>                                 {/*if there's no displayName, use the default name "Joe Bruin"*/}
                <div className="panel-options">
                  <ul className="panel-options-list">
                    <li className="panel-options-item">Profile</li>                                                 {/** @todo relocate to Profile page*/}
                    <li className="panel-options-item">Sketches</li>                                                {/** @todo relocate to sketches page*/}
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
            pane1Style={this.state.paneStyle} 
            split="vertical"                              //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
            minSize={window.innerWidth*(1-size)/4}        //minimum size of code is 25% of screen not including panel adn max size is 50%
            maxSize={isVisible ? window.innerWidth*(1-size)*3/4 : window.innerWidth*3/4}      //maximum size is 75% of the screen if the panel  is open, 50% otherwise
            size={codeSize}                           //the initial size of the text editor section
            allowResize={true}
            onChange={ (codeSize) => {
              this.setState({codeSize, paneStyle:{transition:"none"}})
            }}
          >
            <div  className="code-section">
              <div className="editor-header">
                {/*if the left panel is open, show an empty div, otherwise show a > that when clicked, opens the panel*/}
                {isVisible ? <div className='editor-expand-panel' style={{width:"0px", padding:"0"}}/> : <div className='editor-expand-panel' title="Open Profile Panel" onClick={this.handleOnVisibleChange}>></div>}
                <div className="editor-language-dropdown">
                  <Dropdown
                    isOpen={isOpen}
                    toggle={()=>{this.setState({isOpen:!isOpen})}}
                  >
                    <DropdownToggle caret>   {/* caret adds the downward arrow next to the selected language */}
                      <div style={{display:"inline-block"}}>{language}</div>                                {/*language comes from the state, it represents the currently selected language*/}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => {this.setState({language:"Python", mode:this.nameToMode("Python")})}}>Python</DropdownItem>
                      <DropdownItem onClick={() => {this.setState({language:"Javascript", mode:this.nameToMode("Javascript")})}}>Javascript</DropdownItem>
                      <DropdownItem onClick={() => {this.setState({language:"Processing", mode:this.nameToMode("Processing")})}}>Processing</DropdownItem>
                      <DropdownItem onClick={() => {this.setState({language:"Java", mode:this.nameToMode("Java")})}}>Java</DropdownItem>
                      {/* <DropdownItem onClick={() => {this.setState({language:"C++", mode:this.nameToMode("C++")})}}>C++</DropdownItem> */} {/*disabled bc C++ is gross and probably not wanted*/}
                      <DropdownItem onClick={() => {this.setState({language:"HTML", mode:this.nameToMode("HTML")})}}>HTML</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="editor-run">
                  <button className="editor-run-button">
                    <div className="editor-run-button-content">
                    <span style={{flex:"1 1 auto", width:"100%"}}>></span>    {/* > takes up as much space as possible while the Run Code is fixed size*/}
                    <span style={{flex:"0 0 auto"}}>
                      Run Code
                    </span>
                    </div>
                  </button>
                </div>
              </div>
              <div className="text-editor-container">
                {/**
                 * @prop {function} editorDidMount - used for selected line highlighting
                 * @prop {function} onCursor - passed a codeMirrorInstance; triggered when the user changes the line the cursor is on;
                */}
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
                      codeMirrorInstance.removeLineClass(currentLine, 'wrap', 'selected-line')    //removeLineClass removes the back highlight style from the last selected line
                      codeMirrorInstance.addLineClass(line, 'wrap', 'selected-line')              //addLineClass adds the style to the newly selected line
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
            <div className="editor-output">
              <div className="editor-header">
                <div style={{flex:"1 1 auto"}}> </div>
                <div className="editor-run">
                  <button className="editor-run-button" style={{backgroundColor:"#ec4848"}}>
                      Clear
                  </button>
                </div>
              </div>
              <div className="editor-output-content">
              </div>
            </div>
          </SplitPane>
        </div>
      </div>
    );
	}
}

export default Editor;
