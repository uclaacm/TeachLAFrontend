import constants from "../constants";

/**
 * constructShareableSketchURL: given a program ID, generate
 * a shareable link to the view-only version of that program.
 * checks for the current hostname using window.location.hostname,
 * and assumes HTTPS if not localhost
 * @param {String} programId
 */

export const constructShareableSketchURL = (programId) => {
  let root;
  if (window.location.hostname === "localhost") {
    root = "http://localhost:8080";
  } else {
    root = `https://${window.location.hostname}`;
  }

  return `${root}${constants.ROUTER_BASE_NAME}p/${programId}`;
};
