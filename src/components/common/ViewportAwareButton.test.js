// import { shallow } from 'enzyme';
// import React from 'react';
// 
// import ViewportAwareButton from './ViewportAwareButton';
// 
// describe('<ViewportAwareButton />', () => {
//   it('renders all children when normal sized.', () => {
//     const component = shallow(<ViewportAwareButton isSmall={false} icon={<div />} text="hi" />);
//     expect(component.find('.viewport-aware-button-text')).toHaveLength(1);
//     expect(component.find('div')).toHaveLength(1);
//   });
// 
//   it("doesn't render viewport-aware children when small.", () => {
//     const component = shallow(<ViewportAwareButton isSmall icon={<div />} text="hi" />);
//     expect(component.find('.viewport-aware-button-text')).toHaveLength(0);
//     expect(component.find('div')).toHaveLength(1);
//   });
// });
