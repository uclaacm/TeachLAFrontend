import React from "react";
import { shallow } from "enzyme";
import Switch from "components/common/Switch.js";

describe("Switch", () => {
  it("smoke test", () => {
    const component = shallow(<Switch />);
    expect(component.exists()).toBe(true);
  });
  it("handles on prop properly", () => {
    let switchClass = ".switch-on"; // there has to be a better way of doing this
    const componentDefault = shallow(<Switch />);
    expect(componentDefault.find(switchClass)).toHaveLength(0);
    const componentFalse = shallow(<Switch on={false} />);
    expect(componentFalse.find(switchClass)).toHaveLength(0);
    const componentTrue = shallow(<Switch on={true} />);
    expect(componentTrue.find(switchClass)).toHaveLength(2); // there are two buttons w/ switch on?
  });
});
