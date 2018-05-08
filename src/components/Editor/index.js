import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';

// Specify imports for codemirror usage
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/python/python.js';

// Imprts and constants for dropdown
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const dropDownOptions = [ {value: 'javascript', label: 'javascript'}, {value: 'python', label: 'python'} ];

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "// Code"
    };
    this.options = {
      mode: 'javascript',
      theme: 'material',
      lineNumbers: true
    };
  }

	updateCode = (newCode) => {
		this.setState({
			code: newCode,
		});
  }

  runCode = () => {
    eval(this.state.code);
  }

  updateMode = (language) => {
    this.options.mode = language;
    this.forceUpdate();
  }

	render() {
    return(
      <div>
      <h1>The Coding School</h1>
        <CodeMirror
          value={this.state.code}
          options={this.options}
          onBeforeChange={(editor, data, code) => {
            this.setState({code});
          }}
          onChange={(editor, data, code) => {
            this.updateCode(code);
          }}
        />
        <Dropdown 
          options={dropDownOptions}
          value={this.options.mode}
          onChange={(newValue) => {
            this.updateMode(newValue.value);
          }}
        />
        <input type="button" value="Run" onClick={this.runCode}/>
      </div>
    );
	}
}

export default Editor;
