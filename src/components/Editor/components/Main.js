import React from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2';
import SplitPane from 'react-split-pane'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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

	render(){																													//called deconstruction; pulling children, triggerLogin, ..., textPadding out of props
        const { codeStyle, paneStyle, minSize, maxSize, size, allowResize, onSplitPaneChange, handleOnVisibleChange,
                isVisible, isOpen, handleDropdownToggle, changeMode, setCodeMirrorInstance, updateCode,
                setCurrentLine, code, language, mode
        } = this.props
        
        //json required by CodeMirror
        const options = {
            mode,
            theme: 'material',          //requires lots of CSS tuning to get a theme to work, be wary of changing
            lineNumbers: true,          //text editor has line numbers
            lineWrapping:true,          //text editor does not overflow in the x direction, uses word wrap (NOTE: it's like MO Word wrapping, so words are not cut in the middle, if a word overlaps, the whole word is brough to the next line)
        };

        console.log(paneStyle)
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
                        {/*if the left panel is open, show an empty div, otherwise show a > that when clicked, opens the panel*/}
                        {isVisible ? <div className='editor-expand-panel' style={{width:"0px", padding:"0"}}/> : <div className='editor-expand-panel' title="Open Profile Panel" onClick={handleOnVisibleChange}>></div>}
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
	    )
	}
}
 
export default CodeSection
       