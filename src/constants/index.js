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
  //Local Server
  SERVER_URL: "http://localhost:8081",
  //Heroku Server
  // SERVER_URL: "https://teach-la-backend.herokuapp.com",
  // Heroku URL: "https://teach-la-backend.herokuapp.com"
  //DEV URL: "http://localhost:8081"

  //User value constants
  MINIMUM_USERNAME_LENGTH: 6,
  MINIMUM_PASSWORD_LENGTH: 6,
  MINIMUM_DISPLAY_NAME_LENGTH: 1,
  MAXIMUM_USERNAME_LENGTH: 20,
  MAXIMUM_PASSWORD_LENGTH: 20,
  MAXIMUM_DISPLAY_NAME_LENGTH: 25,

  // Profile picture constants
  PROFILE_IMG_1: "bananaleaf",
  PROFILE_IMG_2: "elephant",
  PROFILE_IMG_3: "flower",
  PROFILE_IMG_4: "apple",
  PROFILE_IMG_5: "hotdog",
  PROFILE_IMG_6: "icecream",
  PROFILE_IMG_7: "cloud",
  PROFILE_IMG_8: "earth",
  PROFILE_IMG_9: "heart",

  PROFILE_IMG_1_URL:
    "https://www.pngkey.com/png/detail/8-88141_88-banana-leaf-png-tropical-banana-leaves-png.png",
  PROFILE_IMG_2_URL:
    "https://www.pngkey.com/png/detail/65-654139_vector-royalty-free-library-elephant-cute-clipart-elephant.png",
  PROFILE_IMG_3_URL:
    "https://www.pngkey.com/png/detail/0-4694_flower-watercolor-painting-clip-art-transparent-watercolor-flower.png",
  PROFILE_IMG_4_URL: "https://i.imgur.com/5S83eug.png",
  PROFILE_IMG_5_URL: "https://i.imgur.com/CWwlIOF.png",
  PROFILE_IMG_6_URL: "https://i.imgur.com/OBHz5An.png",
  PROFILE_IMG_7_URL: "https://i.imgur.com/Cw6IRTu.png",
  PROFILE_IMG_8_URL: "https://i.imgur.com/SBlnUnG.png",
  PROFILE_IMG_9_URL: "https://i.imgur.com/ySz1WAS.png",
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
