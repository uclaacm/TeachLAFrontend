import Sk from 'skulpt';

export default function CreatePythonDoc(prog) {
  function outf(text) {
    const mypre = document.getElementById('inner');
    let received;
    if (text !== '\\n') {
      received = true;
    } else if (received) {
      received = false;
    } else {
      received = true;
    }
    if (received) {
      mypre.value += `> ${text}`;
    }
    if (mypre.scrollTop >= mypre.scrollHeight - mypre.offsetHeight - mypre.offsetHeight) {
      mypre.scrollTop = mypre.scrollHeight;
    }
  }

  function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) {
      throw Error(`File not found: '${x}'`);
    }
    return Sk.builtinFiles.files[x];
  }
  Sk.pre = 'output';
  Sk.configure({ output: outf, read: builtinRead, __future__: Sk.python3 });
  (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'my-canvas';
  const myPromise = Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, prog, true));
  myPromise.then(
    () => {},
    // without this, the error function below gets called
    // when the program is successful
    (err) => {
      const b = document.getElementById('output');
      if (b) {
        b.style.display = 'block';
      }
      const a = document.getElementById('inner');
      a.value += `\nERROR: ${err.toString()}`;
    },
  );
}
