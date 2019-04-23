const getProcessingSrcDocLoggingScript = code => `
    <script type="text/javascript">
      if (typeof console  != "undefined")
        if (typeof console.log != 'undefined')
          console.olog = console.log;
        else
          console.olog = function() {};

      console.log = (message) => {
        console.olog(message);
        let a = document.getElementById("inner")
        if(a){
          // a.style.display = "block"
          a.value = a.value + "> " + message + "\\n";
          if(a.scrollTop >= (a.scrollHeight - a.offsetHeight) - a.offsetHeight){
            a.scrollTop = a.scrollHeight
          }
        }
      };

      window.onerror = (err)=> {
        let a = document.getElementById("outer")
        if(a){
          a.style.display = "block"
        }
        console.log("\\n\\nERROR: " + err + "\\n")
      }

      console.error = console.debug = console.info = console.log;

      function closeConsole(){
        var mypre = document.getElementById("inner");
        mypre.style.display = "none"
      }
    </script>
  `;

const getUserScript = code => `
  <script type="text/javascript">
    ${code}
  </script>
`;

const getProcessingSrcDocBody = (code, showConsole) => `
    <body>
      ${
        showConsole
          ? `<div id="outer"><textarea id="inner"></textarea></div>`
          : `<div id="outer" style="display:none;"><textarea id="inner"></textarea></div>`
      }
      ${getProcessingSrcDocLoggingScript(code)}
      ${getUserScript(code)}
    </body>
  `;

const getProcessingSrcDocHead = () => `
    <head>
        <style>html,body: {margin:0, width:100%}</style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.sound.min.js"></script>
        <style>
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
          }
          #output { margin: 0px 10px; display: block; position: relative;}
          #closeConsoleButton { position: fixed; top: 20px; right: 30px; color: #ddd;}
        </style>
    </head>
  `;

export default function(code, showConsole) {
  return `<html> ${getProcessingSrcDocHead()} ${getProcessingSrcDocBody(code, showConsole)}</html>`;
}
