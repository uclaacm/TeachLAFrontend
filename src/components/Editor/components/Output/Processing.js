const getProcessingSrcDocLoggingScript = code => `
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
          a.style.display = "block"
          a.innerHTML = a.innerHTML + message + "<br/>";
        }
      };

      window.onerror = (err)=>console.log("<p style='color:#be4040'>" + err + "</p>")

      console.error = console.debug = console.info = console.log;

      ${code}
    </script>
  `;

const getProcessingSrcDocBody = (code, showConsole) => `
    <body>
      ${showConsole ? `<div id="console"></div>` : `<div id="console" style="display:none;"></div>`}
      ${getProcessingSrcDocLoggingScript(code)}
    </body>
  `;

const getProcessingSrcDocHead = () => `
    <head>
        <style>html,body: {margin:0, width:100%}</style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.sound.min.js"></script>
        <style>
          #console{  width: 100%; color:#0f0; height:200px; background-color:#333; overflow:auto; margin: 10px 0px; }
        </style>
    </head>
  `;

export default function(code, showConsole) {
  return `<html> ${getProcessingSrcDocHead()} ${getProcessingSrcDocBody(code, showConsole)}</html>`;
}
