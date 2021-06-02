import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

/** --------Props---------------
 * children: array of strings, each string being the name of a Program
 * displayValue: string to be displayed as the placeholder for the dropdown
 * onSelect: function called when an item is selected in the dropdown
 */
/** --------Optional props--------
 * defaultOpen: boolean determining if the dropdown should start off open or closed
 */

const DropdownButton = (props) => {
  const {
    dirty,
    onSelect,
    children,
    defaultOpen,
    displayValue,
    displayClass,
    toggleClass,
    toggleColor,
    toggleSize,
  } = props;

  const parentDisplay = displayClass + '-language-dropdown';
  const itemDisplay = displayClass + '-language-dropdown-closed-content';
  const [dropdownOpen, setdropdownOpen] = useState(defaultOpen || false);

  const toggleHandler = (prevVal) => {
    setdropdownOpen(!prevVal);
  };

  const renderDropdownItems = () =>
    children.map(({ display, value }) => {
      return (
        <DropdownItem key={value} onClick={() => onSelect({ display, value, dirty })}>
          {display}
        </DropdownItem>
      );
    });

  return (
    <div className={parentDisplay}>
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleHandler(dropdownOpen)}>
        {/* HACK: disables the colors entirely, makes the dropdown transparent*/}
        <DropdownToggle className={toggleClass} color={toggleColor} size={toggleSize} caret>
          <div className={itemDisplay}>{displayValue}</div>
        </DropdownToggle>
        <DropdownMenu>{renderDropdownItems()}</DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default DropdownButton;

/*
  return !isSketchCallee ? (
    <div className="editor-language-dropdown">
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleHandler(dropdownOpen)}>
        {/* HACK: disables the colors entirely, makes the dropdown transparent/}
        <DropdownToggle className="btn-language-dropdown" color="" caret>
          <div className="editor-language-dropdown-closed-content">
            <FontAwesomeIcon icon={currentLanguage.icon} fixedWidth /> {displayValue}
          </div>
        </DropdownToggle>
        <DropdownMenu>{renderDropdownItems()}</DropdownMenu>
      </Dropdown>
    </div>
  ) : (
    <div className="sketches-language-dropdown">
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleHandler(dropdownOpen)}>
        <DropdownToggle color="primary" size="lg" caret>
          <div className="sketches-language-dropdown-closed-content">{displayValue}</div>
        </DropdownToggle>
        <DropdownMenu>{renderDropdownItems()}</DropdownMenu>
      </Dropdown>
    </div>
  );
};
*/
