import React from 'react';
import ProfilePanel from './components/ProfilePanel'
import Main from './components/Main'
import {Redirect} from 'react-router'
import {DEFAULT_MODE} from '../../constants'
// Specify imports for codemirror usage
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import '../../styles/Editor.css'

import defaultPic from '../../img/defaultProfile.png'

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

  changeMode = (language) => {
    this.setState({language, mode:this.nameToMode(language)})
  }

  dropdownToggleHandler = () => {
    this.setState({isOpen:!this.state.isOpen})
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

  setPaneStyle = (newPaneStyle) => {
    this.setState({paneStyle:newPaneStyle})
  }

  setCodeMirrorInstance = (codeMirrorInstance) => {
    this.setState({codeMirrorInstance})
  }

  setCurrentLine = (nextState)=>{                                                          
      const {codeMirrorInstance, currentLine} = this.state
      let {line} = nextState.getCursor()
      if(codeMirrorInstance){
          codeMirrorInstance.removeLineClass(currentLine, 'wrap', 'selected-line')    //removeLineClass removes the back highlight style from the last selected line
          codeMirrorInstance.addLineClass(line, 'wrap', 'selected-line')              //addLineClass adds the style to the newly selected line
      }
      this.setState({currentLine:line})
  }

  splitPaneChangeHandler = (codeSize) => {
      this.setState({codeSize, paneStyle:{transition:"none"}})
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
    const {isVisible, size, prevSize, isOpen, language, mode, codeMirrorInstance, codeSize, paneStyle, code} = this.state
    const {logout, user} = this.props

    //if somehow the router breaks and a non-logged in user gets to the editor, reroute the user back to the login page
    if(!user){
      return (<Redirect to="/login"/>)
    }

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
        <ProfilePanel
          handleOnSizeChange={this.handleOnSizeChange}
          handleOnVisibleChange={this.handleOnVisibleChange}
          isVisible={isVisible}
          logout={this.logout}
          panelStyle={panelStyle}
          size={size}
          user={user}
        />
        <Main
          paneStyle={paneStyle}
          minSize={window.innerWidth*(1-size)/4}
          maxSize={isVisible ? window.innerWidth*(1-size)*3/4 : window.innerWidth*3/4}
          size={codeSize}
          allowResize={true}
          onSplitPaneChange={this.splitPaneChangeHandler}
          handleOnVisibleChange={this.handleOnVisibleChange}
          isVisible={isVisible}
          isOpen={isOpen}
          handleDropdownToggle={this.dropdownToggleHandler}
          changeMode={this.changeMode}
          setCodeMirrorInstance={this.setCodeMirrorInstance}
          code={code}
          setCurrentLine={this.setCurrentLine}
          codeStyle={codeStyle}
          language={language}
          mode={mode}
          setPaneStyle={this.setPaneStyle}
        />
      </div>
    );
	}
}

export default Editor;


{/* <ProfilePanel
handleOnSizeChange={this.handleOnSizeChange}
handleOnVisibleChange={this.handleOnVisibleChange}
isVisible={isVisible}
logout={this.logout}
panelStyle={panelStyle}
size={size}
user={user}
/> */}
