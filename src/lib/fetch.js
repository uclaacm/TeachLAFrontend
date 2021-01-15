import constants from '../constants';

/** ---------getUserData--------
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
export const getUserData = async (uid = '', includePrograms = false) => {
  const userDataEndpoint = `${constants.SERVER_URL}/user/get?uid=${uid}${includePrograms ? '&programs=true' : ''}`;

  const options = {
    method: 'get',
    mode: 'cors', // no-cors, cors, *same-origin
  };

  try {
    const result = await fetch(userDataEndpoint, options);
    const status = await result.status;
    const ok = status === 200;
    if (status === 404) {
      await createUser(uid);
      return getUserData(uid, includePrograms);
    }
    const data = ok ? await result.json() : {};
    const error = !ok ? await result.text() : '';
    return { ok, data, error };
  } catch (err) {
    await createUser(uid);
    return getUserData(uid, includePrograms);
  }
};

/**
 * makeServerRequest: a generic POST request handler to our backend
 * @param {Object} data JSON data passed to endpoint; stringified into body of request
 * @param {string} endpoint API endpoint to hit, rooted at ${constants.SERVER_URL}/
 * @param {string} method HTTP method to make the request, defaults to post
 */

const makeServerRequest = (data, endpoint, method = 'post') => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  if (method !== 'get') {
    let body = '';
    // if the passed-in data object has at least 1 key, set the body to the stringified data object
    try {
      if (Object.keys(data).length) {
        body = JSON.stringify(data);
      }
    } catch (err) {
      console.log(err);
      return;
    }
    options.body = body;
  }

  return fetch(`${constants.SERVER_URL}/${endpoint}`, options);
};

/**
 * merges the JSON Parameter programs with the user document in Firestore; selectively updates based on passed-in keys
 * @param {string} uid UID of user to selectively update programs
 * @param {Object} programs object that contains only the keys of the project that need to be updated
 */

export const updatePrograms = (uid = '', programs) => {
  const endpoint = 'program/update';
  return makeServerRequest({ uid, programs }, endpoint, 'put');
};

export const createUser = (uid) => {
  console.log('creating user');
  return makeServerRequest({ uid }, 'user/create', 'post');
};

/**
 * merges the JSON parameter userData with the user document in Firestore; selectively updates based on passed-in keys
 * @param {string} uid UID for the user to update
 * @param {Object} userData object that contains only the keys of the user data that need to be updated
 */

export const updateUserData = (uid = '', userData) => {
  const endpoint = 'user/update';
  return makeServerRequest({ uid, ...userData }, endpoint, 'put');
};

/**
 * creates a sketch in Firestore with passed-in data
 * @param {Object} data required data to create program - might eventually become enumerated
 */

export const createSketch = (data) => {
  const { uid, ...rest } = data;
  return makeServerRequest({ uid, program: rest }, 'program/create');
};

/**
 * deletes a sketch in Firestore with given docID
 * @param {Object} data required data to delete program (uid, docID, name)
 */

export const deleteSketch = (data) => {
  const { uid, name } = data;
  return makeServerRequest({ uid, pid: name }, 'program/delete', 'delete');
};

/**
 * gets a sketch's information by the docID
 * @param {string} docID the key for the requested program in the top-level programs object
 */

export const getSketch = async (docID) => {
  const endpoint = `program/get?pid=${docID}`;
  const result = await makeServerRequest({}, endpoint, 'get');
  const ok = await result.ok;
  const sketch = await result.json();
  return { ok, sketch };
};

/**
 * creates a new class
 * @param {Object} data required data to create class {uid, name, thumbnail}
 */
export const createClass = (data) => {
  return makeServerRequest(data, "class/create");
};

/**
 * add a student to an existing class
 * @param {Object} data student's uid and class's word id {uid, wid}
 */
export const joinClass = (data) => {
  return makeServerRequest(data, "class/join");
};

/**
 * remove a member from a class
 * @param {Object} data member's uid and class's cid {uid, cid}
 */
export const leaveClass = (data) => {
  return makeServerRequest(data, "class/leave");
};

/**
 * Get class data for a user
 * @param {Object} data member's uid and class's cid {uid, cid}
 * @param {boolean} withPrograms whether to include this class's sketches or not
 */
export const getClass = async (data, withPrograms) => {
  let result = await makeServerRequest(data, `class/get?programs=${withPrograms}`);
  let ok = await result.ok;
  let classData = await result.json();
  return { ok, classData };
};

// TODO: get rid of this function. Getting classes will be part of getUser
/**
 * Get all classes a user is enrolled in or an instructor for
 * @param {string} uid user's uid
 */
export const getClasses = async (uid) => {
  let result = await makeServerRequest({}, `user/classes?uid=${uid}`, "get");
  let ok = await result.ok;
  let classes = await result.json();
  return { ok, classes };
};
