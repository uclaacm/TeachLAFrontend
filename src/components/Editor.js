import React from 'react';
import ProfilePanel from './Editor/components/ProfilePanel'
import MainContainer from './Editor/containers/MainContainer'
import {Redirect} from 'react-router'
import {LANGUAGE, CREATION_DATE, MODIFICATION_DATE, CODE, DESCENDING, DEFAULT_MODE} from '../constants';
import firebase from 'firebase'
import {nameToMode} from '../constants/helpers.js'
// Specify imports for codemirror usage
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import '../styles/CustomCM.css'
import '../styles/Resizer.css'
import '../styles/Editor.css'
import '../styles/Panel.css'

class Editor extends React.Component {

  /**
   * constructor
   *
   * @param {object} props
   *    @key {object} user - information of user; (should never be null bc if someone's not logged in, sends them to the login page)
   *      @key {}
   *    @key {function} clearUserData - redux action to log the user out, brings you to homepage after (bc if you're not logged in, you're rerouted to the home page)
   */
  constructor(props) {
    super(props);
    this.state = {
      panelVisible:true,
      size:0.25,
      prevSize:0.25,
      codeSize:"37.5%",
      isOpen:false,
      paneStyle:{transition:"none"},
      hotReload:false,
    };


    // function 'this' context bindings
    this.splitChangeHandler = this.splitPaneChangeHandler.bind(this)
    this.handleOnVisibleChange = this.handleOnVisibleChange.bind(this)
    this.setPaneStyle = this.setPaneStyle.bind(this)
    this.onSizeChangeHandler = this.onSizeChangeHandler.bind(this)
  }

  /**
   *  handleOnVisibleChange - handler for when the collapse panel button or expand panel button is pressed
   *    if the panel is open, closes it and sets the size to 0
   *    if the panel is closed, opens it and sets the size to 0.25 (25% of the screen)
   *
   */
  handleOnVisibleChange(){
    this.setState({
      panelVisible: !this.state.panelVisible,           //open it if its closed, close it if its open
      size:this.state.panelVisible ? 0.0 : 0.25,     //give it a size of 0 if it was open, 0.25 if it was closed
      prevSize:this.state.panelVisible ? 0.0 : 0.25, //set the previous size to the same as the new size (used to make the slide transition only trigger when the expand/collapse button is pressed)
      codeSize:"50%",
      paneStyle:{transition:"width 0.3s ease"},
    })
  }


  /**
   *  onSizeChangeHandler - handler for when the panel is being resized by the resizer (right edge of the panel)
   *    stores the old size in prevSize
   *
   *    @param {float} newSize - the new size of the panel as a fraction of the width of the screen
   */
  onSizeChangeHandler(newSize){
    this.setState({
      size:newSize,
      prevSize:this.state.size,         //storing the previous size in prevSize
      paneStyle:{transition:"none"},
    })
  }

  splitPaneChangeHandler(codeSize){
      this.setState({codeSize, paneStyle:{transition:"none"}})
  }

  setPaneStyle(newPaneStyle){
    this.setState({paneStyle:newPaneStyle})
  }

  /**
   *  render
   */
	render() {
    const {panelVisible, size, prevSize, isOpen, language, mode,
           codeSize, paneStyle, code, isProcessing,
           hotReload,
    } = this.state
    const { user} = this.props

    // if somehow the router breaks and a non-logged in user gets to the editor, reroute the user back to the login page
    if(!user || !user.programs){
      return (<Redirect to="/login"/>)
    }

    //panelSize: {string} - how much of the screen the panel will take up
    let panelSize = (size*100.0).toString() + '%'

    //style to be applied to left panel
    const panelStyle = {width:panelSize}

    //style to be applied to non panel (sections containing text editor and code output)
    const codeStyle = {
      position:"fixed",                                                        //fixed bc we're using left
      width:((1.0-size)*100.0).toString() + '%',                               //take up the rest of the screen/screen not being used by the left panel
      height:"100%",
      left:panelSize,                             //panelSize determines how far left of the screen the code should be
      transition:(prevSize !== size && (size !== 0.0 || prevSize !== 0.0)) ? "" : "left 0.2s ease-out, opacity 0.01s linear" //if they're using the slider to change the length of the panel, dont use a transition, otherwise (meaning they're using the toggle button) use a transition where when the left changes, it eases out
    }

    return(
      <div className="editor">
        <ProfilePanel
          handleOnSizeChange={this.onSizeChangeHandler}
          handleOnVisibleChange={this.handleOnVisibleChange}
          panelVisible={panelVisible}
          clearUserData={this.props.clearUserData}
          size={size}
          user={user}
        />
        <MainContainer
          programsCollection={user.programs}
          paneStyle={paneStyle}
          size={codeSize}
          onSplitPaneChange={this.splitPaneChangeHandler}
          handleOnVisibleChange={this.handleOnVisibleChange}
          panelVisible={panelVisible}
          codeStyle={codeStyle}
          setPaneStyle={this.setPaneStyle}
          hotReload={hotReload}
        />
      </div>
    );
	}
}

export default Editor;
