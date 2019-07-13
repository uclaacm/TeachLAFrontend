import React from "react";
import { shallow } from "enzyme";
import OpenPanelButton from "./OpenPanelButton";

const clickFn = jest.fn();

describe("OpenPanelButton", () => {
  it("smoke test", () => {
    const component = shallow(<OpenPanelButton />);
    expect(component.exists()).toBe(true);
  });

  it("panelOpen=true snapshot", () => {
    const component = shallow(<OpenPanelButton panelOpen={true} />);

    expect(component).toMatchSnapshot();
  });

  it("panelOpen=false snapshot", () => {
    const component = shallow(<OpenPanelButton panelOpen={false} />);

    expect(component).toMatchSnapshot();
  });

  it("handles undefined togglePanel prop", () => {
    const component = shallow(<OpenPanelButton panelOpen={false} />);

    const res = component.find(".editor-expand-panel-arrow");
    expect(res.length).toBe(1);
    res.simulate("click");
  });

  it("calls togglePanel on click", () => {
    const component = shallow(<OpenPanelButton panelOpen={false} togglePanel={clickFn} />);

    const res = component.find(".editor-expand-panel-arrow");
    expect(res.length).toBe(1);
    res.simulate("click");

    expect(clickFn).toHaveBeenCalled();
  });
});
