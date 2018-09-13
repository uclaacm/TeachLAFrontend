import React from 'react'
import { shallow } from 'enzyme'
import firebase from 'firebase'
import config from '../../firebase'

import App from '../app.js'

function setup(){

  const props = {
    loadUserData: jest.fn(),
    clearUserData: jest.fn()
  }

  const appWrapper = shallow(<App {...props}/>)
  return {
    props,
    appWrapper
  }
}

describe('<App/>', () => {
  it('has the the correct UI state on initialization', () => {
    const {appWrapper} = setup()
    expect(appWrapper.state('checkedAuth')).toBeFalsy()
    expect(appWrapper.state('width')).toBe(window.innerWidth)
    expect(appWrapper.state('height')).toBe(window.innerHeight)
  })
})
