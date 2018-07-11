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
    /* FIRESTORE/DB */
    DESCENDING: "desc",
    LANGUAGE: "language",
    MODIFICATION_DATE: "modificationDate",
    CREATION_DATE: "creationDate",
    CODE: "code",
    PROGRAM_PATH: "programs",
    /* UI */
    RING_LOADER_SIZE: 50
}
