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

  it("should handle showHelpText prop properly", () => {
    const component = shallow(<LoadingPage />);
    expect(component).toMatchSnapshot();

    const component_sht_false = shallow(<LoadingPage showHelpText={false} />);
    expect(component_sht_false.find(".Loading-page-text").length).toBe(0);
    expect(component_sht_false.state().showHelpText).toEqual(false);

    const component_sht_true = shallow(<LoadingPage showHelpText={true} />);
    expect(component_sht_true.find(".Loading-page-text").length).toBe(1);
    expect(component_sht_true.state().showHelpText).toEqual(true);
  });

  it("shows the help text after 2 seconds", async () => {
    // TODO - use mock timers instead? didn't work the first time we tried it :(
    const component = shallow(<LoadingPage />);
    expect(component.state().showHelpText).toEqual(false);
    expect(component.find(".Loading-page-text").length).toBe(0);
    await new Promise(r => setTimeout(r, 2000));
    expect(component.state().showHelpText).toEqual(true);
    expect(component.find(".Loading-page-text").length).toBe(1);
  });
});
