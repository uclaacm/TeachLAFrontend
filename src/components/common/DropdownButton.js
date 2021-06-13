import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

/** --------Props---------------
 * children: array of dropDownButtons, each containing the button to switch to another language
 * displayValue: string to be displayed as the placeholder for the dropdown
 * toggleProps: props that dictate the styling of dropDownToggle
 * icon: contains optional icon for editor dropDown
 * displayClass: contains different classes for editor and sketch dropdownbutton
 */
/** --------Optional props--------
 * defaultOpen: boolean determining if the dropdown should start off open or closed
 */

const DropdownButton = (props) => {
  const { children, icon, defaultOpen, displayValue, displayClass, ...toggleProps } = props;

  const dropDownParentClass = displayClass + '-language-dropdown';
  const dropDownItemClass = displayClass + '-language-dropdown-closed-content';
  const [dropdownOpen, setdropdownOpen] = useState(defaultOpen || false);

  const toggleHandler = () => {
    setdropdownOpen(!dropdownOpen);
  };

  return (
    <div className={dropDownParentClass}>
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleHandler(dropdownOpen)}>
        {/* HACK: disables the colors entirely, makes the dropdown transparent*/}
        <DropdownToggle
          className={toggleProps.class}
          color={toggleProps.color}
          size={toggleProps.size}
          caret
        >
          <div className={dropDownItemClass}>
            <FontAwesomeIcon icon={icon} fixedWidth />
            {displayValue}
          </div>
        </DropdownToggle>
        <DropdownMenu>{children}</DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default DropdownButton;
