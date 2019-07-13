import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";

describe("Footer", () => {
  it("smoke test", () => {
    const component = shallow(<Footer />);
    expect(component.exists()).toBe(true);
  });

  it("should render correctly", () => {
    const component = shallow(<Footer />);

    expect(component).toMatchSnapshot();
  });
});
