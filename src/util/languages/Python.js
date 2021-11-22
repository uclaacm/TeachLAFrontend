import Sk from 'skulpt';

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
}
