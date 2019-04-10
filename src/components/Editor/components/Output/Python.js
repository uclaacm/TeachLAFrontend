const getPythonSrcDocHead = () => `
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script>
  <script src="https://cdn.rawgit.com/skulpt/skulpt-dist/0.11.0/skulpt.min.js" type="text/javascript"></script>
  <script src="https://cdn.rawgit.com/skulpt/skulpt-dist/0.11.0/skulpt-stdlib.js" type="text/javascript"></script>
  <style> html, body { margin:0; background-color: #585166;}
          #output { width:97%; height:100px; background-color:#333; color:#0F0;word-wrap:break-word; overflow:auto; margin: 10px auto;}
          #emptyOutput { width:97%; height:100px; background-color:#333; color:#0F0;word-wrap:break-word; overflow:auto; margin: 10px auto;}
          #mycanvas { margin: 10px; }
          canvas { border: 1px solid black; }
  </style>
</head>
`;

const getPythonSrcDocSkulptScript = () => `
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
            let a = document.getElementById("output")
            a.style.display = "block"
            a.innerHTML = '<span style="color: #be4040">' + err.toString() + '</span>'
        });
    }
  </script>
`;

const getPythonSrcDocBody = (code, showConsole) => {
  return `
    <body onload="runit()">
      ${getPythonSrcDocSkulptScript()}
      ${showConsole ? `<pre id="output"></pre>` : `<pre id="output" style="display:none;"></pre>`}
      <div id="mycanvas"></div>
      <div style="display:none;" id="runResult">${code}</div>
    </body>
  `;
};

export default function(code, showConsole) {
  return `<html> ${getPythonSrcDocHead()} ${getPythonSrcDocBody(code, showConsole)} </html>`;
}
