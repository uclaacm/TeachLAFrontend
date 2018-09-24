import constants from '../constants'

export const getUserDataEndpoint = (uid = "", includePrograms = false) => `${constants.SERVER_URL}/getUserData/${uid}${includePrograms ? "?programs=true" : ""}`

export const getUserData = async (uid = "", includePrograms = false) => {
  console.log("getting user data")
  const options = {
    method: "get",
    mode: "cors", // no-cors, cors, *same-origin
  }

  try{
    let result = await fetch(getUserDataEndpoint(uid, includePrograms), options)
    let {ok, data, error} = await result.json()

    return {ok, data, error}
  } catch(err) {
    return { ok: "false", error: "CATCH_ERROR", err: err}
  }
}

export const initializeUserDataEndpoint = (uid = "") => `${constants.SERVER_URL}/initializeUserData/${uid}`

export const initializeUserData = (uid = "") => {
  const options = {
    method: "POST",
  }

  return fetch(initializeUserDataEndpoint(uid), options)
}

export const updateProgramsEndpoint = (uid = "") => `${constants.SERVER_URL}/updatePrograms/${uid}`

export const updatePrograms = (uid = "", programs) => {
  let body = ""

  try{
    //if programs is an object with at least 1 key, set the body to the stringified programs object
    if(Object.keys(programs).length){
      body = JSON.stringify(programs)
    }
  } catch(err) {
    console.log(err)
  }

  const options = {
    method: "post",
    // headers: {
    //   "Content-Type": "application/json; charset=utf-8",
    // },
    body,
  }

  return fetch(updateProgramsEndpoint(uid), options)
}

export const updateUserDataEndpoint = (uid = "") => `${constants.SERVER_URL}/updateUserData/${uid}`

export const updateUserData = (uid = "", userData) => {
  let body = ""

  try{
    //if programs is an object with at least 1 key, set the body to the stringified programs object
    if(Object.keys(userData).length){
      body = JSON.stringify(userData)
    }
  } catch(err) {
    console.log(err)
    return
  }

  const options = {
    method: "post",
    // headers: {
    //   "Content-Type": "application/json; charset=utf-8",
    // },
    body,
  }

  return fetch(updateUserDataEndpoint(uid), options)
}