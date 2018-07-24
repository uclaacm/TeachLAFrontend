import SHA256 from 'crypto-js/sha256'
import { DEFAULT_MODE, SUPPORTED_LANGUAGES, MODE_MAP,
         CPLUS_PLUS, JAVA, JAVASCRIPT, PYTHON, PROCESSING, HTML} from './index.js'
import Program from './Program.js'

/**
 * generateID - gets a cryptographically secure random value, combines this with
 * now's date, and uses that as a seed to generate an ID
 * @return {String} SHA256 generated string id
 */
export function generateID(){
  let arr = new Uint32Array(1)
  window.crypto.getRandomValues(arr)
  return SHA256(String(Date.now()) + String(arr[0].toString())).toString()
}

/**
 * nameToMode - function converts the presentation name in the language selector dropdown to the mode string used by CodeMirror
 *    example: nameToMode("C++") returns "text/x-csrc"
 *    @todo add more languages/add all of them
 *  @param {string} name - the presentation name (the name seen in the language selector dropdown)
 *  @return {string} - mode used by CodeMirror for syntax highlighting (if there is no conversion, defaults to constant)
 */
export function nameToMode(name){
  name = name ? name.toLowerCase(): null
  const conversion={
    "python":MODE_MAP[PYTHON],
    "javascript":MODE_MAP[JAVASCRIPT],
    "c++":MODE_MAP[CPLUS_PLUS],
    "java":MODE_MAP[JAVA],
    "html":MODE_MAP[HTML],
    "processing":MODE_MAP[PROCESSING],
  }

  return conversion[name] || DEFAULT_MODE   //if there's no conversion, use the DEFAULT_MODE
}

/**
 * validID - checks whether an ID for an editor window has a corresponding editor window that exists
 * @param  {String} id    - the id of the editor window to check
 * @param  {Redux Store State} state - the full redux store state
 * @return {Boolean}       whether the ID describes an existing editor window
 */
export function validID(id, state){
  if(!state.app.textEditorReducers.editors){
    return false
  }
  if(state.app.textEditorReducers.editors.get(id)){
    return true
  }
  return false
}

/**
 * supportedLanguage - returns whether the language string passed in is supported/will work
 * @param  {String} language - must be a language as in SUPPORTED_LANGUAGES in index.js of constants folder
 * @return {Boolean} whether the language is valid to use with this web app
 */
export function supportedLanguage(language){
  if(SUPPORTED_LANGUAGES.indexOf(language) != -1){
    return true
  }
  return false
}

/**
 * collectionToProgramMap - turns a collection of user programs taken from firestore and turns this into a new Map
 * of program objects
 * @param  {firestore.CollectionRef} collection - the collection in firestore that represents
 * all of a user's programs.
 * @return {Map} a map of the user programs with the following format [key: program.title, value: program]
 * This Map representation is likely to change/deprecate as we shift towards using unique IDs to represent
 * sketches
 */
export function collectionToProgramMap(collection){
  if(collection){
    collection.get().then(function(queryResult){
      let programMap = new Map()
      queryResult.docs.forEach(function(doc){
        let program = new Program(doc)
        if(program.valid){
          programMap.set(program.title, program)
        }
      })
      return programMap
    })
  }
}

/**
 * progToDoc - takes in a program object and returns the firestore document corresponding
 * to that program
 * @param  {Program} program - the program object to fetch a corresponding to
 * a document in firestore
 * @param  {firestore.CollectionRef} userDocuments
 * @return {firestore.DocumentRef}   the firestore document used to store state of this program
 */
export function progToDoc(program, userDocuments){
  let userDoc = userDocuments.doc(program.language)
  return userDoc
}
