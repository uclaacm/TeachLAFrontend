import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
// import { PYTHON, JAVASCRIPT, PROCESSING, JAVA, HTML, CPLUS_PLUS} from '../../../constants'


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
    //map each program string in the array to a dropdown item
    return this.props.dropdownItems.map(program => {
      if(program === undefined){
        return null
      }

      return (
        <DropdownItem
          //if a onSelect was provided, call it with the value
          key={program}
          onClick={() => {this.props.onSelect ? this.props.onSelect(program) : null}}
        >
          {program || ""}
        </DropdownItem>
      )
    })
  }

  render(){
    //if there's no programs in the dropdownItems, just show the display value
    if(!this.props.dropdownItems || !this.props.dropdownItems.length){
      return this.props.displayValue
    }

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

