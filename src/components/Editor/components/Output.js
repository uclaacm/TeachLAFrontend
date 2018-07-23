import React from 'react'
 
/*
  Props:
    bgColor: string representing the color of the background of the img (can be hex color, rgb(r, g, b, a), or color name)
    textColor: string representing the color of the text in the button (can be hex color, rgb(r, g, b, a), or color name)
    imgSrc: string representing the location of the img used as the icon (can be in the form of URL, path location, or data representing image)
    textPadding: string representing padding to the left of the text, i.e. distance from the img (give px units)
*/

class Output extends React.Component {
  constructor(props){
    super(props)
  }

  renderHTMLOutput = () => {
    // html-output is an iframe canvas that displays html typed into the editor.  It only displays when html is the selected language
    //about: blank makes it so that the clear button will clear the html appropriately when pressed.  Otherwise, old content persists.
    const {runResult} = this.props
    if(!runResult){
      return null
    }

    return (
      <iframe className="html-output"
              style={{display: 'flex', height:"92vh"}}
              srcDoc={runResult}
              src='about:blank'
              onLoad={(e)=>{
                console.log(e)
              }}
      />
    )
  }

  renderProcessingOutput = () => {
    const {runResult} = this.props
    if(!runResult){
      return null
    }

    return (
      <iframe className="html-output"
              style={{display: 'flex', height:"92vh"}}
              srcDoc={`<html><head>
              <style>html,body: {margin:0, width:100%}
              <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.sound.min.js"></script>
              </head><body><script type="text/javascript">${runResult}</script></body></html>`}
              src='about:blank'
              onLoad={(e)=>{
                console.log(e)
              }}
      />
    )
  }

  renderOutput = () => {
    const {language, runResult} = this.props
    switch(language){
      case "Python":
      case "Processing":
        return this.renderProcessingOutput()
      case "Javascript":
      case "C++":
      case "Java":
      case "HTML":
      default:
        return this.renderHTMLOutput()
        return runResult
    }
  }

  render(){                                                          //called deconstruction; pulling children, triggerLogin, ..., textPadding out of props
    const {clearOutput} = this.props
    
    return (
      <div className="editor-output">
        <div className="editor-header">
          <div style={{flex:"1 1 auto"}}> </div>
          <div className="editor-run" onClick={clearOutput}>
              <button className="editor-run-button" style={{backgroundColor:"#ec4848"}}>
                  Clear
              </button>
          </div>
        </div>
        <div className="editor-output-content">
          {this.renderOutput()}
        </div>
      </div>
    )
  }
}
 
export default Output