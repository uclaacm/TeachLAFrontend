import constants from "../constants";

export const getUserDataEndpoint = (uid = "", includePrograms = false) =>
  `${constants.SERVER_URL}/getUserData/${uid}${includePrograms ? "?programs=true" : ""}`;
/**---------getUserData--------
 * fetches object from server containg information about user at uid
 * includes users' programs in json if includePrograms is true
 * returned json will be of the form
 * {
 *   ok:    boolean that's true if no error occured in the server
 *   data:{
 *    userData: json of the users data such as displayName, photoURL, mostRecentProgram, etc.
 *    programs: json of each program
 *          each program is keyed by the program name and its value is a json containing at
 *          two keys. code is the code and language is the language the code is written in
 *   }
 * }
 */
export const getUserData = async (uid = "", includePrograms = false) => {
  console.log("getting user data");
  const options = {
    method: "get",
    mode: "cors", // no-cors, cors, *same-origin
  };

  try {
    let result = await fetch(getUserDataEndpoint(uid, includePrograms), options);
    let { ok, data, error } = await result.json();

    return { ok, data, error };
  } catch (err) {
    return { ok: "false", error: "CATCH_ERROR", err: err };
  }
};

export const updateProgramsEndpoint = (uid = "") => `${constants.SERVER_URL}/updatePrograms/${uid}`;
/**---------updatePrograms--------
 * updates all programs provided in the parameter "programs"
 *
 * programs should be a json with at least 1 key in it
 * each key should be the name of the program you want to update
 * and the value should be the json you want merged with the document in Firestore
 *
 * e.g.
 * programs = {
 *  Python:{code: "test"}
 * }
 * would update the code for the Python program, but not the language
 * }
 */
export const updatePrograms = (uid = "", programs) => {
  let body = "";

  try {
    //if programs is an object with at least 1 key, set the body to the stringified programs object
    if (Object.keys(programs).length) {
      body = JSON.stringify(programs);
    }
  } catch (err) {
    console.log(err);
  }

  const options = {
    method: "post",
    // headers: {
    //   "Content-Type": "application/json; charset=utf-8",
    // },
    body,
  };

  return fetch(updateProgramsEndpoint(uid), options);
};

export const updateUserDataEndpoint = (uid = "") => `${constants.SERVER_URL}/updateUserData/${uid}`;
/**---------updateUserData--------
 * merges the json parameter userData with the user document in Firestore
 *
 * e.g.
 * userData = {
 *  photoURL:"google.com/asdf.jpeg"
 * }
 * would update the photoURL of the user at uid, but not their mostRecentProgram
 * }
 */
export const updateUserData = (uid = "", userData) => {
  let body = "";

  try {
    //if programs is an object with at least 1 key, set the body to the stringified programs object
    if (Object.keys(userData).length) {
      body = JSON.stringify(userData);
    }
  } catch (err) {
    console.log(err);
    return;
  }

  const options = {
    method: "post",
    // headers: {
    //   "Content-Type": "application/json; charset=utf-8",
    // },
    body,
  };

  return fetch(updateUserDataEndpoint(uid), options);
};
