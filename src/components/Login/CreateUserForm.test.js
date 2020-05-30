import React from "react";
import { shallow } from "enzyme";
import CreateUserForm from "./CreateUserForm";
import {
  MINIMUM_USERNAME_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
  MAXIMUM_USERNAME_LENGTH,
  MAXIMUM_PASSWORD_LENGTH,
} from "../../constants";

describe("CreateUserForm", () => {
  it("smoke test", () => {
    const component = shallow(<CreateUserForm />);
    expect(component.exists()).toBe(true);
  });

  it("checkInputs works properly", () => {
    const component = shallow(<CreateUserForm />);
    const instance = component.instance();

    //checkInputs returns false on username too short
    component.setState({ username: "test" });
    expect(instance.checkInputs()).toBe(false);
    expect(component.state().usernameMessage).toBe(
      `Username must be between ${MINIMUM_USERNAME_LENGTH}-${MAXIMUM_USERNAME_LENGTH} characters long`,
    );

    //returns false on username with not allowed special character
    component.setState({ username: "test;fdsfd" });
    expect(instance.checkInputs()).toBe(false);
    expect(component.state().usernameMessage).toBe(
      `Username must only use upper case and lower case letters, numbers, and/or the special characters !@#$%`,
    );
    expect(component.find(".login-form-input-error").at(0).text()).toBe(
      `Username must only use upper case and lower case letters, numbers, and/or the special characters !@#$%`,
    );

    //returns false on username too long
    component.setState({ username: "testueiowruewoiruewioruwerouweoriuwoiu" });
    expect(instance.checkInputs()).toBe(false);
    expect(component.state().usernameMessage).toBe(
      `Username must be between ${MINIMUM_USERNAME_LENGTH}-${MAXIMUM_USERNAME_LENGTH} characters long`,
    );

    //checkInputs returns false on password too short
    component.setState({ username: "valid222", password: "test" });
    expect(instance.checkInputs()).toBe(false);
    expect(component.state().passwordMessage).toBe(
      `Password must be between ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long`,
    );

    //returns false on password with not allowed special character
    component.setState({ username: "valid222", password: "test;fdsfd" });
    expect(instance.checkInputs()).toBe(false);
    expect(component.state().passwordMessage).toBe(
      `Password must only use upper case and lower case letters, numbers, and/or the special characters !@#$%`,
    );
    expect(component.find(".login-form-input-error").at(0).text()).toBe(
      `Password must only use upper case and lower case letters, numbers, and/or the special characters !@#$%`,
    );

    //returns false on password too long
    component.setState({
      username: "valid222",
      password: "testueiowruewoiruewioruwerouweoriuwoiu",
      confirmPassword: "testueiowruewoiruewioruwerouweoriuwoiu",
    });
    expect(instance.checkInputs()).toBe(false);
    expect(component.state().passwordMessage).toBe(
      `Password must be between ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long`,
    );

    //returns false on not matching passwords
    component.setState({
      username: "valid222",
      password: "valid111",
      confirmPassword: "valid333",
    });
    expect(instance.checkInputs()).toBe(false);
    expect(component.state().passwordMessage).toBe(`Password and Confirm Password don't match`);

    //returns true with valid inputs
    component.setState({ username: "valid222", password: "valid333", confirmPassword: "valid333" });
    expect(instance.checkInputs()).toBe(true);
    expect(component.state().passwordMessage).toBe("");
    expect(component.state().usernameMessage).toBe("");
  });

  it("spinner shows up on waiting", () => {
    //check spinner shows up on waiting=true
    const component = shallow(<CreateUserForm />);

    expect(component.find(".login-form-loader").length).toBe(0);
    component.setState({ waiting: true });
    expect(component.find(".login-form-loader").length).toBe(1);
  });

  //TODO

  //test re-direct
});
