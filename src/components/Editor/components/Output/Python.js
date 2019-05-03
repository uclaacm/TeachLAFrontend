const getPythonSrcDocHead = () => `
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script>
  <script src="https://cdn.rawgit.com/skulpt/skulpt-dist/0.11.0/skulpt.min.js" type="text/javascript"></script>
  <script src="https://cdn.rawgit.com/skulpt/skulpt-dist/0.11.0/skulpt-stdlib.js" type="text/javascript"></script>
  <style> html, body { margin:0; background-color: #585166;}
          #inner {
            height:100px;
            background-color:#222;
            color: #DDD;
            font-family: monospace;
            word-wrap:break-word;
            overflow:auto;
            margin: 10px auto;
            position:relative;
            padding: 10px 35px 10px 10px;
            width: 100%;
            box-sizing: border-box;         /* For IE and modern versions of Chrome */
            -moz-box-sizing: border-box;    /* For Firefox                          */
            -webkit-box-sizing: border-box; /* For Safari                           */
            resize: vertical;
          }
          #output { margin: 0px 10px; position: relative;}
          #mycanvas { margin: 10px; }
          #closeConsoleButton { position: fixed; top: 20px; right: 30px; color: #ddd;}
          canvas { border: 1px solid black; }
  </style>
</head>
`;

const getPythonSrcDocSkulptScript = code => `
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
        var prog = atob('${code}');
        // console.log(prog)
        //if you want to debug, you can uncomment this console log to see the code being run
        //console.log(prog)
        var mypre = document.getElementById("output");
        // mypre.innerHTML = '<div id="inner"><div id="closeConsoleButton" onclick="closeConsole()" title="Hide Console">X</div></div>';
        mypre.innerHTML = '<textarea id="inner" readonly></textarea>';
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
            let b = document.getElementById("output")
            if(b){
              console.log("output found")
              b.style.display = "block"
            }
            let a = document.getElementById("inner")
            a.value += '\\nERROR: ' + err.toString() + "\\n"
        });
    }
  </script>
`;

const getPythonSrcDocBody = (code, showConsole) => {
  return `
    <body onload="runit()">
      ${getPythonSrcDocSkulptScript(code)}
      ${showConsole ? `<div id="output"> </div>` : `<div id="output" style="display:none;"> </div>`}
      <div id="mycanvas"></div>
    </body>
  `;
};

export default function(code, showConsole) {
  return `<html> ${getPythonSrcDocHead()} ${getPythonSrcDocBody(code, showConsole)} </html>`;
}
