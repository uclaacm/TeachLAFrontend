import React from "react";
import { CODEMIRROR_CONVERSIONS } from "../../../constants";
import * as fetch from "../../../lib/fetch.js";

let CodeMirror = null;
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  // import {Controlled as CodeMirror} from 'react-codemirror2'
  CodeMirror = require("react-codemirror2").Controlled;
  require("codemirror/mode/javascript/javascript.js");
  require("codemirror/mode/htmlmixed/htmlmixed.js");
  require("codemirror/mode/python/python.js");
  require("codemirror/mode/clike/clike.js");
}
/**----------Props--------
 * None
 */

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codeMirrorInstance: null,
      currentLine: 0,
    };
  }

  //==============React Lifecycle Functions===================//
  componentDidMount() {
    window.addEventListener("beforeunload", this.onLeave);
    window.addEventListener("close", this.onLeave);
  }

  componentWillUpdate() {}

  componentWillUnmount = () => {
    window.removeEventListener("beforeunload", this.onLeave);
    window.removeEventListener("close", this.onLeave);
  };

  checkDirty = async () => {
    if (!this.props.dirty) {
      return;
    }

    try {
      let programToUpdate = {};
      programToUpdate[this.props.mostRecentProgram] = {
        code: this.props.code,
      };

      await fetch.updatePrograms(this.props.uid, programToUpdate);
      //TODO: add functionality to be able to tell whether the fetch failed
    } catch (err) {
      console.log(err);
    }
  };

  onLeave = async ev => {
    if (this.props.dirty) {
      ev.returnValue = "";
    }
    return ev;
  };

  setCodeMirrorInstance = codeMirrorInstance => {
    this.setState({ codeMirrorInstance });
  };

  updateCode = (editor, data, newCode) => {
    //if the code's not yet dirty, and the old code is different from the new code, make it dirty
    if (!this.props.dirty && this.props.code !== newCode) {
      this.props.dirtyCode(this.props.mostRecentProgram);
    }
    this.props.setProgramCode(this.props.mostRecentProgram, newCode);
  };

  setCurrentLine = cm => {
    const { codeMirrorInstance, currentLine } = this.state;
    let { line } = cm.getCursor();
    if (codeMirrorInstance) {
      //removeLineClass removes the back highlight style from the last selected line
      codeMirrorInstance.removeLineClass(currentLine, "wrap", "selected-line");
      //addLineClass adds the style to the newly selected line
      codeMirrorInstance.addLineClass(line, "wrap", "selected-line");
    }
    this.setState({ currentLine: line });
  };

  render() {
    //json required by CodeMirror
    const options = {
      mode: CODEMIRROR_CONVERSIONS[this.props.language],
      theme: "material", //requires lots of CSS tuning to get a theme to work, be wary of changing
      lineNumbers: true, //text editor has line numbers
      lineWrapping: true, //text editor does not overflow in the x direction, uses word wrap (NOTE: it's like MO Word wrapping, so words are not cut in the middle, if a word overlaps, the whole word is brought to the next line)
      indentWithTabs: true,
    };

    return (
      <CodeMirror
        editorDidMount={codeMirrorInstance => {
          codeMirrorInstance.refresh();
          this.setCodeMirrorInstance(codeMirrorInstance);
        }}
        value={this.props.code}
        lineWrapping
        indentWithTabs={true}
        options={options}
        onCursor={cm => {
          this.setCurrentLine(cm);
        }}
        onBeforeChange={this.updateCode}
        onChange={this.updateCode}
      />
    );
  }
}

export default TextEditor;
