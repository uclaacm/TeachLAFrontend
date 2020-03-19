import { JAVASCRIPT, PYTHON, PROCESSING, HTML } from "./index.js";

/**
 * takes in a language enumerable "constant" and returns its associated string. returns the empty string by default
 * @param {ENUM} lang
 */

export const languageToDisplay = lang => {
  switch (lang) {
    case PYTHON:
      return "Python";
    case PROCESSING:
      return "Processing";
    case JAVASCRIPT:
      return "Javascript";
    case HTML:
      return "HTML";
    default:
      return "";
  }
};
