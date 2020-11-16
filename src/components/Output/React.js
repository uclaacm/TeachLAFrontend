import { getJsSrcDocLoggingScript } from "./constants";

const getReactSrcDocHead = () => `
    <head>
        <style>html,body: {margin:0, width:100%}</style>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
        <script src="https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js" crossorigin="anonymous"></script>
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
          #output {
            display: block;
            position: relative;
            background: white;
            min-height: 70vh;
            padding: 10px 35px 10px 10px;
          }
          #closeConsoleButton { position: fixed; top: 20px; right: 30px; color: #ddd;}
        </style>
    </head>
  `;

const getUserScript = (code) => `
  <script type="text/babel">
    ${code}
    ReactDOM.render(
      <App />,
      document.getElementById('output'),
    );
  </script>
`;

const getReactSrcDocBody = (code, showConsole) => `
    <body>
      ${
        showConsole
          ? `<div id="outer"><textarea id="inner"></textarea></div>`
          : `<div id="outer" style="display:none;"><textarea id="inner"></textarea></div>`
      }
      ${getJsSrcDocLoggingScript()}
      ${getUserScript(code)}
      <div id="output"></div>
    </body>
  `;

export default function (code, showConsole) {
  return `<html> ${getReactSrcDocHead()} ${getReactSrcDocBody(code, showConsole)}</html>`;
}
