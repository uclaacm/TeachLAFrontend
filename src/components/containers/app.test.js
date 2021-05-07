// import React from "react";
// import ReactDOM from "react-dom";
// import App from "../app.js";

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
import { shallow } from 'enzyme';
import React from 'react';

describe('LoadingPage', () => {
  it.skip('panelOpen=true snapshot', () => {
    const component = shallow(<OpenPanelButton panelOpen={true} />);

    expect(component).toMatchSnapshot();
  });
});
