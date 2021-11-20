export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export function loadUserData(uid, userData) {
  // add uid to the userData object
  return { type: LOAD_USER_DATA, userData: { ...userData, uid } };
}

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export function clearUserData() {
  return { type: CLEAR_USER_DATA };
}

export const LOAD_FAILURE = 'LOAD_FAILURE';
export function loadFailure(err) {
  return { type: LOAD_FAILURE, waiting: false, message: err };
}

export const SET_DISPLAY_NAME = 'SET_DISPLAY_NAME';
export function setDisplayName(displayName) {
  return { type: SET_DISPLAY_NAME, value: displayName };
}

export const REQUEST_DATA_UPLOAD = 'REQUEST_DATA_UPLOAD';
export function requestDataUpload(packet) {
  return { type: REQUEST_DATA_UPLOAD, packet };
}

export const REQUEST_PROGRAM_LOAD = 'REQUEST_PROGRAM_LOAD';
export function requestProgramLoad(collection) {
  return { type: REQUEST_PROGRAM_LOAD, programs: collection };
}

export const PROGRAM_LOAD_FAILURE = 'PROGRAM_LOAD_FAILURE';
export function programLoadFailure(error) {
  return { type: PROGRAM_LOAD_FAILURE, error };
}

export const PROGRAM_UPLOAD_SUCCESS = 'PROGRAM_UPLOAD_SUCCESS';
export function programUploadSuccess() {
  return { type: PROGRAM_UPLOAD_SUCCESS };
}

export const PROGRAM_LOAD_SUCCESS = 'PROGRAM_LOAD_SUCCESS';
export function programLoadSuccess() {
  return { type: PROGRAM_LOAD_SUCCESS };
}

export const PROGRAM_UPLOAD_FAILURE = 'PROGRAM_UPLOAD_FAILURE';
export function programUploadFailure(error) {
  return { type: PROGRAM_UPLOAD_FAILURE, message: error.message };
}

export const SET_MOST_RECENT_PROGRAM = 'SET_MOST_RECENT_PROGRAM';
export function setMostRecentProgram(program) {
  return { type: SET_MOST_RECENT_PROGRAM, value: program };
}

export const SET_PHOTO_NAME = 'SET_PHOTO_NAME';
export function setPhotoName(photoName) {
  return { type: SET_PHOTO_NAME, photoName };
}

export const SET_CURRENT_CLASS = 'SET_CURRENT_CLASS';
export function setCurrentClass(cid) {
  return { type: SET_CURRENT_CLASS, value: cid };
}

// /**
//  * dataUpload - attempts to upload program of data into firestore to persist it.
//  * @param  {[type]} program - the program to upload
//  * @param  {[type]} id     [description]
//  * @return {[type]}        [description]
//  */
// export function programUpload(program, id){
//   return (dispatch, getState) => {
//     let program = getState().textEditor.editors.get(id).program
//     let doc = progToDoc(program, getState().userData.programs)
//     // if there is already a firestore document corresponding to this program, update it
//     // otherwise, we need to create a new document remotely in firestore to store this data
//     doc.get().then(function(docSnapshot){
//       if(docSnapshot && docSnapshot.exists){
//         dispatch(requestDataUpload(program))
//         // merge: true makes it so that the document update is merged with any existing document data,
//         // but the document the new data is merged into does not have to exist
//         doc.set(Object.assign({}, program), {merge: true}).then(function(){
//           dispatch(programUploadSuccess())
//         }).catch(function(error){
//           console.error(error.message)
//           dispatch(programUploadFailure(error))
//         })
//       }
//     })
//   }
// }

// export function getMostRecentProgram(){
//   return (dispatch, getState) => {
//     let programs = getState().userData.programs
//     //if for some reason we get no programs back, send back an invalid documnet
//     if(!programs){
//       return new Promise((resolve, reject) =>{
//         resolve(new Program())
//       })
//     }
//     return new Promise(async (resolve, reject) => {

//       programs.orderBy(MODIFICATION_DATE, DESCENDING).limit(1).get().then((queryResult) => {
//         if(queryResult && queryResult.docs[0]){
//           let doc = queryResult.docs[0]
//           resolve(new Program(doc))
//         } else {
//           resolve(new Program())
//         }
//       }).catch(function(err){
//         reject(err)
//       })
//     })
//   }
// }
