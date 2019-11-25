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

const PUBLIC_URL = process.env.PUBLIC_URL;
const PHOTO_NAMES = {
  lightbulb: `${PUBLIC_URL}/img/icons/lightbulb.png`,
  orange: `${PUBLIC_URL}/img/icons/orange.png`,
  pear: `${PUBLIC_URL}/img/icons/pear.png`,
  apple: `${PUBLIC_URL}/img/icons/apple.png`,
  hotdog: `${PUBLIC_URL}/img/icons/hotdog.png`,
  icecream: `${PUBLIC_URL}/img/icons/icecream.png`,
  cloud: `${PUBLIC_URL}/img/icons/cloud.png`,
  earth: `${PUBLIC_URL}/img/icons/earth.png`,
  heart: `${PUBLIC_URL}/img/icons/heart.png`,
};

// GH Repo for FE

const GH_REPO_NAME = "https://github.com/uclaacm/TeachLAFrontend";

// Router's base (i.e. anything after the domain)

const ROUTER_BASE_NAME = "/";

// Various Server URLs
var SERVER_URL = "http://localhost:8081";
if (process && process.env) {
  if (process.env.REACT_APP_SERVER_TYPE === "staging") {
    SERVER_URL = "https://teach-la-staging-backend.herokuapp.com";
  }
  if (process.env.REACT_APP_SERVER_TYPE === "prod") {
    SERVER_URL = "https://teach-la-backend.herokuapp.com";
  }
}

const PANEL_SIZE = 250;

module.exports = {
  //Language definitions
  PYTHON,
  JAVASCRIPT,
  HTML,
  JAVA,
  PROCESSING,
  CPP,

  // photo names
  PHOTO_NAMES,
  DEFAULT_PHOTO_NAME: "icecream",

  GH_REPO_NAME,

  // Router Base Name
  ROUTER_BASE_NAME,

  //Server Host Name
  SERVER_URL,

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
  PANEL_SIZE,
  CLOSED_PANEL_LEFT: -1 * PANEL_SIZE,
  OPEN_PANEL_LEFT: 0,

  //codemirror conversions
  CODEMIRROR_CONVERSIONS,

  //Firebase constants
  EMAIL_DOMAIN_NAME: "@fake.com",
};
