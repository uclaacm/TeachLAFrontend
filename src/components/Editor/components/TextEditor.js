import React from 'react'
import Editor from '../index.js'
import {nameToMode} from '../../../constants/helpers.js'
import {lifecycle} from 'recompose'

let CodeMirror = null
if(typeof(window) !== 'undefined' && typeof(window.navigator) !== 'undefined'){
  // import {Controlled as CodeMirror} from 'react-codemirror2'
  CodeMirror = require('react-codemirror2').Controlled
  require('codemirror/mode/javascript/javascript.js')
  require('codemirror/mode/htmlmixed/htmlmixed.js')
  require('codemirror/mode/python/python.js')
  require('codemirror/mode/clike/clike.js')
}
// import {Controlled as CodeMirror} from 'react-codemirror2'
// import 'codemirror/mode/javascript/javascript.js';
// import 'codemirror/mode/htmlmixed/htmlmixed.js';
// import 'codemirror/mode/python/python.js';
// import 'codemirror/mode/clike/clike.js';

class TextEditor extends React.Component {

  /**
   * setCurrentLine - removes the line class from the current line and applies it to the new line, which is set in the redux store
   * @param {CodeMirror} nextState - the new state of code mirror after the line change
   */
  setCurrentLine(nextState){
    let currentLine = this.props.currentLine
    let nextLine = nextState.getCursor().line
    if(this.props.cmInstance){
      this.props.cmInstance.removeLineClass(currentLine, 'wrap', 'selected-line')
      this.props.cmInstance.addLineClass(nextLine, 'wrap', 'selected-line')
    }
    this.props.setCurrentLineInStore(nextLine)
  }
    /**
      * @prop {function} editorDidMount - used for selected line highlighting
      * @prop {function} onCursor - passed a codeMirrorInstance; triggered when the user changes the line the cursor is on;
    */
   render(){
    if(CodeMirror){
      return (
        <CodeMirror
            editorDidMount={(codeMirrorInstance)=>{this.props.setCodeMirrorInstance(codeMirrorInstance, this.props.id)}}
            value={this.props.code}
            lineWrapping
            height="100%"
            options={{
              mode: nameToMode(this.props.language),
              theme: 'material',          //requires lots of CSS tuning to get a theme to work, be wary of changing
              lineNumbers: true,          //text editor has line numbers
              lineWrapping:true,          //text editor does not overflow in the x direction, uses word wrap (NOTE: it's like MO Word wrapping, so words are not cut in the middle, if a word overlaps, the whole word is brought to the next line)
            }}
            onCursor={(nextState)=>{this.setCurrentLine(nextState)}}
            onBeforeChange={(editor, data, newCode) => {
                this.props.updateCode(newCode, this.props.id)
            }}
            onChange={(editor, data, newCode) => {
                this.props.updateCode(newCode, this.props.id)
                this.props.uploadCode(newCode, this.props.id)
                if(this.props.hotReload){
                  this.props.runCode(newCode)
                }
            }}
        />
      )
     }
     else{
       return null
     }
   }
}

export default TextEditor
