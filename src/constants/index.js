// TODO: Break up large constants file into smaller constants file

const PYTHON = "python"
const JAVASCRIPT = "javascript"
const HTML = "html"
const JAVA = "java"
const PROCESSING = "processing"
const CPP = "c++"

const SUPPORTED_LANGUAGES = [PYTHON, JAVASCRIPT, HTML, PROCESSING]

let DEFAULT_LANGUAGE_PROGRAMS = {}

//used for syntax highlighting in editor
let CODEMIRROR_CONVERSIONS = {}

SUPPORTED_LANGUAGES.forEach(lang=> {
  switch(lang){
    case PYTHON:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = {
        code: "import turtle\n\nt = turtle.Turtle()\n\nt.color('red')\nt.forward(75)\nt.left(90)\n\n\nt.color('blue')\nt.forward(75)\nt.left(90)\n",
        language: lang,
      }
      CODEMIRROR_CONVERSIONS[lang] = "python"
      break
     case JAVASCRIPT:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = {
        code: 'console.log("Hello World!")',
        language: lang,
      }
      CODEMIRROR_CONVERSIONS[lang] = "javascript"
      break
    case HTML:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = {
        code: "<html>\n  <head>\n  </head>\n  <body>\n    <div style='width: 100px; height: 100px; background-color: black'>\n    </div>\n  </body>\n</html>",
        language: lang,
      }
      CODEMIRROR_CONVERSIONS[lang] = 'htmlmixed'
      break
    case JAVA:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = {
        code: 'System.out.println("Hello World!")',
        language: lang,
      }
      CODEMIRROR_CONVERSIONS[lang] = 'text/x-java'
      break
    case PROCESSING:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = {
        code: "function setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(220);\n  ellipse(mouseX, mouseY, 100, 100);\n}",
        language: lang,
      }
      CODEMIRROR_CONVERSIONS[lang] = 'javascript'
      break
    case CPP:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = {
        code: 'std::cout << "Hello World!" << std::endl',
        language: lang,
      }
      CODEMIRROR_CONVERSIONS[lang] = 'text/x-csrc'
      break
    default:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = {
        code: "",
        language: PYTHON,
      }
  }
})

module.exports = {
    //Language definitions
    PYTHON,
    JAVASCRIPT,
    HTML,
    JAVA,
    PROCESSING,
    CPP,
    //Server definitions
    SERVER_URL:'http://localhost:8081',
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
    DEFAULT_LANGUAGE_PROGRAMS,
    // UI constants
    RING_LOADER_SIZE: 50,
    //codemirror conversions
    CODEMIRROR_CONVERSIONS,
    //Firebase constants
    EMAIL_DOMAIN_NAME: "@fake.com",
}
