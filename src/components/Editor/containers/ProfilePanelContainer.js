import React from 'react'
import ProfilePanel from '../components/ProfilePanel'
import {connect} from 'react-redux'
import {setDisplayName} from '../../../actions/userDataActions'

const DISPLAY_NAME_INPUT = 'display-name-input'
const DISPLAY_NAME_WRAPPER = 'panel-name'
const PHOTO_WRAPPER = 'panel-image'

const mapStateToProps = (state, ownProps) => {
  return {
    displayName: state.userData.displayName,
    photoURL: state.userData.photoURL,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    collectUserDisplayName: () => {
      let displayNameElement = document.querySelector("."+DISPLAY_NAME_WRAPPER)
      let input = document.querySelector("."+DISPLAY_NAME_INPUT)
      const handleEnter = (event) => {
        let displayNameInput = document.querySelector("."+DISPLAY_NAME_INPUT)
        if(event.key === "Enter" && displayNameInput){
          let newDisplayName = displayNameInput.value
          dispatch(setDisplayName(newDisplayName))
          displayNameElement.removeEventListener("keyup", handleOnEnter)
          displayNameElement.innerHTML = `${newDisplayName}`
        }
      }
      if(!input){
        displayNameElement.addEventListener("keyup", handleEnter)
        displayNameElement.innerHTML = (`
          <input class=${DISPLAY_NAME_INPUT} type="text"/>
        `)
      }
    },
    collectUserPhoto: () => {}
  }
}

const ProfilePanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePanel)

export default ProfilePanelContainer
