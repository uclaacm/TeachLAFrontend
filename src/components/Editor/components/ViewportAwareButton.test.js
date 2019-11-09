import React from "react";
import { shallow } from "enzyme";

import ViewportAwareButton from "./ViewportAwareButton";

describe("<ViewportAwareButton />", () => {
  it("renders all children when normal sized.", () => {
    let component = shallow(
      <ViewportAwareButton isSmall={false}>
        <span className="viewport-aware" />
        <span className="other" />
      </ViewportAwareButton>,
    );

    expect(component.find(".other").length).toBe(1);
    expect(component.find(".viewport-aware").length).toBe(1);
  });

  it("doesn't render viewport-aware children when small.", () => {
    let component = shallow(
      <ViewportAwareButton isSmall={true}>
        <span className="viewport-aware" />
        <span className="other" />
      </ViewportAwareButton>,
    );

    expect(component.find(".other").length).toBe(1);
    expect(component.find(".viewport-aware").length).toBe(0);
  });
});
