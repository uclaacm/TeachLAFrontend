import React from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2';

let CodeMirror = null
if(typeof(window) !== 'undefined' && typeof(window.navigator) !== 'undefined'){
  // import {Controlled as CodeMirror} from 'react-codemirror2'
  CodeMirror = require('react-codemirror2').Controlled
  require('codemirror/mode/javascript/javascript.js')
  require('codemirror/mode/htmlmixed/htmlmixed.js')
  require('codemirror/mode/python/python.js')
  require('codemirror/mode/clike/clike.js')
}
/*
	Props:
		bgColor: string representing the color of the background of the img (can be hex color, rgb(r, g, b, a), or color name)
		textColor: string representing the color of the text in the button (can be hex color, rgb(r, g, b, a), or color name)
		imgSrc: string representing the location of the img used as the icon (can be in the form of URL, path location, or data representing image)
		textPadding: string representing padding to the left of the text, i.e. distance from the img (give px units)
*/

class TextEditor extends React.Component {
	constructor(props){
    super(props)
    
    this.state = {
      codeMirrorInstance:null,
      currentLine:0,
      code: this.props.code,
    }
  }

  setCurrentLine = (cm)=>{
      const {codeMirrorInstance, currentLine} = this.state
      let {line} = cm.getCursor()
      if(codeMirrorInstance){
          codeMirrorInstance.removeLineClass(currentLine, 'wrap', 'selected-line')    //removeLineClass removes the back highlight style from the last selected line
          codeMirrorInstance.addLineClass(line, 'wrap', 'selected-line')              //addLineClass adds the style to the newly selected line
      }
      this.setState({currentLine:line})
  }

	render(){					
    //json required by CodeMirror
    const options = {
      mode,
      theme: 'material',          //requires lots of CSS tuning to get a theme to work, be wary of changing
      lineNumbers: true,          //text editor has line numbers
      lineWrapping:true,          //text editor does not overflow in the x direction, uses word wrap (NOTE: it's like MO Word wrapping, so words are not cut in the middle, if a word overlaps, the whole word is brought to the next line)
    };
    //called deconstruction; pulling children, triggerLogin, ..., textPadding out of props
    return (
      <CodeMirror
          editorDidMount={(codeMirrorInstance)=>{setCodeMirrorInstance(codeMirrorInstance)}}
          value={code}
          lineWrapping
          height="100%"
          options={options}
          onCursor={(cm)=>{setCurrentLine(cm)}}
          onBeforeChange={(editor, data, newCode) => {
              // updateCode(newCode)
          }}
          onChange={(editor, data, newCode) => {
              // updateCode(newCode)
              // if(hotReload){
              //   runCode(newCode)
              // }
          }}
      />
    )
  }
}

export default TextEditor