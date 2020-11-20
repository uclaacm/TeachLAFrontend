export default class CodeDownloader {
  static download = (name, language, code) => {
    const extension = `.${language.extension || "txt"}`;

    // taken from this: https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
    const element = document.createElement("a");
    const file = new Blob([language.renderDownload(code, true)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = name + extension;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
}
