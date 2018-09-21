import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { PYTHON, JAVASCRIPT, PROCESSING, JAVA, HTML, CPLUS_PLUS} from '../../../constants'


/**
 * props:
 *  displayedValue (string): the value displayed in the closed dropdown (the value currently selected)
 */
export default class DropdownButton extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      dropdownOpen: this.props.defaultOpen || false,
    }
  }

  toggleHandler = (prevVal) => {
    this.setState({dropdownOpen:!prevVal})
  }

  renderDropdownItems = () => {
    //if no items were passed in or it is not an array
    if(!this.props.dropdownItems || !this.props.dropdownItems.length){
      return null
    }

    //each item in the array should be an object with 2 keys
    //display is the value shown in the dropdown
    //value is the hidden value behind the dropdown called with onSelect
    return this.props.dropdownItems.map(({value, display}) => {
      if(value === undefined || display === undefined){
        return null
      }

      return (
        <DropdownItem
          //if a onSelect was provided, call it with the value
          onClick={() => {this.props.onSelect ? this.props.onSelect(value) : null}}
        >
          {display || ""}
        </DropdownItem>
      )
    })
  }

  render(){
    return (
      <div className="editor-language-dropdown">
        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={()=>this.toggleHandler(this.state.dropdownOpen)}
        >
          <DropdownToggle caret>
            <div style={{display:"inline-block"}}>{this.props.displayValue}</div>
          </DropdownToggle>
          <DropdownMenu>
            {this.renderDropdownItems()}
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}

