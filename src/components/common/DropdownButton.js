import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

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

const DropdownButton = function (props) {
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

  const dropDownParentClass = `${displayClass}-language-dropdown`;
  const dropDownItemClass = `${displayClass}-language-dropdown-closed-content`;

  const [dropdownOpen, setdropdownOpen] = useState(defaultOpen || false);

  const toggleHandler = () => {
    setdropdownOpen(!dropdownOpen);
  };

  const renderDropdownItems = () => DropdownItems.map(({ display, value, icon }) => (
    <DropdownItem key={value} onClick={() => onSelect({ display, value, dirty })}>
      <FontAwesomeIcon style={{ marginRight: '10px' }} icon={icon} fixedWidth />
      {display}
    </DropdownItem>
  ));

  return (
    <div className={dropDownParentClass}>
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleHandler(dropdownOpen)}>
        <DropdownToggle caret {...toggleProps}>
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
