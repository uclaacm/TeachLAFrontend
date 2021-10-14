import { shallow, mount } from 'enzyme';
import React from 'react';
import LoadingPage from './LoadingPage';

describe('LoadingPage', () => {
  it('smoke test', () => {
    const component = shallow(<LoadingPage />);
    expect(component.exists()).toBe(true);
  });

  it('should render correctly', () => {
    const component = shallow(<LoadingPage />);

    expect(component).toMatchSnapshot();
  });

  it('should handle showHelpText prop properly', () => {
    const component = shallow(<LoadingPage />);
    expect(component).toMatchSnapshot();

    const component_sht_false = shallow(<LoadingPage showHelpText={false} />);
    expect(component_sht_false.find('.Loading-page-text')).toHaveLength(0);

    const component_sht_true = shallow(<LoadingPage showHelpText />);
    expect(component_sht_true.find('.Loading-page-text')).toHaveLength(1);
  });

  it('shows the help text after 2 seconds', async () => {
    // TODO - use mock timers instead? didn't work the first time we tried it :(
    const component = shallow(<LoadingPage />);
    expect(component.find('.Loading-page-text')).toHaveLength(0);
    await new Promise((r) => setTimeout(r, 2000));
    expect(component.find('.Loading-page-text')).toHaveLength(1);
  });
});
