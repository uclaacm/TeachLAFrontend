//TODO: Break up large constants file into smaller constants file

const PYTHON = "python";
const JAVASCRIPT = "javascript";
const HTML = "html";
const JAVA = "java";
const PROCESSING = "processing";
const CPP = "c++";

const SUPPORTED_LANGUAGES = [PYTHON, JAVASCRIPT, HTML, PROCESSING];

//used for syntax highlighting in editor
let CODEMIRROR_CONVERSIONS = {};

//for each s
SUPPORTED_LANGUAGES.forEach(lang => {
  switch (lang) {
    case PYTHON:
      return (CODEMIRROR_CONVERSIONS[lang] = "python");
    case JAVASCRIPT:
      return (CODEMIRROR_CONVERSIONS[lang] = "javascript");
    case HTML:
      return (CODEMIRROR_CONVERSIONS[lang] = "htmlmixed");
    case JAVA:
      return (CODEMIRROR_CONVERSIONS[lang] = "text/x-java");
    case PROCESSING:
      return (CODEMIRROR_CONVERSIONS[lang] = "javascript");
    case CPP:
      return (CODEMIRROR_CONVERSIONS[lang] = "text/x-csrc");
    default:
      console.error("SUPPORTED LANGUAGE WITH NO MODE");
  }
});

module.exports = {
  //Language definitions
  PYTHON,
  JAVASCRIPT,
  HTML,
  JAVA,
  PROCESSING,
  CPP,

  //Server definitions
  SERVER_URL: "http://localhost:8081",

  //User value constants
  MINIMUM_USERNAME_LENGTH: 6,
  MINIMUM_PASSWORD_LENGTH: 6,
  MINIMUM_DISPLAY_NAME_LENGTH: 1,
  MAXIMUM_USERNAME_LENGTH: 20,
  MAXIMUM_PASSWORD_LENGTH: 20,
  MAXIMUM_DISPLAY_NAME_LENGTH: 25,

  //Defaults
  DEFAULT_MODE: PYTHON,
  DEFAULT_LANG: PYTHON,

  // UI constants
  RING_LOADER_SIZE: 50,

  //codemirror conversions
  CODEMIRROR_CONVERSIONS,

  //Firebase constants
  EMAIL_DOMAIN_NAME: "@fake.com",
};
