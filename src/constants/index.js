// TODO: Break up large constants file into smaller constants file

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
    PYTHON: "Python",
    JAVA: "Java",
    HTML: "HTML",
    PROCESSING: "Processing",
    JAVASCRIPT: "Javascript",
    // CPLUS_PLUS: "C++",
    MODE_MAP: Object.freeze({"C++":"text/x-csrc", "Python":"python", "Java":"text/x-java", "HTML":"htmlmixed", "Processing":"javascript", "Javascript":"javascript",}),
    SUPPORTED_LANGUAGES: Object.freeze(["Python", "Java", "HTML", "Processing", "Javascript"])

}
