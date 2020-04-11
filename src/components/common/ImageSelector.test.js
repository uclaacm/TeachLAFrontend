import React from "react";
import { shallow } from "enzyme";
import ImageSelector from "./ImageSelector";

describe("ProfilePanel", () => {
  it("smoke test", () => {
    const component = shallow(<ImageSelector />);
    expect(component.exists()).toBe(true);
  });

  it("displays error message when error prop is passed", () => {
    const component = shallow(<ImageSelector error={"Error!"}/>);

    expect(component.find("div.text-danger").text()).toBe("Error!");
  });

  it("displays thumbnail when thumbnailPreview prop is passed", () => {
    const component = shallow(<ImageSelector thumbnailPreview={<img/>}/>);
    // expect(component.find(".image-selector-modal-header-thumbnail-container").children()).toBeTruthy(); //EVAN TODO: This feels like a hack, would prefer to use .toBe(<img />)
    console.log(component.find("div.image-selector-modal-header-thumbnail-container").childAt(0).debug());
    expect(component.find("div.image-selector-modal-header-thumbnail-container").childAt(0)).toBe(<img/>);
  });

  // it("displays gallary when icons prop is passed", () => {
  //   const component = shallow(<ImageSelector icons={[<img />, <img />, <img />]}/>);
  //   expect(component.find("div.image-selector-gallery").children()).toBe('asdf');
  // });
  // isOpen={this.state.showModal}
  // closeModal={this.handleCloseModal}
  // icons={icons}
  // maxWidth={PANEL_IMAGE_SELECTOR_SIZE}
  // className={"image-selector"}
  // children
})