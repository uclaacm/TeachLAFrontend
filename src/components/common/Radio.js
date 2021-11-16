import React, {useState, useEffect} from 'react';
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


const Radio = (props) => {
  let defaultSelected = props.defaultSelected;
  
  if (props.allowMultipleSelected){
      defaultSelected = defaultSelected || [];
  }
  
  const [selected, setSelected] = useState(defaultSelected);

  const updateSelectedState = (select, alreadySelected) => {
    if (props.allowMultipleSelected) {
      let newState = selected;
      if (alreadySelected) {
        const i = selected.indexOf(select);
        if (i >= 0) newState.splice(i, 1);
      }
      else { 
        newState = selected.concat([select])
      }
      if (props.handleClick) {
        props.handleClick(newState);
      }
      setSelected(newState);
    } else {
      if (props.handleClick){
        props.handleClick(select);
      }
      setSelected(select)
    }
  };

  const renderOption = ({display, value}, index) => {
    value = value || index;

    const isSelected = value === selected || (props.allowMultipleSelected && selected.includes(value));
    const className = `radio-option${isSelected ? '-selected' : ''}`;
    const id = index === 0 ? 'radio-left' : index === props.options.length - 1 ? 'radio-right' : '';

    let optionStyle;
    if (isSelected){
      optionStyle = {
        ...props.optionStyle || {}, 
        ...props.selectedOptionStyle || {}, 
        ...(props.selectedBgColor ? { backgroundColor: props.selectedBgColor } : {}),
        ...(props.selectedColor ? { color: props.selectedColor } : {}),
      };
    }
    else {
      optionStyle = {
          ...props.optionStyle || {},
          ...(props.bgColor ? { backgroundColor: props.bgColor } : {}),
          ...(props.color ? { color: props.color } : {}),
      };
    }
    return (
      <div
        className={className}
        onClick={() => updateSelectedState(value, isSelected)}
        style={optionStyle}
        id={id}
        key={index}
      >
        {display}
      </div>
    );
  };
  const { containerStyle } = props;

  const options = props.options || [];

  return (
      <div className="radio-selector" style={containerStyle}>
        {options.map(renderOption)}
      </div>
  ); 
}

export default Radio
