import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

/** --------Props---------------
 * dropDownItems: array of data for each dropdown item
 * displayValue: string to be displayed as the placeholder for the dropdown
 * toggleProps: props that dictate the styling of dropDownToggle
 * icon: contains optional icon for editor dropDown
 * displayClass: contains different classes for editor and sketch dropdownbutton
 */
/** --------Optional props--------
 * defaultOpen: boolean determining if the dropdown should start off open or closed
 */

/*
TODO
-> change rendering of items back into the same thing. Essentially, change "children" to dropdownData and make it so that 
  it's just rendered inside of the main dropDownButton


*/

const DropdownButton = (props) => {
  const {
    icon,
    DropdownItems,
    defaultOpen,
    displayValue,
    displayClass,
    toggleProps,
    onSelect,
    dirty,
  } = props;

  const togglePropsValues = { ...toggleProps };
  const dropDownParentClass = displayClass + '-language-dropdown';
  const dropDownItemClass = displayClass + '-language-dropdown-closed-content';

  const [dropdownOpen, setdropdownOpen] = useState(defaultOpen || false);

  const toggleHandler = () => {
    setdropdownOpen(!dropdownOpen);
  };

  const renderDropdownItems = () =>
    DropdownItems.map(({ display, value, icon }) => {
      return (
        <DropdownItem key={value} onClick={() => onSelect({ display, value, dirty })}>
          <FontAwesomeIcon icon={icon} fixedWidth />
          <span style={{ marginLeft: '10px' }}> {display} </span>
        </DropdownItem>
      );
    });

  return (
    <div className={dropDownParentClass}>
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleHandler(dropdownOpen)}>
        {/* HACK: disables the colors entirely, makes the dropdown transparent*/}
        <DropdownToggle
          className={togglePropsValues.class}
          color={togglePropsValues.color}
          size={togglePropsValues.size}
          caret
        >
          <div className={dropDownItemClass}>
            <FontAwesomeIcon icon={icon} fixedWidth />
            {displayValue}
          </div>
        </DropdownToggle>
        <DropdownMenu>{renderDropdownItems()}</DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default DropdownButton;
