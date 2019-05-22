import React from "react";
import { shallow } from "enzyme";
import LoadingPage from "./LoadingPage";

describe("LoadingPage", () => {
  it("should render correctly", () => {
    const component = shallow(<LoadingPage />);

    expect(component).toMatchSnapshot();
  });
});
