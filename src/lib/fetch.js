import constants from "../constants";

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
  const getUserDataEndpoint = (uid = "", includePrograms = false) =>
    `${constants.SERVER_URL}/getUserData/${uid}${includePrograms ? "?programs=true" : ""}`;

  const options = {
    method: "get",
    mode: "cors", // no-cors, cors, *same-origin
  };

  try {
    let result = await fetch(getUserDataEndpoint(uid, includePrograms), options);
    let { ok, data, error } = await result.json();

    return { ok, data, error };
  } catch (err) {
    return { ok: "false", error: "SERVER ERROR: Unable to get user data from server", err: err };
  }
};

/**
 * makeServerRequest: a generic POST request handler to our backend
 * @param {Object} data JSON data passed to endpoint; stringified into body of request
 * @param {string} endpoint API endpoint to hit, rooted at ${constants.SERVER_URL}/
 * @param {string} method HTTP method to make the request, defaults to post
 */

const makeServerRequest = (data, endpoint, method = "post") => {
  let body = "";

  // if the passed-in data object has at least 1 key, set the body to the stringified data object
  try {
    if (Object.keys(data).length) {
      body = JSON.stringify(data);
    }
  } catch (err) {
    console.log(err);
    return;
  }

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body,
  };

  return fetch(`${constants.SERVER_URL}/${endpoint}`, options);
};

/**
 * merges the JSON Parameter programs with the user document in Firestore; selectively updates based on passed-in keys
 * @param {string} uid UID of user to selectively update programs
 * @param {Object} programs object that contains only the keys of the project that need to be updated
 */

export const updatePrograms = (uid = "", programs) => {
  const endpoint = `updatePrograms/${uid}`;
  return makeServerRequest(programs, endpoint, "put");
};

/**
 * merges the JSON parameter userData with the user document in Firestore; selectively updates based on passed-in keys
 * @param {string} uid UID for the user to update
 * @param {Object} userData object that contains only the keys of the user data that need to be updated
 */

export const updateUserData = (uid = "", userData) => {
  const endpoint = `updateUserData/${uid}`;
  return makeServerRequest(userData, endpoint);
};

/**
 * creates a sketch in Firestore with passed-in data
 * @param {Object} data required data to create program - might eventually become enumerated
 */

export const createSketch = data => {
  return makeServerRequest(data, "createProgram");
};

/**
 * deletes a sketch in Firestore with given docID
 * @param {Object} data required data to delete program (uid, docID, name)
 */

export const deleteSketch = data => {
  return makeServerRequest(data, "deleteProgram");
};

/**
 * gets a sketch's information by the docID
 * @param {string} docID the key for the requested program in the top-level programs object
 */

export const getSketch = docID => {
  const endpoint = `getProgram/${docID}`;
  return makeServerRequest({}, endpoint);
};
