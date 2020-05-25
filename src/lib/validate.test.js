import {
  MINIMUM_USERNAME_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
  MAXIMUM_USERNAME_LENGTH,
  MAXIMUM_PASSWORD_LENGTH,
} from "../constants";

import { isValidUsername, isValidPassword } from "./validate";

const usernameSize = `Username must be between ${MINIMUM_USERNAME_LENGTH}-${MAXIMUM_USERNAME_LENGTH} characters long`;
const usernameBadCharacters = `Username must only use upper case and lower case letters, numbers, and/or the special characters !@#$%`;

const passwordSize = `Password must be between ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long`;
const passwordBadCharacters = `Password must only use upper case and lower case letters, numbers, and/or the special characters !@#$%`;

describe("isValidUsername", () => {
  it("accepts a reasonable username", () => {
    expect(isValidUsername("bobbytables").ok).toBe(true);
  });
  it("accepts a username with permitted special characters", () => {
    expect(isValidUsername("bobby!@#$%").ok).toBe(true);
  });
  it("rejects spaces in a username, returns proper error message", () => {
    const result = isValidUsername("bobby tables");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(usernameBadCharacters);
  });
  it("rejects non-permitted special characters in username, returns proper error message", () => {
    const result = isValidUsername("&^)_([]{}\\");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(usernameBadCharacters);
  });
  // it("rejects '@' in a username", () => {
  //     const result = isValidUsername("bobby@tables");
  //     expect(result.ok).toBe(false);
  //     expect(result.message).toBe(usernameBadCharacters);
  // });
  it("rejects empty usernames, returns proper error message", () => {
    const result = isValidUsername("");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(usernameSize);
  });
  it("rejects too-long usernames, returns proper error message", () => {
    const result = isValidUsername("supercalifragilisticexpialidocious");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(usernameSize);
  });
});

describe("isValidPassword", () => {
  it("accepts a reasonable password", () => {
    expect(isValidPassword("Tr0ub4dor").ok).toBe(true);
  });
  it("accepts a password with permitted special characters", () => {
    expect(isValidPassword("bobby!@#$%").ok).toBe(true);
  });
  // it("accepts a password with spaces", () => {
  //     expect(isValidPassword("correct horse battery staple").ok).toBe(true);
  // });
  it("rejects non-permitted special characters in password, returns proper error message", () => {
    const result = isValidPassword("&^)_([]{}\\");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(passwordBadCharacters);
  });
  it("rejects empty password, returns proper error message", () => {
    const result = isValidPassword("");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(passwordSize);
  });
  it("rejects too-short passwords, returns proper error message", () => {
    const result = isValidPassword("horse");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(passwordSize);
  });
  it("rejects too-long passwords, returns proper error message", () => {
    const result = isValidPassword("supercalifragilisticexpialidocious");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(passwordSize);
  });
});
