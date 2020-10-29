import ProcessingConstructor from "../../components/Output/Processing";
import ReactConstructor from "../../components/Output/React";
import { PYTHON, REACT, HTML, PROCESSING } from "../../constants";

export default class CodeDownloader {
  static download = (name, language, code) => {
    let extension = ".";
    switch (language) {
      case PYTHON:
        extension += "py";
        break;
      case PROCESSING: // this is because we construct the processing result as an HTML file. jank.
      case REACT: // same here
      case HTML:
        extension += "html";
        break;
      default:
        extension += "txt";
    }
    // taken from this: https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
    const element = document.createElement("a");
    let file;
    switch (language) {
      case PROCESSING:
        file = new Blob([ProcessingConstructor(code, true)], { type: "text/plain" });
        break;
      case REACT:
        file = new Blob([ReactConstructor(code, true)], { type: "text/plain" });
        break;
      default:
        file = new Blob([code], { type: "text/plain" });
    }
    element.href = URL.createObjectURL(file);
    element.download = name + extension;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
}
