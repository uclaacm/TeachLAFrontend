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
        className="editor-output-iframe"
        style={{ height: this.props.height - 61 + "px" }}
        srcDoc={this.props.runResult}
        src="about:blank"
        onLoad={e => {
          // console.log(e);
        }}
      />
    );
  };

  getPythonSrcDocHead = () => (`
    <head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script>
      <script src="https://cdn.rawgit.com/skulpt/skulpt-dist/0.11.0/skulpt.min.js" type="text/javascript"></script>
      <script src="https://cdn.rawgit.com/skulpt/skulpt-dist/0.11.0/skulpt-stdlib.js" type="text/javascript"></script>
      <style> html, body { margin:0; background-color: #585166;}
              #output { width:97%; height:100px; background-color:#333; color:#0F0;word-wrap:break-word; overflow:auto; margin: 10px auto;}
              #mycanvas { margin: 10px; }}
      </style>
    </head>
  `)

  getPythonSrcDocSkulptScript = () => (`
    <script type="text/javascript">
      function outf(text) { 
          var mypre = document.getElementById("output"); 
          mypre.innerHTML = mypre.innerHTML + text; 
      } 

      function builtinRead(x) {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                  throw "File not found: '" + x + "'";
          return Sk.builtinFiles["files"][x];
      }

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
              let a =document.getElementById("output")
              a.innerHTML = '<span style="color: #be4040">' + err.toString() + '</span>'
          });
      } 
    </script> 
  `)

  getPythonSrcDocBody = () => {
    const { runResult } = this.props;

    return `
      <body onload="runit()"> 
        ${this.getPythonSrcDocSkulptScript()}
        <pre id="output"></pre> 
        <div id="mycanvas"></div>
        <div style="display:none;" id="runResult">${runResult}</div>
      </body> 
    ` 
  }

  getPythonSrcDoc = () => {
    return `<html> ${this.getPythonSrcDocHead()} ${this.getPythonSrcDocBody()} </html>`
  }

  renderPythonOutput = () => {
    let { runResult } = this.props;

    if (!runResult) {
      return null;
    }


    //about: blank makes it so that the clear button will clear the html appropriately when pressed.
    //Otherwise, old content persists.
    return (
      <iframe
        id={this.state.counter}
        key={this.state.counter}
        className="editor-output-iframe"
        style={{ height: this.props.height - 61 + "px" }}
        srcDoc={this.getPythonSrcDoc()}
        src="about:blank"
        onLoad={e => {
          // console.log(e);
        }}
      />
    );
  };

  getProcessingSrcDocLoggingScript = () => (`
      <script type="text/javascript">
        if (typeof console  != "undefined") 
          if (typeof console.log != 'undefined')
            console.olog = console.log;
          else
            console.olog = function() {};

        console.log = (message) => {
          console.olog(message);
          let a = document.getElementById("console")
          if(a){
            let a = document.getElementById("console")
            a.innerHTML = a.innerHTML + message + "<br/>";
          }
        };

        window.onerror = (err)=>console.log("<p style='color:#be4040'>" + err + "</p>")

        console.error = console.debug = console.info = console.log;
        
        ${this.props.runResult}
      </script>
    `)

  getProcessingSrcDocBody = () => (`
      <body>
        <div id="console"></div>
        ${this.getProcessingSrcDocLoggingScript()}
      </body>
    `)

  getProcessingSrcDocHead = () => (`
    <head>
        <style>html,body: {margin:0, width:100%}</style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.sound.min.js"></script>
        <style>
          #console{  width: 100%; color:#0f0; height:200px; background-color:#333; overflow:auto; margin: 10px 0px; }
        </style>
    </head>
  `)

  getProcessingSrcDoc = () => (`<html> ${this.getProcessingSrcDocHead()} ${this.getProcessingSrcDocBody()}</html>`)

  renderProcessingOutput = () => {
    const { runResult } = this.props;

    if (!runResult) {
      return null;
    }

    return (
      <iframe
        id={this.state.counter}
        key={this.state.counter}
        className="editor-output-iframe"
        style={{ height: this.props.height - 61 + "px" }}
        srcDoc={this.getProcessingSrcDoc()}
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

  renderRefreshButton = () => (
    <div className="editor-run">
      <button
        className="editor-run-button"
        style={{ backgroundColor: "#3c52ba" }}
        onClick={this.reRenderOutput}
      >
        Refresh
      </button>
    </div>
  )

  renderBanner = () => (
    <div className="editor-output-banner">
      <div style={{ flex: "1 1 auto" }}> </div>
      {this.renderRefreshButton()}
    </div>
  )

  render() {
    return (
      <div className="editor-output">
        {this.renderBanner()}
        <div>{this.renderOutput()}</div>
      </div>
    );
  }
}

export default Output;
