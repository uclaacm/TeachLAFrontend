import React from "react";
import { shallow } from "enzyme";
import LoadingPage from "./LoadingPage";

describe("LoadingPage", () => {
  it("smoke test", () => {
    const component = shallow(<LoadingPage />);
    expect(component.exists()).toBe(true);
  });

  it("should render correctly", () => {
    const component = shallow(<LoadingPage />);

    expect(component).toMatchSnapshot();
  });
});
