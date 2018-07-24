import React from 'react'
import ProfilePanel from '../components/ProfilePanel'
import {connect} from 'react-redux'
import {setDisplayName} from '../../../actions/userDataActions'

const DISPLAY_NAME_INPUT = 'display-name-input'
const DISPLAY_NAME_WRAPPER = 'panel-name'
const PHOTO_WRAPPER = 'panel-image'

/**
 * handleOnEnter
 * @param  {Event} event              the key event containing the key pressed
 * @param  {function} dispatch          the dispatch function used to dispatch redux actions
 * @param  {HTMLElement} displayNameElement - the wrapper element around a user's display name in the
 * profile panel
 */
const handleOnEnter = (event, dispatch, displayNameElement) => {
  let displayNameInput = document.querySelector("."+DISPLAY_NAME_INPUT)
  if(event.key === "Enter" && displayNameInput){
    let newDisplayName = displayNameInput.value
    dispatch(setDisplayName(newDisplayName))
    displayNameElement.removeEventListener("keyup", handleOnEnter)
    displayNameElement.innerHTML = `${newDisplayName}`
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    panelStyle: ownProps.panelStyle,
    panelVisible: ownProps.panelVisible,
    size: ownProps.size,
    handleOnSizeChange: ownProps.handleOnSizeChange,
    handleOnVisibleChange: ownProps.handleOnVisibleChange,
    user: ownProps.user,
    clearUserData: ownProps.clearUserData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    collectUserDisplayName: () => {
      let displayNameElement = document.querySelector("."+DISPLAY_NAME_WRAPPER)
      let input = document.querySelector("."+DISPLAY_NAME_INPUT)
      const handleEnter = (event) => {
        handleOnEnter(event, dispatch, displayNameElement)
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
