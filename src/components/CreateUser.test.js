import React from "react";
import { shallow } from "enzyme";
import CreateUser from "./CreateUser";

describe("CreateUser", () => {
  it("smoke test", () => {
    const component = shallow(<CreateUser />);
    expect(component.exists()).toBe(true);
  });

  it("should render correctly", () => {
    const component = shallow(<CreateUser />);

    expect(component).toMatchSnapshot();
  });
});
