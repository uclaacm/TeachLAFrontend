import React from 'react'
import firebase from 'firebase'
import {Controlled as CodeMirror} from 'react-codemirror2';
import SplitPane from 'react-split-pane'
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import OutputContainer from '../containers/OutputContainer.js'
import TextEditorContainer from '../containers/TextEditorContainer'
import DropdownButton from './DropdownButton'
import RunButton from './RunButton'
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
		this.state = {
			isOpen: false,
			codeSize: "37.5%",
			paneStyle:{transition:"none"},
			windows: [],
		}
		this.dropdownToggleHandler = this.dropdownToggleHandler.bind(this)
  }

	componentWillMount(){
		this.props.getMostRecentProgram().then((program) => {
			let id = this.props.createWindow(program)
			this.setState({
				windows: [id]
			})
		})
	}

	dropdownToggleHandler(){
    this.setState({isOpen:!this.state.isOpen})
  }

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

	renderWindows = () => {
		return this.state.windows.map(editorWindow => {
			if(editorWindow){
				// key required by react framework to assign each TextEditorContainer a stable identity
				return (<TextEditorContainer key={editorWindow} id={editorWindow}/>)
			}
		})
	}

	render(){																													//called deconstruction; pulling children, triggerLogin, ..., textPadding out of props
    const {codeStyle, paneStyle, minSize,
            maxSize, size, allowResize,
            onSplitPaneChange, mode, runResult,
            clearOutput, language} = this.props

		return (
      <div style={codeStyle}>
				{/* TODO: there appears to be a bug with how much the split pane is able to move.  This bug is triggered by
					minimizing the profile panel, maximizing it again, and trying to move the split pane.  The speed of movement
					is greatly reduced*/}
        <SplitPane
            pane1Style={paneStyle}
            split="vertical"                              //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
            minSize={window.innerWidth*(1-size)/4}        //minimum size of code is 25% of screen not including panel and max size is 50%
            maxSize={this.props.paneVisible ? window.innerWidth*(1-size)*3/4 : window.innerWidth*3/4}                             //maximum size is 75% of the screen if the panel  is open, 50% otherwise
            size={size}                                   //the initial size of the text editor section
            allowResize={true}
            onChange={onSplitPaneChange}
        >
          <div className="code-section">
            <div className="editor-header">
              {!this.props.panelVisible ? this.renderClosePanelButton() : null}
							<DropdownButton isOpen={this.state.isOpen} handleDropdownToggle={this.dropdownToggleHandler}
								language={this.props.language} changeMode={this.props.switchToProgram}/>
              <RunButton runCode={this.props.runCode}/>
            </div>
            <div className="text-editor-container">
							{this.renderWindows()}
            </div>
          </div>
          <OutputContainer/>
        </SplitPane>
      </div>
	  )
	}
}

export default CodeSection
