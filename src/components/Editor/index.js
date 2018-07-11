import React from 'react';
import ProfilePanel from './components/ProfilePanel'
import Main from './components/Main'
import {Redirect} from 'react-router'
import {LANGUAGE, CREATION_DATE, MODIFICATION_DATE, CODE, DESCENDING, DEFAULT_MODE} from '../../constants';
import firebase from 'firebase'

// Specify imports for codemirror usage
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import '../../styles/CustomCM.css'
import '../../styles/Resizer.css'
import '../../styles/Editor.css'
import '../../styles/Panel.css'

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
      userSketches: this.props.firestore.collection(`users/${this.props.user.uid}/programs`),
      code: "",
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
      isProcessing:false,
      hotReload:false,
    };

    this.getMostRecentDoc(this.state.userSketches).then((queryResult) => {
      if(queryResult && queryResult.docs[0]){
        let doc = queryResult.docs[0]
        this.switchToSketch(doc)
      }
    })
  }

  /**
   * switchToSketch - switch to a sketch document object in a code editor.
   * NOTE: While flexible, If we end up supporting documents other than sketches,
   * then this function may fail unless we constrain the type of document we are
   * switching to.
   * @param  {firebase.firestore.DocumentReference} sketchDoc - the sketch object in
   * firestore to switch to.
   */
  switchToSketch(sketchDoc){
    if(sketchDoc && sketchDoc.exists){
      let language = sketchDoc.data()[LANGUAGE]
      this.changeMode(language)
      this.setStateFromDoc(sketchDoc, [LANGUAGE, CODE])
    }
  }

  /**
   * switchToSketchInLanguage - switches the editor view to a sketch most recently
   * edited in language specified by the user. NOTE: This method will have no purpose if
   * we opt to go with a plurality of sketches in a given language, but until then,
   * it is very useful
   * @param  {String} language - the language to switch to, specified not as a code but
   * as a language name eg. HTML instead of htmlmixed
   */
  switchToSketchInLanguage(language){
    let filter = {
      fieldPath: "language",
      opStr: "==",
      value: language
    }

    this.getMostRecentDoc(this.state.userSketches, filter).then((queryResult) => {
      if(queryResult && queryResult.docs[0]){
        let doc = queryResult.docs[0]
        this.switchToSketch(doc)
      }
    })
  }

  /**
   * getMostRecentDoc - fetches the most recent code document/sketch from user's programs in firestore.
   * Queries are moderately controllable by passing in a filter that is passed into firestore's
   * where(): see https://firebase.google.com/docs/firestore/query-data/queries.
   * @param  {firebase.firestore.CollectionReference} collectionRef - the collection to parse for a most recent doc
   * @param  {object} [filter=null] filter controls what documents get ordered in query.
   *   Fields:
   *          fieldPath: field in firestore to order by.
   *          opStr: operation to filter by. Currently only '==' is supported
   *          value: where()'s value field. TODO: enforce enum like selection of query enabled fields
   * @return {Promise} this Promise resolves once the most recent doc has been discovered or no document has been found
   */
  getMostRecentDoc(collectionRef, filter=null){
    if(filter && filter.fieldPath && filter.opStr && filter.value){
      return collectionRef.where(filter.fieldPath, filter.opStr, filter.value).orderBy(MODIFICATION_DATE, DESCENDING).limit(1).get()
    }
    else{
      // Return the most recently worked on program.
      return collectionRef.orderBy(MODIFICATION_DATE, DESCENDING).limit(1).get()
    }
  }

  /**
   * setStateFromDoc - sets attributes of component state from firestore doc state.
   * At current, attributes in the state and in the doc have to be identically named
   * in order to set component state correctly
   * @param {firebase.firestore.DocumentReference} doc  The doc to use as a state source
   * @param {String Array} attributes attributes to find within the doc and correspondingly
   * set in the state
   */
  setStateFromDoc = (doc, attributes) => {
    if(doc && doc.exists){
      let stateToBeMerged = new Object()
      attributes.forEach(function(attr){
        stateToBeMerged[attr] = doc.data()[attr]
      })
      this.setState(stateToBeMerged)
    }
  }

  /**
   * nameToMode - converts the presentation name in the language selector dropdown to the mode string used by CodeMirror
   *    example: nameToMode("C++") returns "text/x-csrc"
   *    @todo add more languages/add all of them and let the user determine which to use
   *  @param {string} name - the presentation name (the name seen in the language selector dropdown)
   *  @return {string} - mode used by CodeMirror for syntax highlighting (if there is no conversion, defaults to constant)
   */
  nameToMode = (name) => {
    name = name.toLowerCase()
    const conversion={
      "python":"python",
      "javascript":"javascript",
      "c++":"text/x-csrc",
      "java":"text/x-java",
      "html":"htmlmixed",
      "processing":"javascript",
    }

    return conversion[name] || DEFAULT_MODE   //if there's no conversion, use the DEFAULT_MODE
  }

  // TODO: remove side effects of change mode, break most of changeMode's code into a more transparent function
  /**
   * changeMode - sets the language mode, also changing the document retrieved from firestore
   * @param  {String} language - the language to switch to.  This language value should be given
   * as seen in the store, one of the following: ["HTML", "Javascript", "Java", "Python", "Processing"(unimplemented/unsupported)]
   * TODO: Implement Processing
   * @return {[type]}          [description]
   */
  changeMode = (language) => {
    this.setState({
      language,
      mode: this.nameToMode(language),
      isProcessing: language === "processing",
    })
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
   *  onSizeChangeHandler - handler for when the panel is being resized by the resizer (right edge of the panel)
   *    stores the old size in prevSize
   *
   *    @param {float} newSize - the new size of the panel as a fraction of the width of the screen
   */
  onSizeChangeHandler = (newSize) => {
    this.setState({
      size:newSize,
      prevSize:this.state.size,         //storing the previous size in prevSize
      paneStyle:{transition:"none"},
    })
  }

  splitPaneChangeHandler = (codeSize) => {
      this.setState({codeSize, paneStyle:{transition:"none"}})
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

  /**
   *  updateCode - handler for when text in the text editor changes
   *
   *    @param {float} newCode - the new text in the screen (not just what changed, the whole text)
   */
  updateCode = (newCode) => {
    this.setState({
      code: newCode,
    }, () => {
      this.uploadCode(this.state.language, this.state.code)
    })
  }

  uploadCode = (language, newCode) => {
    let codeDoc = this.state.userSketches.doc(`${language}`)
    codeDoc.update({
      code: newCode,
      lastModified: new Date(Date.now())
    })

  }

  /**
   * runCode - handler for when user presses the run code button
   *
   *  @todo Add checking for syntactically incorrect html.  Display error message when this happens.
   */
  runCode = () => {
    if(this.state.mode === 'htmlmixed' || this.state.mode === 'javascript'){
      this.setState({
        runResult: this.state.code,
      });
		}
  }

  /**
   * clearOutput - clears the output screen when a user presses clear button
   */
  clearOutput = () => {
    this.setState({
      runResult: null,
    });
  }

  /**
   *  render
   */
	render() {
    const {isVisible, size, prevSize, isOpen, language, mode,
           codeSize, paneStyle, code, runResult, isProcessing,
           hotReload,
    } = this.state
    const { user} = this.props

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
      transition:(prevSize !== size && (size !== 0.0 || prevSize !== 0.0)) ? "" : "left 0.2s ease-out, opacity 0.01s linear" //if they're using the slider to change the length of the panel, dont use a transition, otherwise (meaning they're using the toggle button) use a transition where when the left changes, it eases out
    }


    return(
      <div className="editor">
        <ProfilePanel
          handleOnSizeChange={this.onSizeChangeHandler}
          handleOnVisibleChange={this.handleOnVisibleChange}
          isVisible={isVisible}
          clearUserData={this.props.clearUserData}
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
          changeMode={this.switchToSketchInLanguage.bind(this)}

          updateCode={this.updateCode}
          runCode={this.runCode}
          clearOutput={this.clearOutput}
          runResult={runResult}
          setCodeMirrorInstance={this.setCodeMirrorInstance}
          code={code}
          setCurrentLine={this.setCurrentLine}
          codeStyle={codeStyle}
          language={language}
          mode={mode}
          setPaneStyle={this.setPaneStyle}
          isProcessing={isProcessing}
          hotReload={hotReload}
        />
      </div>
    );
	}
}

export default Editor;
