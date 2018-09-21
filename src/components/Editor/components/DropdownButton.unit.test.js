import React from 'react'
import { shallow, render, mount} from 'enzyme'
import {SUPPORTED_LANGUAGES, PYTHON} from '../../../constants'
import {languageToDisplay} from '../../../lib/helpers.js'

import DropdownButton from './DropdownButton'
import {DropdownItem, DropdownToggle} from 'reactstrap'

const dropdownItems =  [{value:PYTHON, display:languageToDisplay(PYTHON)}, {value:"blah", display:"TEST"}, {value:"blah2", display:"TEST2"}]

function setup(){
  function onSelect(){
    return true
  } 

  const props = {
    defaultOpen: false,
    handleDropdownToggle: jest.fn(),
    displayValue: languageToDisplay(PYTHON),
    onSelect: jest.fn(),
    dropdownItems,
  }
  const dropdownButton = mount(<DropdownButton {...props}/>)
  return { dropdownButton, props }
}

describe('<DropdownButton />', () => {
  const {dropdownButton, props} = setup()
  let dropdownRefs = dropdownButton.find(DropdownItem)

  it('renders with the correct language being used.', () => {
    let children = dropdownButton.find(DropdownToggle).prop('children')
    let currentLanguage = shallow(<div>{children}</div>).text()
    expect(currentLanguage).toMatch(JAVASCRIPT)
  })

  it('includes item for every dropdownItem', () => {
    expect(dropdownRefs).toHaveLength(dropdownItems.length)
  })

  it('changes language mode on click.', () => {
    dropdownRefs.first().simulate('click')
    expect(props.onSelect.mock.calls.length).toBe(1)
  })
})
