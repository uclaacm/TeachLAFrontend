import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

/**--------Props---------------
 * dropdownItems: array of strings, each string being the name of a Program
 * displayValue: string to be displayed as the placeholder for the dropdown
 * onSelect: function called when an item is selected in the dropdown
 */
/**--------Optional props--------
 * defaultOpen: boolean determining if the dropdown should start off open or closed
 */

export default class DropdownButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: this.props.defaultOpen || false,
    };
  }

  //==============React Lifecycle Functions===================//
  componentDidMount() {}

  toggleHandler = prevVal => {
    this.setState({ dropdownOpen: !prevVal });
  };

  renderDropdownItems = () => {
    //map each program string in the array to a dropdown item
    return this.props.dropdownItems.map(({ display, value }) => {
      //if the program doesn't exist, or is an empty string, return null
      if (!display || !display.length || !value || !value.length) {
        return null;
      }

      return (
        <DropdownItem
          key={value}
          onClick={this.props.onSelect ? () => this.props.onSelect({ display, value }) : null}
        >
          {display}
        </DropdownItem>
      );
    });
  };

  render() {
    //if there's no programs in the dropdownItems, just show the display value
    if (!this.props.dropdownItems || !this.props.dropdownItems.length) {
      //TODO: add better error logic for this
      return this.props.displayValue;
    }

    return (
      <div className="sketches-language-dropdown">
        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={() => this.toggleHandler(this.state.dropdownOpen)}
        >
          <DropdownToggle color="primary" size="lg" caret>
            <div className="sketches-language-dropdown-closed-content">
              {this.props.displayValue}
            </div>
          </DropdownToggle>
          <DropdownMenu>{this.renderDropdownItems()}</DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
