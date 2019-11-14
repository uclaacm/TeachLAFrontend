import ProcessingConstructor from "../../components/Output/Processing";

export default class CodeDownloader {
  static download = (name, language, code) => {
    let extension = ".";
    switch (language) {
      case "python":
        extension += "py";
        break;
      case "processing": // this is because we construct the processing result as an HTML file. jank.
      case "html":
        extension += "html";
        break;
      default:
        extension += "txt";
    }
    // taken from this: https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
    const element = document.createElement("a");
    let file;
    if (language === "processing") {
      file = new Blob([ProcessingConstructor(code, true)], { type: "text/plain" });
    } else {
      file = new Blob([code], { type: "text/plain" });
    }
    element.href = URL.createObjectURL(file);
    element.download = name + extension;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
}
