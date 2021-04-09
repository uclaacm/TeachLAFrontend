import constants from "../constants";
import * as fetch from "../lib/fetch.js";

/**
 * constructShareableSketchURL: given a program ID, generate
 * a shareable link to the view-only version of that program.
 * checks for the current hostname using window.location.hostname,
 * @param {String} programId the id of the program
 * @param {String} [domainRoot=window.location.hostname] domainRoot (e.g. editor.uclaacm.com). defaults localhost to 8080
 */

export const constructShareableSketchURL = (programId, domainRoot = window.location.hostname) => {
  let root;
  if (domainRoot.includes("localhost")) {
    root = "http://localhost:8080";
  } else {
    root = `https://${domainRoot}`;
  }

  return `${root}${constants.ROUTER_BASE_NAME}p/${programId}`;
};

/**
 * constructCollabId: given a program ID, TODO: generate
 * a collabId that students can join
 * @param {String} uid the uid of the user who wants to create a collab session
 */

export const constructCollabId = async (uid) => {
  let data = {
    uid: uid,
  };

  let collabId = await fetch
    .createCollab(data)
    .then((res) => res.text())
    .then((result) => {
      return result;
    })
    .catch((err) => console.error(err));

  console.log("collabId is: ", collabId);
  return collabId;
};
