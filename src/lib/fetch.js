import constants from '../constants'

export const getUserDataEndpoint = (uid = "") => `${constants.SERVER_URL}/getUserData/${uid}`

export const getUserData = (uid = "", includePrograms = false) => {
  const options = {
    method: "post",
    mode: "cors", // no-cors, cors, *same-origin
    body:{
      includePrograms,
    }
  }

  return fetch(getUserDataEndpoint(uid), options)
}

export const initializeUserDataEndpoint = (uid = "") => `${constants.SERVER_URL}/initializeUserData/${uid}`

export const initializeUserData = (uid = "") => {
  const options = {
    method: "POST",
  }

  return fetch(initializeUserDataEndpoint(uid), options)
}

export const updateUserDataEndpoint = (uid = "") => `${constants.SERVER_URL}/updateUserData/${uid}`

export const updateUserData = (uid = "", programs) => {
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

  return fetch(updateUserDataEndpoint(uid), options)
}