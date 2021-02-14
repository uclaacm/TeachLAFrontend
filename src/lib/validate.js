import {
  MINIMUM_USERNAME_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
  MINIMUM_DISPLAY_NAME_LENGTH,
  MAXIMUM_USERNAME_LENGTH,
  MAXIMUM_PASSWORD_LENGTH,
  MAXIMUM_DISPLAY_NAME_LENGTH,
} from '../constants';

/**
 * @typedef {Object} ValidMessage
 * @property {boolean} ok - whether or not the passed-in object is valid
 * @property {string} message - if ok is false, message is populated with an invalidation explanation; empty on true
 */

/**
 * isValidUsername takes in a username and returns an object containing whether or not the the username is valid;
 * if the username is invalid, it also contains an explanation as to why not
 * @param {string} username - the username
 * @returns {ValidMessage} - a ValidMessage object: 'ok' is a boolean determining the validity, and 'message' is an
 * error message set on failure, empty on true
 */
export const isValidUsername = (username) => {
  // username is too short or too long
  if (username.length < MINIMUM_USERNAME_LENGTH || username.length > MAXIMUM_USERNAME_LENGTH) {
    return {
      ok: false,
      message: `Username must be between ${MINIMUM_USERNAME_LENGTH}-${MAXIMUM_USERNAME_LENGTH} characters long`,
    };
  }

  // username contains non-alphanumeric characters that are not -_.
  if (username.match(/[^a-zA-Z0-9-_.]/)) {
    return {
      ok: false,
      message:
        'Username must only use upper case letters, lower case letters, numbers, or the characters .-_',
    };
  }
  return { ok: true, message: '' };
};

/**
 * isValidPassword takes in a username and returns an object containing whether or not the the password is valid;
 * if the password is invalid, it also contains an explanation as to why not
 * @param {string} password - the password
 * @returns {ValidMessage} - a ValidMessage object: 'ok' is a boolean determining the validity, and 'message' is an
 * error message set on failure, empty on true
 */
export const isValidPassword = (password) => {
  // password is too short or too long
  if (password.length < MINIMUM_PASSWORD_LENGTH || password.length > MAXIMUM_PASSWORD_LENGTH) {
    return {
      ok: false,
      message: `Password must be between ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long`,
    };
  }
  return { ok: true, message: '' };
};

/**
 * isValidDisplayName takes in a display name and returns an object containing whether or not the the display name is valid;
 * if the display name is invalid, it also contains an explanation as to why not
 * @param {string} displayName - the display name
 * @returns {ValidMessage} - a ValidMessage object: 'ok' is a boolean determining the validity, and 'message' is an
 * error message set on failure, empty on true
 */
export const isValidDisplayName = (displayName) => {
  // display name is too short or too long
  if (
    displayName.length < MINIMUM_DISPLAY_NAME_LENGTH
    || displayName.length > MAXIMUM_DISPLAY_NAME_LENGTH
  ) {
    return {
      ok: false,
      message: `Display name must be between ${MINIMUM_DISPLAY_NAME_LENGTH}-${MAXIMUM_DISPLAY_NAME_LENGTH} characters long`,
    };
  }

  // display name contains non-ASCII characters, or some special characters
  if (displayName.match(/[^a-zA-Z0-9!@#$%-_. ]/)) {
    return {
      ok: false,
      message:
        'Display name must only use upper case and lower case letters, numbers, spaces, and/or the special characters !@#$%.-_',
    };
  }
  return { ok: true, message: '' };
};
