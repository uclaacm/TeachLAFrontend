import { shallow } from 'enzyme';
import React from 'react';
import CreateUserForm from './CreateUserForm';

describe('CreateUserForm', () => {
  it('smoke test', () => {
    const component = shallow(<CreateUserForm />);
    expect(component.exists()).toBe(true);
  });

  it('spinner shows up on waiting', () => {
    //check spinner shows up on waiting=true
    const component = shallow(<CreateUserForm />);

    expect(component.find('.login-form-loader')).toHaveLength(0);
    component.setState({ waiting: true });
    expect(component.find('.login-form-loader')).toHaveLength(1);
  });

  //TODO

  //test re-direct
});
