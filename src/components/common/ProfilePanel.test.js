import { shallow } from 'enzyme';
import React from 'react';
import { DEFAULT_PHOTO_NAME, PHOTO_NAMES } from '../../constants';
import ProfilePanel from './ProfilePanel';

describe('ProfilePanel', () => {
  it('smoke test', () => {
    const component = shallow(<ProfilePanel />);
    expect(component.exists()).toBe(true);
  });

  it('handles photoName prop properly', () => {
    const component = shallow(<ProfilePanel uid="foo" />);
    expect(component.find('.panel-image').get(0).props.src).toBe(PHOTO_NAMES[DEFAULT_PHOTO_NAME]);

    const name = Object.keys(PHOTO_NAMES)[1];
    const component2 = shallow(<ProfilePanel uid="foo" photoName={name} />);
    expect(component2.find('.panel-image').get(0).props.src).toBe(PHOTO_NAMES[name]);
  });

  it('Buttons change based on content type', () => {
    const component = shallow(<ProfilePanel uid="foo" contentType="sketches" />);
    expect(component.find('#editor-button').length).toBeGreaterThan(0);
    expect(component.find('#sign-out-button').exists()).toBe(true);

    const component2 = shallow(<ProfilePanel uid="foo" contentType="editor" />);
    expect(component2.find('#sketches-button').exists()).toBe(true);
    expect(component2.find('#sign-out-button').exists()).toBe(true);
  });

  it('togglePanel called when button is clicked', () => {
    const clickFn = jest.fn();
    const component = shallow(<ProfilePanel togglePanel={clickFn} />);

    component.find('.panel-collapse-button').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });

  it('left and screenHeight used in styling', () => {
    const component = shallow(<ProfilePanel left={10} screenHeight={100} />);

    const { style } = component.get(0).props;

    expect(style.height).toBe(100);
    expect(style.left).toBe(10);
  });

  it('handles displayName prop properly', () => {
    const component = shallow(<ProfilePanel uid="foo" />);

    expect(component.find('.panel-image').get(0).props.src).toBe(PHOTO_NAMES[DEFAULT_PHOTO_NAME]);

    const name = Object.keys(PHOTO_NAMES)[1];
    const component2 = shallow(<ProfilePanel uid="foo" photoName={name} />);

    expect(component2.find('.panel-image').get(0).props.src).toBe(PHOTO_NAMES[name]);
  });

  it('changing the panel image works', () => {
    const clickFn = jest.fn((photo) => photo);
    const component = shallow(<ProfilePanel uid="foo" setPhotoName={clickFn} />);

    expect(component.find('.panel-image').get(0).props.src).toBe(PHOTO_NAMES[DEFAULT_PHOTO_NAME]);

    // hover over the panel image
    expect(component.find('.image-edit-button')).toBe(null);
    component.find('.panel-image-container').simulate('mouseenter');
    expect(component.find('.image-edit-button')).toBe(true);

    // click the pencil icon (opens modal)
    expect(component.state().showModal).toBe(false);
    expect(component.find('.image-selector').prop('isOpen')).toEqual(false);
    component.find('.image-edit-button').simulate('click');
    expect(component.state().showModal).toBe(true);
    expect(component.find('.image-selector').prop('isOpen')).toEqual(true);

    // //select an option, check if state updates
    // component
    //   .find(".gallery-item")
    //   .at(3)
    //   .simulate("click");
    // expect(component.state().selectedImage).toBe(Object.keys(PHOTO_NAMES)[3]);

    // //submit change
    // component.find("#modal-change-image-button").simulate("click");
    // expect(component.find(ReactModal).prop("isOpen")).toEqual(false);
    // expect(component.state().showModal).toBe(false);
    // expect(clickFn.mock.calls[0][0] == Object.keys(PHOTO_NAMES)[3]);

    // unhover the panel image
    expect(component.find('.image-edit-button')).toBe(true);
    component.find('.panel-image-container').simulate('mouseleave');
    expect(component.find('.image-edit-button')).toBe(false);
  });

  it('changing the display name works', () => {
    const clickFn = jest.fn((name) => name);
    const component = shallow(
      <ProfilePanel uid="foo" displayName="Mark" setDisplayName={clickFn} />,
    );

    expect(component.find('.panel-name-text').text()).toBe('Mark');

    // hover over the panel name
    expect(component.find('.edit-icon-image')).toBe(null);
    component.find('.panel-name').simulate('mouseenter');
    expect(component.find('.edit-icon-image')).toBe(true);

    // click the pencil icon (changes to input)
    expect(component.state().editingName).toBe(false);
    component.find('.edit-icon-image').simulate('click');
    expect(component.state().editingName).toBe(true);
    expect(component.find('.panel-edit-container')).toHaveLength(1);

    // check the input value starts as 'Mark', type in the input 'Not Mark',
    // check that the input value and state changes to 'Not Mark'
    expect(component.state().name).toBe('Mark');
    expect(component.find('.panel-edit').props().value).toBe('Mark');
    component.find('.panel-edit').simulate('change', {
      target: {
        value: 'Not Mark',
      },
    });
    expect(component.find('.panel-edit').props().value).toBe('Not Mark');
    expect(component.state().name).toBe('Not Mark');

    // submit change
    component.find('.panel-edit-container').simulate('submit', { preventDefault: () => {} });
    expect(component.state().showModal).toBe(false);
    expect(clickFn.mock.calls[0][0]).toBe('Not Mark');
    expect(component.state().name).toBe('Not Mark');
    expect(component.state().editingName).toBe(false);
    expect(component.state().displayNameMessage).toBe('');

    // unhover the panel name
    expect(component.find('.edit-icon-image')).toBe(true);
    component.find('.panel-name').simulate('mouseleave');
    expect(component.find('.edit-icon-image')).toBe(false);
  });

  // TODO:

  // test the non-logged in profile panel!

  // test that onBlur causes a submit for the display name input

  // test the options list buttons onclick functionality

  // test badInputs

  // test the error messages

  // test state.redirect
});
