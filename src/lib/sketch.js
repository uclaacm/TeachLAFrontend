import constants from '../constants';

/**
 * constructShareableSketchURL: given a program ID, generate
 * a shareable link to the view-only version of that program.
 * checks for the current hostname using window.location.hostname,
 * @param {String} programId the id of the program
 * @param {String} [domainRoot=window.location.hostname] domainRoot (e.g. editor.uclaacm.com). defaults localhost to 8080
 */

export const constructShareableSketchURL = (programId, domainRoot = window.location.hostname) => {
  let root;
  if (domainRoot.includes('localhost')) {
    root = 'http://localhost:8080';
  } else {
    root = `https://${domainRoot}`;
  }

  return `${root}${constants.ROUTER_BASE_NAME}p/${programId}`;
};
