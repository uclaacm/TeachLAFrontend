import { CPP, JAVA, JAVASCRIPT, PYTHON, PROCESSING, HTML } from "./index.js";

export const languageToDisplay = lang => {
  switch (lang) {
    case JAVA:
      return "Java";
    case PYTHON:
      return "Python";
    case PROCESSING:
      return "Processing";
    case JAVASCRIPT:
      return "Javascript";
    case HTML:
      return "HTML";
    case CPP:
      return "C++";
    default:
      return "";
  }
};
