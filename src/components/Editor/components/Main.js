import React from 'react'
import SplitPane from 'react-split-pane'
import OutputContainer from '../containers/OutputContainer.js'
import TextEditorContainer from '../containers/TextEditorContainer'
import DropdownButton from './DropdownButton'
import RunButton from './RunButton'
import {PYTHON} from '../../../constants'
/*
	Props:
		bgColor: string representing the color of the background of the img (can be hex color, rgb(r, g, b, a), or color name)
		textColor: string representing the color of the text in the button (can be hex color, rgb(r, g, b, a), or color name)
		imgSrc: string representing the location of the img used as the icon (can be in the form of URL, path location, or data representing image)
		textPadding: string representing padding to the left of the text, i.e. distance from the img (give px units)
*/

class Main extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			codeSize: "37.5%",
			paneStyle:{transition:"none"},
		}
  }

	componentWillMount(){
    //update the most recent program if it doesn't exist or is an empty string
    if(!this.props.mostRecentProgram.length){
      this.props.resetMostRecentProgram()
    }
	}

  renderOpenPanelButton = () => {
    const {panelVisible, handleOnVisibleChange} = this.props

    //if the left panel is closed, show an empty div
    if(!panelVisible){
      return (
        <div className='editor-expand-panel' style={{width:"0px", padding:"0"}}/>
      )
    }

    // otherwise show a > that when clicked, opens the panel
    return (
      <div
        className="editor-expand-panel"
        title="Open Profile Panel"
        onClick={handleOnVisibleChange}
      >
        >
      </div>
    );
  };

  renderDropdown = () => {
    //dropdown items should be an array of objects with two keys: value and display
    let dropdownItems = []
    
    //keySeq returns an Immutable object, so go through each key and push it into an array
    if(this.props.programs){
      this.props.programs.keySeq().forEach(key => dropdownItems.push(key))
    }

    return (
      <DropdownButton
        displayValue={this.props.mostRecentProgram}
        onSelect={this.props.setMostRecentProgram}
        dropdownItems={dropdownItems}
      />
    )
  }
  
	render(){																													//called deconstruction; pulling children, triggerLogin, ..., textPadding out of props
    const {codeStyle, paneStyle, size, onSplitPaneChange,} = this.props

    return (
      <div style={codeStyle}>
        {/* TODO: there appears to be a bug with how much the split pane is able to move.  This bug is triggered by
					minimizing the profile panel, maximizing it again, and trying to move the split pane.  The speed of movement
					is greatly reduced*/}
        <SplitPane
          pane1Style={paneStyle}
          split="vertical" //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
          minSize={(window.innerWidth * (1 - size)) / 4} //minimum size of code is 25% of screen not including panel and max size is 50%
          maxSize={
            this.props.paneVisible
              ? (window.innerWidth * (1 - size) * 3) / 4
              : (window.innerWidth * 3) / 4
          } //maximum size is 75% of the screen if the panel  is open, 50% otherwise
          size={size} //the initial size of the text editor section
          allowResize={true}
          onChange={onSplitPaneChange}
        >
          <div className="code-section">
            <div className="editor-header">
              {this.renderOpenPanelButton()}
							{this.renderDropdown()}
              <RunButton runCode={this.props.runCode}/>
            </div>
            <div className="text-editor-container">
              <TextEditorContainer key={this.props.mostRecentProgram}/>
            </div>
          </div>
          <OutputContainer />
        </SplitPane>
      </div>
    );
  }
}

export default Main
