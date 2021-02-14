import React from 'react';
import { shallow, render, mount } from 'enzyme';

import { DropdownItem, DropdownToggle } from 'reactstrap';
import DropdownButton from './DropdownButton';

const dropdownItems = ['Python', 'HTML', 'Processing'];

// function setup(){

//   const props = {
//     defaultOpen: false,
//     handleDropdownToggle: jest.fn(),
//     displayValue: "Python",
//     onSelect: jest.fn(),
//     dropdownItems,
//   }
//   const dropdownButton = mount(<DropdownButton {...props}/>)
//   return { dropdownButton, props }
// }

describe('<DropdownButton />', () => {
  // const {dropdownButton, props} = setup()
  // let dropdownRefs = dropdownButton.find(DropdownItem)

  xit('renders with the correct language being used.', () => {
    const children = dropdownButton.find(DropdownToggle).prop('children');
    const currentLanguage = shallow(<div>{children}</div>).text();
    expect(currentLanguage).toMatch(JAVASCRIPT);
  });

  // it('includes item for every dropdownItem', () => {
  //   expect(dropdownRefs).toHaveLength(dropdownItems.length)
  // })

  // it('changes language mode on click.', () => {
  //   dropdownRefs.first().simulate('click')
  //   expect(props.onSelect.mock.calls.length).toBe(1)
  // })
});
