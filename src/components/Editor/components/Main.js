import React from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2';
import SplitPane from 'react-split-pane'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Output from './Output.js'
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/clike/clike.js';
/*
	Props:
		bgColor: string representing the color of the background of the img (can be hex color, rgb(r, g, b, a), or color name)
		textColor: string representing the color of the text in the button (can be hex color, rgb(r, g, b, a), or color name)
		imgSrc: string representing the location of the img used as the icon (can be in the form of URL, path location, or data representing image)
		textPadding: string representing padding to the left of the text, i.e. distance from the img (give px units)
*/

class CodeSection extends React.Component {
	constructor(props){
		super(props)
    }

    // componentDidUpdate(){
    //     if(this.props.paneStyle.transition != "none"){
    //         this.props.setPaneStyle({transition:"none"})
    //     }
    // }
  
    renderClosePanelButton = () => {
      const {isVisible, handleOnVisibleChange} = this.props
    
      //if the left panel is open, show an empty div, otherwise show a > that when clicked, opens the panel
      if(isVisible){
        return (
          <div className='editor-expand-panel' style={{width:"0px", padding:"0"}}/>
        )
      }
      
      return (
        <div className='editor-expand-panel' title="Open Profile Panel" onClick={handleOnVisibleChange}>
          >
        </div>
      )
  }
  
  renderDropdown = () => {
    const {isOpen, handleDropdownToggle, language, changeMode,} = this.props

    return (
      <div className="editor-language-dropdown">
        <Dropdown
        isOpen={isOpen}
        toggle={handleDropdownToggle}
        >
          <DropdownToggle caret>   {/* caret adds the downward arrow next to the selected language */}
            <div style={{display:"inline-block"}}>{language}</div>                                {/*language comes from the state, it represents the currently selected language*/}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => {changeMode('Python')}}>Python</DropdownItem>
            <DropdownItem onClick={() => {changeMode('Javascript')}}>Javascript</DropdownItem>
            <DropdownItem onClick={() => {changeMode('Processing')}}>Processing</DropdownItem>
            <DropdownItem onClick={() => {changeMode('Java')}}>Java</DropdownItem>
            {/* <DropdownItem onClick={() => {changeMode('C++')}}>C++</DropdownItem> {/*disabled bc C++ is gross and probably not wanted*/}
            <DropdownItem onClick={() => {changeMode('HTML')}}>HTML</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }

  renderRunButton = () => {
    const {runCode} = this.props
    return (
      <div className="editor-run" onClick={runCode}>
        <button className="editor-run-button">
          <div className="editor-run-button-content">
            <span style={{flex:"1 1 auto", width:"100%"}}>></span>    {/* > takes up as much space as possible while the Run Code is fixed size*/}
            <span style={{flex:"0 0 auto"}}>
              Run Code
            </span>
          </div>
        </button>
      </div>
    )
  }

  renderTextEditor = () => {
    const {code, setCurrentLine, updateCode, setCodeMirrorInstance, mode} = this.props

    //json required by CodeMirror
    const options = {
      mode,
      theme: 'material',          //requires lots of CSS tuning to get a theme to work, be wary of changing
      lineNumbers: true,          //text editor has line numbers
      lineWrapping:true,          //text editor does not overflow in the x direction, uses word wrap (NOTE: it's like MO Word wrapping, so words are not cut in the middle, if a word overlaps, the whole word is brought to the next line)
    };

    /**
      * @prop {function} editorDidMount - used for selected line highlighting
      * @prop {function} onCursor - passed a codeMirrorInstance; triggered when the user changes the line the cursor is on;
    */
    return (
      <CodeMirror
          editorDidMount={(codeMirrorInstance)=>{setCodeMirrorInstance(codeMirrorInstance)}}
          value={code}
          lineWrapping
          height="100%"
          options={options}
          onCursor={(nextState)=>{setCurrentLine(nextState)}}
          onBeforeChange={(editor, data, newCode) => {
              updateCode(newCode)
          }}
          onChange={(editor, data, newCode) => {
              updateCode(newCode)
          }}
      />
    )
  }

	render(){																													//called deconstruction; pulling children, triggerLogin, ..., textPadding out of props
    const {codeStyle, paneStyle, minSize, maxSize, size, allowResize, onSplitPaneChange, mode, runResult, clearOutput} = this.props

		return (
      <div style={codeStyle}>
        <SplitPane
            pane1Style={paneStyle}
            split="vertical"                              //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
            minSize={minSize}                             //minimum size of code is 25% of screen not including panel adn max size is 50%
            maxSize={maxSize}                             //maximum size is 75% of the screen if the panel  is open, 50% otherwise
            size={size}                                   //the initial size of the text editor section
            allowResize={allowResize}
            onChange={onSplitPaneChange}
        >
          <div  className="code-section">
            <div className="editor-header">
              {this.renderClosePanelButton()}
              {this.renderDropdown()}
              {this.renderRunButton()}
            </div>
            <div className="text-editor-container">
              {this.renderTextEditor()}
            </div>
          </div>
          <Output
            mode={mode}
            runResult={runResult}
            clearOutput={clearOutput}
          />
        </SplitPane>
      </div>
	  )
	}
}

export default CodeSection
