import React from "react";
import { shallow, render, mount } from "enzyme";
import { SUPPORTED_LANGUAGES, JAVASCRIPT } from "../../../constants";

import DropdownButton from "./DropdownButton";
import { DropdownItem, DropdownToggle } from "reactstrap";

function setup() {
  const props = {
    changeMode: jest.fn(),
    isOpen: false,
    handleDropdownToggle: jest.fn(),
    language: JAVASCRIPT,
  };
  const dropdownButton = mount(<DropdownButton {...props} />);
  return { dropdownButton, props };
}

describe("<DropdownButton />", () => {
  const { dropdownButton, props } = setup();
  let dropdownItems = dropdownButton.find(DropdownItem);

  it("renders with the correct language being used.", () => {
    let children = dropdownButton.find(DropdownToggle).prop("children");
    let currentLanguage = shallow(<div>{children}</div>).text();
    expect(currentLanguage).toMatch(JAVASCRIPT);
  });

  it("includes all supported languages.", () => {
    expect(dropdownItems).toHaveLength(SUPPORTED_LANGUAGES.length);
  });

  it("changes language mode on click.", () => {
    dropdownItems.first().simulate("click");
    expect(props.changeMode.mock.calls.length).toBe(1);
  });
});
