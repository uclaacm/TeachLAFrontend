import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { PYTHON, JAVASCRIPT, PROCESSING, JAVA, HTML, CPLUS_PLUS} from '../../../constants'

const DropdownButton = (props) => {
  return (
    <div className="editor-language-dropdown">
      <Dropdown
      isOpen={props.isOpen}
      toggle={props.handleDropdownToggle}
      >
        <DropdownToggle caret>   {/* caret adds the downward arrow next to the selected language */}
          <div style={{display:"inline-block"}}>{props.language}</div>      {/*language comes from the state, it represents the currently selected language*/}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {props.changeMode(PYTHON)}}>Python</DropdownItem>
          <DropdownItem onClick={() => {props.changeMode(JAVASCRIPT)}}>Javascript</DropdownItem>
          <DropdownItem onClick={() => {props.changeMode(PROCESSING)}}>Processing</DropdownItem>
          <DropdownItem onClick={() => {props.changeMode(JAVA)}}>Java</DropdownItem>
          {/* <DropdownItem onClick={() => {changeMode(CPLUS_PLUS)}}>C++</DropdownItem> {/*disabled bc C++ is gross and probably not wanted*/}
          <DropdownItem onClick={() => {props.changeMode(HTML)}}>HTML</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default DropdownButton
