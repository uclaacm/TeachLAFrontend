import React from 'react';
import '../../styles/Radio.scss';
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
 *              should have 1 parameter (value) which is the value
 *              (from the options prop) that is selected (defaults to index)
 * allowMultipleSelected: (bool) if true, allows multiple options to be selected
 *                        changes handle click to be called with all selected values
 */

interface OptionItem {
  display: string;
  value: string;
}

interface RadioProps<T> {
  defaultSelected: T;
  allowMultipleSelected: boolean;
  options: OptionItem[];
  containerStyle: any;
  optionStyle: any;
  selectedOptionStyle: any;
  selectedBgColor: any;
  selectedColor: any;
  bgColor: any;
  color: any;
  handleClick: (arg0: string) => string;
}

interface RadioState {
  selected?: any;
}

class Radio<T> extends React.Component <RadioProps<T>, RadioState> {
  // static defaultProps: Partial<RadioProps<string>> = defaultProps;
  constructor(props: RadioProps<T>) {
    super(props);

    const { allowMultipleSelected, defaultSelected } = this.props;

    let selected: T | T[] | undefined = defaultSelected;
    if (allowMultipleSelected) {
      selected = selected || [];
    }

    this.state = {
      selected,
    };
  }

  updateSelectedState = (selected_value: string, alreadySelected: boolean): void => {
    const { allowMultipleSelected, handleClick } = this.props;

    if (allowMultipleSelected) {
      const { selected } = this.state;
      let newState = selected;
      if (alreadySelected) {
        const i = selected.indexOf(selected_value);
        if (i >= 0) newState.splice(i, 1);
      } else {
        newState = selected.concat([selected_value]);
      }
      if (handleClick) {
        handleClick(newState);
      }
      this.setState({ selected: newState });
    } else {
      if (handleClick) {
        handleClick(selected_value);
      }
      this.setState({ selected: selected_value });
    }
  };

  renderOption = ({ display, value }: OptionItem, index: number): JSX.Element => {
    // if no value is provided, use the index
    // value = value || index;
    const { selected } = this.state;
    const { allowMultipleSelected, options } = this.props;
    const isSelected = value === selected
      || (allowMultipleSelected && selected.includes(value));
    // attach -selected if the value matches the selected state
    const className = `radio-option${isSelected ? '-selected' : ''}`;
    // add an id of radio-left if its the first option or radio-right if its the last option
    let idValue;
    if (index === 0) {
      idValue = 'radio-left';
    } else if (index === options.length - 1) {
      idValue = 'radio-right';
    } else {
      idValue = '';
    }
    const id = idValue;

    let newOptionStyle;
    const {
      optionStyle, selectedOptionStyle, selectedBgColor, selectedColor, bgColor, color,
    } = this.props;
    if (isSelected) {
      newOptionStyle = {

        ...optionStyle || {},
        ...selectedOptionStyle || {},
        ...(selectedBgColor ? { backgroundColor: selectedBgColor } : {}),
        ...(selectedColor ? { color: selectedColor } : {}),
      };
    } else {
      newOptionStyle = {

        ...optionStyle || {},
        ...(bgColor ? { backgroundColor: bgColor } : {}),
        ...(color ? { color } : {}),
      };
    }

    return (
      <div
        role="button"
        tabIndex={0}
        className={className}
        onClick={() => this.updateSelectedState(value, isSelected)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            this.updateSelectedState(value, isSelected);
          }
        }}
        style={newOptionStyle}
        id={id}
        key={index}
      >
        {display}
      </div>
    );
  };

  render() {
    const { containerStyle, options } = this.props;
    const optionsMap = options || [];

    return (
      <div className="radio-selector" style={containerStyle}>
        {optionsMap.map(this.renderOption)}
      </div>
    );
  }
}

export default Radio;
