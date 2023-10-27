import { shallow } from 'enzyme';
import React from 'react';
import Switch from './Switch.tsx';

const switchOnClass = '.switch-body.switch-on'; // there has to be a better way of doing this
const switchCheckboxClass = '.switch-input';

describe('Switch', () => {
  it('smoke test', () => {
    const component = shallow(<Switch />);
    expect(component.exists()).toBe(true);
  });
  it('handles on prop properly', () => {
    const componentDefault = shallow(<Switch />);
    expect(componentDefault.find(switchOnClass)).toHaveLength(0);

    const componentFalse = shallow(<Switch on={false} />);
    expect(componentFalse.find(switchOnClass)).toHaveLength(0);

    const componentTrue = shallow(<Switch on />);
    expect(componentTrue.find(switchOnClass)).toHaveLength(1);
  });
  it('triggers the onToggle function when clicked', () => {
    const clickFn = jest.fn((val) => val);
    const component = shallow(<Switch on={false} onToggle={clickFn} />);
    expect(component.find(switchOnClass)).toHaveLength(0);

    component.find(switchCheckboxClass).simulate('change', { target: { checked: true } });
    expect(clickFn.mock.calls).toHaveLength(1);
    expect(clickFn.mock.calls[0][0]).toBe(true);

    component.find(switchCheckboxClass).simulate('change', { target: { checked: false } });
    expect(clickFn.mock.calls).toHaveLength(2);
    expect(clickFn.mock.calls[1][0]).toBe(false);
  });
  it('handles the onImg and offImg props properly', () => {
    const clickFn = jest.fn((val) => val);
    const onText = <span id="on-test" />;
    const offText = <span id="off-test" />;
    const component = shallow(
      <Switch on={false} onToggle={clickFn} onImg={onText} offImg={offText} />,
    );

    expect(component.find('#off-test')).toHaveLength(1);
    expect(component.find('#on-test')).toHaveLength(0);

    component.find(switchCheckboxClass).simulate('change', { target: { checked: true } });
    expect(component.find('#off-test')).toHaveLength(0);
    expect(component.find('#on-test')).toHaveLength(1);
  });
});
