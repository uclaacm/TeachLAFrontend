import Sk from 'skulpt';

Sk.externalLibraries = {
    turtle: {
        path: "/src/util/languages/turtle.js"
    }
};

console.log(`sk: ${Sk.TurtleGraphics}`)

/*
const getPythonSrcDocHead = () => `
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script>
  <script src="https://cdn.rawgit.com/skulpt/skulpt-dist/1.1.0/skulpt.min.js" type="text/javascript"></script>
  <script src="https://cdn.rawgit.com/skulpt/skulpt-dist/1.1.0/skulpt-stdlib.js" type="text/javascript"></script>
  <style> 
    * { box-sizing: border-box }
    html, body { margin:0}
  </style>
</head>
`;

const getPythonSrcDocSkulptScript = (code) => `
  <script type="text/javascript">
    var received = false;
    function outf(text) {
        var mypre = document.getElementById("inner");
        console.log(text)
        if (text != "\\n") {
          received = true
        } else if (received == true) {
          received = false
        } else {
          received = true
        }
        if(received){
          mypre.value = mypre.value + "> " + text + "\\n";
        }
        if(mypre.scrollTop >= (mypre.scrollHeight - mypre.offsetHeight) - mypre.offsetHeight){
          mypre.scrollTop = mypre.scrollHeight
        }
    }

    function closeConsole(){
      var mypre = document.getElementById("inner");
      mypre.style.display = "none"
    }

    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    }

    function runit() {
        
    }
  </script>
`;

const getPythonSrcDocBody = (code, showConsole) => `
    <body onload="runit()">
      ${getPythonSrcDocSkulptScript(code)}
      ${showConsole ? '<div id="output"> </div>' : '<div id="output" style="display:none;"> </div>'}
      <div id="mycanvas"></div>
    </body>
  `;
  */

export default function (code, showConsole) {
  console.log(code);
  var prog = atob(code);
  // console.log(prog)
  //if you want to debug, you can uncomment this console log to see the code being run
  //console.log(prog)
  var mypre = document.getElementById("output");
  // mypre.innerHTML = '<div id="inner"><div id="closeConsoleButton" onclick="closeConsole()" title="Hide Console">X</div></div>';
  
  function outf(text) {
    var mypre = document.getElementById("inner");
    console.log("printing text");
    console.log(text)
    var received;
    if (text != "\\n") {
      received = true
    } else if (received == true) {
      received = false
    } else {
      received = true
    }
    if(received){
      mypre.value = mypre.value + "> " + text;
    }
    if(mypre.scrollTop >= (mypre.scrollHeight - mypre.offsetHeight) - mypre.offsetHeight){
      mypre.scrollTop = mypre.scrollHeight
    }
  }
  function closeConsole(){
    var mypre = document.getElementById("inner");
    mypre.style.display = "none"
  }

  function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
      throw "File not found: '" + x + "'";
    }
    return Sk.builtinFiles["files"][x];
  } 
  Sk.pre = "output";
  Sk.configure({output:outf, read:builtinRead, __future__: Sk.python3});
  (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'my-canvas';
  var myPromise = Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, prog, true);
  });
  myPromise.then(function(mod) {
      //console.log('success');
  },
  function(err) {
      console.log(err.toString());
      let b = document.getElementById("output")
      if(b){
        console.log("output found")
        b.style.display = "block"
      }
      let a = document.getElementById("inner")
      a.value += '\nERROR: ' + err.toString()
  });
  // return `<html> ${getPythonSrcDocHead()} ${getPythonSrcDocBody(code, showConsole)} </html>`;
}
