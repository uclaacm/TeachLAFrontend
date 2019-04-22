import * as sanitize from "sanitize-html";

const getPythonSrcDocHead = () => `
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script>
  <script src="https://cdn.rawgit.com/skulpt/skulpt-dist/0.11.0/skulpt.min.js" type="text/javascript"></script>
  <script src="https://cdn.rawgit.com/skulpt/skulpt-dist/0.11.0/skulpt-stdlib.js" type="text/javascript"></script>
  <style> html, body { margin:0; background-color: #585166;}
          #inner { height:100px; background-color:#333; color:#0F0;word-wrap:break-word; overflow:auto; margin: 10px auto; position:relative; padding: 10px 35px 10px 10px;}
          #output { margin: 0px 10px; display: block; position: relative;}
          #mycanvas { margin: 10px; }
          #closeConsoleButton { position: fixed; top: 20px; right: 30px; color: #ddd;}
          canvas { border: 1px solid black; }
  </style>
</head>
`;

const getPythonSrcDocSkulptScript = () => `
  <script type="text/javascript">
    var received = false;
    function outf(text) {
        var mypre = document.getElementById("inner");
        if(!received)
         mypre.innerHTML = mypre.innerHTML + "><span>&nbsp</span>" + text + "<br>";
        received = !received
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
        var prog = document.getElementById("runResult").innerHTML  ;
        //if you want to debug, you can uncomment this console log to see the code being run
        //console.log(prog)
        var mypre = document.getElementById("output");
        // mypre.innerHTML = '<div id="inner"><div id="closeConsoleButton" onclick="closeConsole()" title="Hide Console">X</div></div>';
        mypre.innerHTML = '<div id="inner"></div>';
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
            let a = document.getElementById("inner")
            // a.style.display = "block"
            a.innerHTML += '<span style="color: #be4040">' + err.toString() + '</span>'
        });
    }
  </script>
`;

const getPythonSrcDocBody = (code, showConsole) => {
  return `
    <body onload="runit()">
      ${getPythonSrcDocSkulptScript()}
      ${showConsole ? `<div id="output"> </div>` : `<div id="output" style="display:none;"> </div>`}
      <div id="mycanvas"></div>
      <div style="display:none;" id="runResult">${code}</div>
    </body>
  `;
};

export default function(code, showConsole) {
  return `<html> ${getPythonSrcDocHead()} ${getPythonSrcDocBody(
    sanitize(code),
    showConsole,
  )} </html>`;
}
