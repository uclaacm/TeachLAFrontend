import { shallow } from 'enzyme';
import React from 'react';

import ViewportAwareButton from './ViewportAwareButton';

describe('<ViewportAwareButton />', () => {
  it('renders all children when normal sized.', () => {
    let component = shallow(<ViewportAwareButton isSmall={false} icon={<div />} text="hi" />);
    expect(component.find('span') && component.find('div'));
  });

  it("doesn't render viewport-aware children when small.", () => {
    let component = shallow(<ViewportAwareButton isSmall={true} icon={<div />} text="hi" />);
    expect(!component.find('span') && component.find('div'));
  });
});
