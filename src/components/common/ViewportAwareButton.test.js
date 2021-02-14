import React from 'react';
import { shallow } from 'enzyme';

import ViewportAwareButton from './ViewportAwareButton';

describe('<ViewportAwareButton />', () => {
  it('renders all children when normal sized.', () => {
    const component = shallow(<ViewportAwareButton isSmall={false} icon={<div />} text="hi" />);
    expect(component.find('span') && component.find('div'));
  });

  it("doesn't render viewport-aware children when small.", () => {
    const component = shallow(<ViewportAwareButton isSmall icon={<div />} text="hi" />);
    expect(!component.find('span') && component.find('div'));
  });
});
