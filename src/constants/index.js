// TODO: Break up large constants file into smaller constants file

const PYTHON = "python"
const JAVASCRIPT = "javascript"
const HTML = "html"
const JAVA = "java"
const PROCESSING = "processing"
const CPP = "c++"

const SUPPORTED_LANGUAGES = [PYTHON, JAVASCRIPT, HTML, JAVA, PROCESSING, CPP]

let DEFAULT_LANGUAGE_PROGRAMS = {}
SUPPORTED_LANGUAGES.forEach(lang=> {
  switch(lang){
    case PYTHON:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = "import turtle\n\nt = turtle.Turtle()\n\nt.color('red')\nt.forward(75)\nt.left(90)\n\n\nt.color('blue')\nt.forward(75)\nt.left(90)\n"
      break
     case JAVASCRIPT:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = 'console.log("Hello World!")'
      break
    case HTML:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = "<html>\n  <head>\n  </head>\n  <body>\n    <div style='width: 100px; height: 100px; background-color: black'>\n    </div>\n  </body>\n</html>"
      break
    case JAVA:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = 'System.out.println("Hello World!")'
      break
    case PROCESSING:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = "function setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(220);\n  ellipse(mouseX, mouseY, 100, 100);\n}"
      break
    default:
      DEFAULT_LANGUAGE_PROGRAMS[lang] = ""
  }
})

const DEFAULT_PROGRAMS_STATE = {

}

module.exports = {
    SERVER_URL:'http://localhost:8081',
    MINIMUM_USERNAME_LENGTH: 6,
    MINIMUM_PASSWORD_LENGTH: 6,
    MINIMUM_DISPLAY_NAME_LENGTH: 1,
    MAXIMUM_USERNAME_LENGTH: 20,
    MAXIMUM_PASSWORD_LENGTH: 20,
    MAXIMUM_DISPLAY_NAME_LENGTH: 25,
    DEFAULT_MODE: "python",
    DEFAULT_LANG: "Python",
    /* FIRESTORE/DB */
    DESCENDING: "desc",
    LANGUAGE: "language",
    MODIFICATION_DATE: "lastModified",
    CREATION_DATE: "creationDate",
    CODE: "code",
    PROGRAM_PATH: "programs",
    PROGRAM_FIELDS: new Map([["code", typeof(String)], ["language", typeof(String)], ["title", typeof(String)], ["creationDate", typeof(Date)], ["lastModified", typeof(Date)]]),
    /* UI */
    RING_LOADER_SIZE: 50,
    /* LANGUAGE DEFINITIONS */
    PYTHON: "python",
    JAVA: "java",
    HTML: "html",
    PROCESSING: "processing",
    JAVASCRIPT: "javascript",
    // CPLUS_PLUS: "C++",
    MODE_MAP: Object.freeze({"C++":"text/x-csrc", "Python":"python", "Java":"text/x-java", "HTML":"htmlmixed", "Processing":"javascript", "Javascript":"javascript",}),
    EMAIL_DOMAIN_NAME: "@fake.com",
    DEFAULT_LANGUAGE_PROGRAMS: {
        "Python": "import turtle\n\nt = turtle.Turtle()\n\nt.color('red')\nt.forward(75)\nt.left(90)\n\n\nt.color('blue')\nt.forward(75)\nt.left(90)\n",
        "Javascript": 'console.log("Hello World!")',
        "Java": 'System.out.println("Hello World!")',
        "HTML": "<html>\n  <head>\n  </head>\n  <body>\n    <div style='width: 100px; height: 100px; background-color: black'>\n    </div>\n  </body>\n</html>",
        "C++": 'std::cout << "Hello World!" << std::endl',
        "Processing": "function setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(220);\n  ellipse(mouseX, mouseY, 100, 100);\n}",
    },
    DEFAULT_USER_PROGRAMS: {
      
    }

}
