import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

/** --------Props---------------
 * dropdownItems: array of strings, each string being the name of a Program
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
    dropdownItems,
    defaultOpen,
    displayValue,
    currentLanguage,
    isSketchCallee,
  } = props;

  const [dropdownOpen, setdropdownOpen] = useState(defaultOpen || false);

  const toggleHandler = (prevVal) => {
    setdropdownOpen(!prevVal);
  };

  const selectLanguage = (program) => {
    let result = true;
    if (dirty) {
      result = window.confirm('Are you sure you want to change programs? You have unsaved changes');
    }

    if (onSelect && result) {
      onSelect(program);
    }
  };

  const renderDropdownItems = () =>
    !isSketchCallee
      ? dropdownItems.map((program) => (
          <DropdownItem key={program.key} onClick={() => selectLanguage(program.key)}>
            <FontAwesomeIcon icon={program.language.icon} fixedWidth />
            <span style={{ marginLeft: '10px' }}>{program.name}</span>
          </DropdownItem>
        ))
      : dropdownItems.map(({ display, value }) => {
          // if the program doesn't exist, or is an empty string, return null
          if (!display || !display.length || !value || !value.length) {
            return null;
          }
          return (
            <DropdownItem
              key={value}
              onClick={onSelect ? () => onSelect({ display, value }) : null}
            >
              {display}
            </DropdownItem>
          );
        });

  return !isSketchCallee ? (
    <div className="editor-language-dropdown">
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleHandler(dropdownOpen)}>
        {/* HACK: disables the colors entirely, makes the dropdown transparent */}
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

export default DropdownButton;
