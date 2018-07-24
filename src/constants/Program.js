import {PROGRAM_FIELDS} from './index'

/**
 * Program - constructor for the standard Program object.  Program is what is stored in editor window instances
 * , conveniently providing an encapsulated source of information to find out the language, code, title, and
 * other relevant details converted in format from a firestore document.  Only the redux store and redux actions
 * are aware of firestore. Firestore logic is kept out of application level work by the Program abstraction.
 * NOTE: To convert a Program object to a firestore document, see progToDoc in helpers.js
 * TODO/NOTE: Functionality will be added to the Program constructor to allow it to handle no parameters,
 * making the valid field deprecated
 * @param       {firebase.firestore.DocumentReference} doc
 * @constructor
 */
export default function Program(doc){
  if(doc && doc.exists){
    let data = doc.data()
    PROGRAM_FIELDS.forEach((fieldType, fieldName) => {
      this[fieldName] = data[fieldName]
    })
    this.valid = true
  }
  else{
    this.valid = false
  }
}
