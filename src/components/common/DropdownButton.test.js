import { shallow } from 'enzyme';
import React from 'react';
import { DropdownItem } from 'reactstrap';
import DropdownButton from './DropdownButton';

const validDropdownItems = [
  {
    display: 'Nice',
    value: 'banana',
    icon: 'cubes',
  },
  {
    display: 'Cool',
    value: 'apple',
    icon: 'mobile',
  },
  {
    display: 'Fun',
    value: 'pear',
    icon: 'wind',
  },
];

describe('DropdownButton', () => {
  it('smoke test', () => {
    const component = shallow(<DropdownButton DropdownItems={validDropdownItems} />);
    expect(component.exists()).toBe(true);
  });

  it('renders every dropdown item correctly', () => {
    const component = shallow(
      <DropdownButton
        icon="bacteria"
        DropdownItems={validDropdownItems}
        defaultOpen
        displayValue="bar"
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('handles defaultOpen properly', () => {
    const componentTrue = shallow(
      <DropdownButton
        icon="lungs"
        DropdownItems={validDropdownItems}
        defaultOpen
        displayValue="foo"
      />,
    );
    expect(componentTrue).toMatchSnapshot();

    const componentDefault = shallow(
      <DropdownButton icon="lungs" DropdownItems={validDropdownItems} displayValue="foo" />,
    );
    expect(componentDefault).toMatchSnapshot();

    const componentFalse = shallow(
      <DropdownButton
        icon="lungs"
        DropdownItems={validDropdownItems}
        defaultOpen={false}
        displayValue="foo"
      />,
    );
    expect(componentFalse).toMatchSnapshot();
  });

  it('clicking an option triggers the handleClick function', () => {
    const clickFn = jest.fn(({ display, value, icon }) => ({ display, value, icon }));

    // check that clicking the selected value calls the handleClick fn

    const component = shallow(
      <DropdownButton
        icon="lungs"
        DropdownItems={validDropdownItems}
        defaultOpen
        displayValue="foo"
        displayClass="bar"
        onSelect={clickFn}
      />,
    );

    component.find(DropdownItem).at(0).simulate('click');
    expect(clickFn.mock.calls[0][0]).toStrictEqual({
      dirty: undefined,
      display: 'Nice',
      value: 'banana',
    });

    const component2 = shallow(
      <DropdownButton
        icon="bacteria"
        DropdownItems={validDropdownItems}
        defaultOpen
        displayValue="foo"
        displayClass="bar"
        onSelect={clickFn}
      />,
    );

    component2.find(DropdownItem).at(1).simulate('click');
    expect(clickFn.mock.calls[1][0]).toStrictEqual({
      dirty: undefined,
      display: 'Cool',
      value: 'apple',
    });
  });
});
