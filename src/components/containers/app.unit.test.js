import { shallow } from 'enzyme';
import React from 'react';
import OpenPanelButton from '../common/OpenPanelButton';

describe('LoadingPage', () => {
  it.skip('panelOpen=true snapshot', () => {
    const component = shallow(<OpenPanelButton panelOpen />);

    expect(component).toMatchSnapshot();
  });
});
