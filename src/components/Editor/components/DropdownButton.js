import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
          <DropdownItem onClick={() => {props.changeMode('Python')}}>Python</DropdownItem>
          <DropdownItem onClick={() => {props.changeMode('Javascript')}}>Javascript</DropdownItem>
          <DropdownItem onClick={() => {props.changeMode('Processing')}}>Processing</DropdownItem>
          <DropdownItem onClick={() => {props.changeMode('Java')}}>Java</DropdownItem>
          {/* <DropdownItem onClick={() => {changeMode('C++')}}>C++</DropdownItem> {/*disabled bc C++ is gross and probably not wanted*/}
          <DropdownItem onClick={() => {props.changeMode('HTML')}}>HTML</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default DropdownButton 
