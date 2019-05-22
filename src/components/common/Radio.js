import React from "react";
import "../../styles/Common.css";
/**
 * Props
 *
 * options: (array of jsons) content for each box
 *          each json should look like {
 *            display: "Text to be displayed",
 *            (optional) value: the hidden value correlating to the display value (defaults to the index)
 *          }
 * defaultSelected: (same type as options' value key) the option that will be default selected
 *                   CAREFUL: if handleClick causes Radio to be re-rendered, make sure you're fine
 *                   with this variable always being the defaultSelected
 * containerStyle: (json) overrides the style on the outer container
 * optionStyle: (json) overrides the style on each individual option
 * selectedOptionStyle: (json) overrides the style on the selected option
 * bgColor: (string) color of the non selected options
 * color: (string) color of the non selected options text
 * selectedBgColor: (string) color of the selected option
 * selectedColor: (string) color of the selected options text
 * handleClick: (func) function to be called when an option is clicked
 *              should have 1 parameter (value) which is the value (from the options prop) that is selected (defaults to index)
 * allowMultipleSelected: (bool) if true, allows multiple options to be selected
 *                        changes handle click to be called with all selected values
 */

export default class Radio extends React.Component {
  constructor(props) {
    super(props);

    let selected = this.props.defaultSelected;
    if (this.props.allowMultipleSelected) {
      selected = selected || [];
    }

    this.state = {
      selected,
    };
  }

  updateSelectedState = (selected, alreadySelected) => {
    if (this.props.allowMultipleSelected) {
      let newState = this.state.selected;
      if (alreadySelected) {
        let i = this.state.selected.indexOf(selected);
        if (i >= 0) newState.splice(i, 1);
      } else {
        newState = this.state.selected.concat([selected]);
      }
      if (this.props.handleClick) {
        this.props.handleClick(newState);
      }
      this.setState({ selected: newState });
    } else {
      if (this.props.handleClick) {
        this.props.handleClick(selected);
      }
      this.setState({ selected });
    }
  };

  renderOption = ({ display, value }, index) => {
    //if no value is provided, use the index
    value = value || index;

    let isSelected =
      value === this.state.selected ||
      (this.props.allowMultipleSelected && this.state.selected.includes(value));
    //attach -selected if the value matches the selected state
    const className = "radio-option" + (isSelected ? "-selected" : "");
    //add an id of left if its the first option or right if its the last option
    const id = index === 0 ? "left" : index === this.props.options.length - 1 ? "right" : "";

    let optionStyle;
    if (isSelected) {
      optionStyle = Object.assign(
        {},
        this.props.optionStyle || {},
        this.props.selectedOptionStyle || {},
        this.props.selectedBgColor ? { backgroundColor: this.props.selectedBgColor } : {},
        this.props.selectedColor ? { color: this.props.selectedColor } : {},
      );
    } else {
      optionStyle = Object.assign(
        {},
        this.props.optionStyle || {},
        this.props.bgColor ? { backgroundColor: this.props.bgColor } : {},
        this.props.color ? { color: this.props.color } : {},
      );
    }

    return (
      <div
        className={className}
        onClick={() => this.updateSelectedState(value, isSelected)}
        style={optionStyle}
        id={id}
        key={index}
      >
        {display}
      </div>
    );
  };

  render() {
    const containerStyle = this.props.containerStyle;

    let options = this.props.options || [];

    return (
      <div className="radio-selector" style={containerStyle}>
        {options.map(this.renderOption)}
      </div>
    );
  }
}
