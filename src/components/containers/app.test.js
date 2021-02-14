// import React from "react";
// import ReactDOM from "react-dom";
// import App from "../app.js";

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
import React from 'react';
import { shallow } from 'enzyme';

describe('LoadingPage', () => {
  xit('panelOpen=true snapshot', () => {
    const component = shallow(<OpenPanelButton panelOpen />);

    expect(component).toMatchSnapshot();
  });
});
