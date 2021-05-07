import { DEFAULT_PHOTO_NAME, PHOTO_NAMES } from 'constants';
import ProfilePanel from 'components/common/ProfilePanel';
import Radio from 'components/common/Radio.js';
import { shallow } from 'enzyme';
import React from 'react';
import ReactModal from 'react-modal';

const validOptions = [
  {
    display: 'Nice',
    value: 'banana',
  },
  {
    display: 'Cool',
    value: 'apple',
  },
  {
    display: 'Fun',
    value: 'pear',
  },
];

describe('Radio', () => {
  it('smoke test', () => {
    const component = shallow(<Radio />);
    expect(component.exists()).toBe(true);
  });

  it('handles valid and invalid options prop', () => {
    //no options passed in, expect lenght of options to be 0
    const component = shallow(<Radio />);
    expect(component.find('.radio-option')).toHaveLength(0);

    //3 options passed in, expect 3 options
    const component2 = shallow(<Radio options={validOptions} />);
    expect(component2.find('.radio-option')).toHaveLength(3);
  });

  it('handles containerStyle prop', () => {
    //pass in css prop, expect that prop to be reflected
    const component = shallow(<Radio containerStyle={{ left: 100 }} />);
    expect(component.find('.radio-selector').get(0).props.style.left).toBe(100);
  });

  it('handles undefined handleClick prop', () => {
    //on click option, invalid handle click does not cause error
    const component = shallow(<Radio options={validOptions} />);
    component
      .find('.radio-option')
      .at(0)
      .simulate('click');
  });

  it('defaultSelected prop works properly', () => {
    //if default selected is passed in, that option should be styled differently
    const component = shallow(<Radio options={validOptions} defaultSelected={'pear'} />);
    expect(component.find('.radio-option-selected').text()).toEqual('Fun');
  });

  it('left and rightmost options are styled properly', () => {
    //the 1st and last elements are styled with the correct id
    const component = shallow(<Radio options={validOptions} />);
    expect(component.find('#radio-left').text()).toEqual('Nice');
    expect(component.find('#radio-right').text()).toEqual('Fun');
  });

  it('option styling overrides work properly', () => {
    //check optionStyle works
    const component = shallow(
      <Radio options={validOptions} optionStyle={{ width: 2000 }} defaultSelected={'pear'} />,
    );
    expect(component.find('.radio-option').get(0).props.style.width).toBe(2000);
    expect(component.find('.radio-option-selected').get(0).props.style.width).toBe(2000);

    //check selectedOptionStyle works
    const component2 = shallow(
      <Radio
        options={validOptions}
        optionStyle={{ width: 2000, backgroundColor: '#FFF' }}
        selectedOptionStyle={{ backgroundColor: '#000', color: '#111' }}
        defaultSelected={'pear'}
      />,
    );
    expect(component2.find('.radio-option-selected').get(0).props.style.backgroundColor).toBe(
      '#000',
    );
    expect(component2.find('.radio-option-selected').get(0).props.style.color).toBe('#111');
    expect(component2.find('.radio-option').get(0).props.style.backgroundColor).toBe('#FFF');

    //check selectedBgColor and selectedColor works
    const component3 = shallow(
      <Radio
        options={validOptions}
        optionStyle={{ width: 2000, height: 2000, backgroundColor: '#FFF' }}
        selectedOptionStyle={{ height: 1000, backgroundColor: '#000', color: '#222' }}
        selectedBgColor={'#777'}
        selectedColor={'#111'}
        defaultSelected={'pear'}
      />,
    );
    expect(component3.find('.radio-option-selected').get(0).props.style.backgroundColor).toBe(
      '#777',
    );
    expect(component3.find('.radio-option-selected').get(0).props.style.color).toBe('#111');

    //check bgColor and color props work
    const component4 = shallow(
      <Radio
        options={validOptions}
        optionStyle={{ width: 2000, height: 2000, backgroundColor: '#FFF', color: '#000' }}
        bgColor={'#333'}
        color={'#444'}
      />,
    );
    expect(component4.find('.radio-option').get(0).props.style.backgroundColor).toBe('#333');
    expect(component4.find('.radio-option').get(0).props.style.color).toBe('#444');
  });

  it('clicking an option triggers the handleClick function', () => {
    const clickFn = jest.fn(val => val);

    //check that clicking the selected value calls the handleClick fn
    const component = shallow(
      <Radio options={validOptions} handleClick={clickFn} defaultSelected={'pear'} />,
    );
    component.find('.radio-option-selected').simulate('click');
    expect(clickFn.mock.calls[0][0]).toBe('pear');

    //clicking a non selected option causes the selected value to change
    component
      .find('.radio-option')
      .at(0)
      .simulate('click');
    expect(clickFn.mock.calls[1][0]).toBe('banana');
    expect(component.state().selected).toBe('banana');
    expect(component.find('.radio-option-selected').text()).toBe('Nice');
  });

  it('prop allowMultipleSelected works properly', () => {
    const clickFn = jest.fn(val => val);

    //check that the default state is an empty array if no default selected
    const component = shallow(
      <Radio options={validOptions} handleClick={clickFn} allowMultipleSelected />,
    );
    expect(component.state().selected).toHaveLength(0);

    //check that the default state prop still works
    const component2 = shallow(
      <Radio
        options={validOptions}
        handleClick={clickFn}
        allowMultipleSelected
        defaultSelected={['banana', 'apple']}
      />,
    );
    expect(component2.state().selected).toStrictEqual(['banana', 'apple']);

    //click on a non selected value, make sure it gets added to the state
    component2.find('.radio-option').simulate('click');
    expect(clickFn.mock.calls[0][0]).toStrictEqual(['banana', 'apple', 'pear']);
    expect(component2.state().selected).toStrictEqual(['banana', 'apple', 'pear']);

    //click on already selected value, make sure it gets removed
    component2
      .find('.radio-option-selected')
      .at(0)
      .simulate('click');
    expect(clickFn.mock.calls[1][0]).toStrictEqual(['apple', 'pear']);
    expect(component2.state().selected).toStrictEqual(['apple', 'pear']);
  });
});
