// import { shallow } from 'enzyme';
// import React from 'react';
// import ImageSelector from './ImageSelector';
// 
// describe('ProfilePanel', () => {
//   it('smoke test', () => {
//     const component = shallow(<ImageSelector />);
//     expect(component.exists()).toBe(true);
//   });
// 
//   it('displays error message when error prop is passed', () => {
//     const component = shallow(<ImageSelector error="Error!" />);
//     expect(component.find('div.text-danger').text()).toBe('Error!');
//   });
// 
//   it('displays thumbnail when thumbnailPreview prop is passed', () => {
//     const component = shallow(<ImageSelector thumbnailPreview={<img />} />);
//     expect(component.find('div.image-selector-modal-header-thumbnail-container').containsMatchingElement(<img />)).toBe(true);
//   });
// 
//   it('displays gallary when icons prop is passed', () => {
//     const component = shallow(<ImageSelector icons={[<img key="1" />, <img key="2" />, <img key="3" />]} />);
//     expect(component.find('div.image-selector-gallery').contains([<img key="1" />, <img key="2" />, <img key="3" />])).toBe(true);
//   });
// 
//   // TODO: isOpen and closeModal props are passed into ReactModal, needs deep rendering
//   // isOpen={this.state.showModal}
//   // closeModal={this.handleCloseModal}
// });
