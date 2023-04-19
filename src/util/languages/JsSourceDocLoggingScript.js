export default function getJsSrcDocLoggingScript() {
  return `
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
}
