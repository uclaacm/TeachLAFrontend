import constants from '../constants';

/**
 * makeServerRequest: a generic POST request handler to our backend
 * @param {Object} data JSON data passed to endpoint; stringified into body of request
 * @param {string} endpoint API endpoint to hit, rooted at ${constants.SERVER_URL}/
 * @param {string} method HTTP method to make the request, defaults to post
 */

const makeServerRequest = (data: object, endpoint: string, method: string = 'post') => {
  const options: RequestInit = {
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
      console.error(err);
      return Promise.reject(new Error('failed to make server request'));
    }
    options.body = body;
  }

  return fetch(`${constants.SERVER_URL}/${endpoint}`, options);
};

export const createUser = (uid: string) => {
  console.error('creating user');
  return makeServerRequest({ uid }, 'user/create', 'post');
};

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
export const getUserData = async (
  uid: string,
  includePrograms = false,
): Promise<{ ok: boolean; data: object; error: string }> => {
  const userDataEndpoint = `${constants.SERVER_URL}/user/get?uid=${uid}${
    includePrograms ? '&programs=true' : ''
  }`;

  const options: RequestInit = {
    method: 'get',
    mode: 'cors', // no-cors, cors, *same-origin
  };

  try {
    const result = await fetch(userDataEndpoint, options);
    const status = result.status;
    const ok = status === 200;
    const data = ok ? await result.json() : {};
    const error = !ok ? await result.text() : '';
    if (!ok) {
      console.error(error);
      await createUser(uid);
      return getUserData(uid, includePrograms);
    }
    return { ok, data, error };
  } catch (err) {
    if (err instanceof Error) return { ok: false, data: {}, error: err.message };
    else if (typeof err === 'string') return { ok: false, data: {}, error: err };
    else return { ok: false, data: {}, error: 'Error encountered' };
  }
};

/**
 * merges the JSON Parameter programs with the user document in Firestore; selectively updates based on passed-in keys
 * @param {string} uid UID of user to selectively update programs
 * @param {Object} programs object that contains only the keys of the project that need to be updated
 */

// eslint-disable-next-line default-param-last
export const updatePrograms = (uid: string = '', programs: object) => {
  const endpoint = 'program/update';
  return makeServerRequest({ uid, programs }, endpoint, 'put');
};

/**
 * merges the JSON parameter userData with the user document in Firestore; selectively updates based on passed-in keys
 * @param {string} uid UID for the user to update
 * @param {Object} userData object that contains only the keys of the user data that need to be updated
 */

// eslint-disable-next-line default-param-last
export const updateUserData = (uid: string = '', userData: object) => {
  const endpoint = 'user/update';
  return makeServerRequest({ uid, ...userData }, endpoint, 'put');
};

/**
 * creates a sketch in Firestore with passed-in data
 * @param {Object} data required data to create program - might eventually become enumerated
 */

export interface Program {
  uid: string;
  thumbnail: number;
  language: string;
  name: string;
  code: string;
}

export const createSketch = ({
  uid,
  wid,
  program,
}: {
  uid: string;
  wid: string;
  program: Program;
}) => {
  return makeServerRequest({ uid, wid, program }, 'program/create');
};

/**
 * deletes a sketch in Firestore with given docID
 * @param {Object} data required data to delete program (uid, docID, name)
 */

export const deleteSketch = ({ uid, name }: { uid: string; name: string }) => {
  return makeServerRequest({ uid, pid: name }, 'program/delete', 'delete');
};

/**
 * gets a sketch's information by the docID
 * @param {string} docID the key for the requested program in the top-level programs object
 */

export const getSketch = (docID: string) => {
  const endpoint = `program/get?pid=${docID}`;
  return makeServerRequest({}, endpoint, 'get');
};

/**
 * creates a new class
 * @param {Object} data required data to create class {uid, name, thumbnail}
 */
export const createClass = (data: { uid: string; name: string; thumbnail: string }) =>
  makeServerRequest(data, 'class/create');

/**
 * add a student to an existing class
 * @param {Object} data student's uid and class's word id {uid, wid}
 */
export const joinClass = async (data: object) => {
  console.error(data);
  const result = await makeServerRequest(data, 'class/join', 'put');
  const ok = result.ok;
  const { status } = result;
  const classData = ok ? await result.json() : {};
  return { ok, status, classData };
};

/**
 * remove a member from a class
 * @param {Object} data member's uid and class's cid {uid, cid}
 */
export const leaveClass = async (data: { uid: string; cid: string }) => {
  const result = await makeServerRequest(data, 'class/leave', 'put');
  const ok = result.ok;
  console.error(`ok: ${ok}`);
  // let userData = await result.json();
  const userData = {};
  return { ok, userData };
};

/**
 * Get class data for a user
 * @param {Object} data member's uid and class's cid {uid, cid}
 * @param {boolean} withPrograms whether to include this class's sketches or not
 * @param {boolean} withUserData whether to include student data
 */
export const getClass = async (
  data: { uid: string; cid: string },
  withPrograms: boolean,
  withUserData: boolean,
) => {
  const result = await makeServerRequest(
    data,
    `class/get?programs=${withPrograms}&userData=${withUserData}`,
  );
  const ok = result.ok;
  console.error(`response status: ${result.status}`);
  const classData = await result.json();
  return { ok, classData };
};
