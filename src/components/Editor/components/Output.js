import React from "react";
import { PYTHON, JAVASCRIPT, CPP, JAVA, HTML, PROCESSING } from "../../../constants";
/**--------Props--------
 * None
 */

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //used for the refresh button
      counter: 0,
    };
  }

  //==============React Lifecycle Functions===================//
  componentDidUpdate = () => {};

  // a bit hacky, but we're re-rendering the output
  // by updating the state in a novel way
  reRenderOutput = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }));
  };

  renderHTMLOutput = () => {
    // html-output is an iframe canvas that displays html typed into the editor.  It only displays when html is the selected language
    //about: blank makes it so that the clear button will clear the html appropriately when pressed.  Otherwise, old content persists.
    const { runResult } = this.props;
    if (!runResult) {
      return null;
    }

    return (
      <iframe
        id={this.state.counter}
        key={this.state.counter}
        className="html-output"
        style={{ display: "flex", height: "92vh" }}
        srcDoc={this.props.runResult}
        src="about:blank"
        onLoad={e => {
          // console.log(e);
        }}
      />
    );
  };

  renderPythonOutput = () => {
    // html-output is an iframe canvas that displays html typed into the editor.  It only displays when html is the selected language
    //about: blank makes it so that the clear button will clear the html appropriately when pressed.  Otherwise, old content persists.
    let { runResult } = this.props;

    if (!runResult) {
      return null;
    }

    return (
      <iframe
        id={this.state.counter}
        key={this.state.counter}
        className="html-output"
        style={{ display: "flex", height: "92vh" }}
        srcDoc={`<html> 
            <head> 
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script> 
            <script src="http://www.skulpt.org/static/skulpt.min.js" type="text/javascript"></script> 
            <script src="http://www.skulpt.org/static/skulpt-stdlib.js" type="text/javascript"></script>
            <style>
              html, body {
                margin:0;
                width:100%;
                height:100%;
                background-color: #585166;
              }
              #output {
                width:400px;
                height:100px;
                background-color:#333;
                color:#0F0;
                word-wrap:break-word;
                overflow:auto scroll;
              }
              .editor-run-button{
                display:flex;
                width:160px;
                height:40px;
                background-color: #4CAF50;
                display: inline-block;
                font-size: 24px;
                cursor: pointer;
                text-align: center;
                text-decoration: none;
                outline: none;
                color: #fff;
                border: none;
                border-radius: 5px;
                box-shadow: 1px 3px #999;
                margin-bottom: 10px;
              }
              #mycanvas {
                border: 2px solid black;
              }
            </style> 
            
            </head> 
            
            <body style="" onload="runit()"> 
            
            <script type="text/javascript"> 
            // output functions are configurable.  This one just appends some text
            // to a pre element.
            function outf(text) { 
                var mypre = document.getElementById("output"); 
                mypre.innerHTML = mypre.innerHTML + text; 
            } 
            function builtinRead(x) {
                if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                        throw "File not found: '" + x + "'";
                return Sk.builtinFiles["files"][x];
            }
            // Here's everything you need to run a python program in skulpt
            // grab the code from your textarea
            // get a reference to your pre element for output
            // configure the output function
            // call Sk.importMainWithBody()
            function runit() { 
                var prog = document.getElementById("runResult").innerHTML  ; 
                //if you want to debug, you can uncomment this console log to see the code being run
                //console.log(prog)
                var mypre = document.getElementById("output"); 
                mypre.innerHTML = ''; 
                Sk.pre = "output";
                Sk.configure({output:outf, read:builtinRead}); 
                (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
                var myPromise = Sk.misceval.asyncToPromise(function() {
                    return Sk.importMainWithBody("<stdin>", false, prog, true);
                });
                myPromise.then(function(mod) {
                    //console.log('success');
                },
                function(err) {
                    console.log(err.toString());
                });
            } 
            </script> 
            <form> 
            <button class="editor-run-button" type="button" onclick="runit()">Replay</button> 
            </form> 
            <div style="display:none;" id="runResult">${runResult}</div>
            <!-- If you want turtle graphics include a canvas -->
            <div id="mycanvas"></div> 
            <pre id="output"></pre> 
            
            </body> 
            
            </html> `}
        src="about:blank"
        onLoad={e => {
          // console.log(e);
        }}
      />
    );
  };

  renderProcessingOutput = () => {
    const { runResult } = this.props;

    if (!runResult) {
      return null;
    }

    return (
      <iframe
        id={this.state.counter}
        key={this.state.counter}
        className="html-output"
        style={{ display: "flex", height: "92vh" }}
        srcDoc={`<html><head>
        <style>html,body: {margin:0, width:100%}</style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.sound.min.js"></script>
        </head><body><script type="text/javascript">${runResult}</script></body></html>`}
        src="about:blank"
        onLoad={e => {
          // console.log(e);
        }}
      />
    );
  };

  renderOutput = () => {
    const { language, runResult } = this.props;

    //if there's nothing to run, don't render an output
    if (!runResult || !runResult.length) {
      return null;
    }
    switch (language) {
      case PROCESSING:
        return this.renderProcessingOutput();
      case JAVASCRIPT:
      case CPP:
      case PYTHON:
        return this.renderPythonOutput();
      case JAVA:
      case HTML:
      default:
        return this.renderHTMLOutput();
    }
  };

  render() {
    return (
      <div className="editor-output">
        <div className="editor-header">
          <div style={{ flex: "1 1 auto" }}> </div>
          <div
            className="editor-run"
            onClick={() => {
              // console.log("clear output");
            }}
          >
            <button
              className="editor-run-button"
              style={{ backgroundColor: "#3c52ba" }}
              onClick={this.reRenderOutput}
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="editor-output-content">{this.renderOutput()}</div>
      </div>
    );
  }
}

export default Output;
