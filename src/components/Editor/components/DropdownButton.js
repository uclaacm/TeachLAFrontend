import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { PYTHON, JAVASCRIPT, PROCESSING, JAVA, HTML, CPLUS_PLUS} from '../../../constants'


/**
 * props:
 *  displayedValue (string): the value displayed in the closed dropdown (the value currently selected)
 */
class DropdownButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: props.defaultOpen || false,
    }
  }

  toggleHandler = (curState) => {
    this.setState({isOpen: !curState})
  }

  renderDropdownItems = () => {
    //if the dropdownOptions prop was not provided, an empty array, or not an array at all then do nothing
    if(!this.props.dropdownOptions || !this.props.dropdownOptions.length){
      return null
    }

    let options = this.props.dropdownOptions.map((item)=>{
      if(!item){
        return null
      }
      
      if(action){
        if(value)
      }

      return (
        <DropdownItem
          onClick={}
        >
        </DropdownItem>
      )
    })
      
  }

  render(){
    return (
      <div className="editor-language-dropdown">
        <Dropdown
          isOpen={this.state.isOpen}
          toggle={()=>this.toggleHandler(this.state.isOpen)}
        >
          <DropdownToggle caret>
            <div style={{display:"inline-block"}}>{props.language}</div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => {this.props.changeMode(PYTHON)}}>Python</DropdownItem>
            <DropdownItem onClick={() => {this.props.changeMode(JAVASCRIPT)}}>Javascript</DropdownItem>
            <DropdownItem onClick={() => {this.props.changeMode(PROCESSING)}}>Processing</DropdownItem>
            <DropdownItem onClick={() => {this.props.changeMode(JAVA)}}>Java</DropdownItem>
            {/* <DropdownItem onClick={() => {this.props.changeMode(CPLUS_PLUS)}}>C++</DropdownItem> {/*disabled bc C++ is gross and probably not wanted*/}
            <DropdownItem onClick={() => {this.props.changeMode(HTML)}}>HTML</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}

export default DropdownButton
