import React from "react";
import { shallow } from "enzyme";
import OpenPanelButton from "./OpenPanelButton";

const clickFn = jest.fn();

describe("LoadingPage", () => {
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

    component.find("div#editor-expand-panel-arrow", {}, results => {
      expect(results.length).toBe(1);
      results[0].simulate("click");
    });
  });

  it("calls togglePanel on click", () => {
    const component = shallow(<OpenPanelButton panelOpen={false} togglePanel={clickFn} />);

    component.find("div#editor-expand-panel-arrow").simulate("click");

    expect(clickFn).toHaveBeenCalled();
  });
});
