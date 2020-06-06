import {
  MINIMUM_USERNAME_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
  MINIMUM_DISPLAY_NAME_LENGTH,
  MAXIMUM_USERNAME_LENGTH,
  MAXIMUM_PASSWORD_LENGTH,
  MAXIMUM_DISPLAY_NAME_LENGTH,
} from "../constants";

import { isValidUsername, isValidPassword, isValidDisplayName } from "./validate";

const usernameSize = `Username must be between ${MINIMUM_USERNAME_LENGTH}-${MAXIMUM_USERNAME_LENGTH} characters long`;
const usernameBadCharacters = `Username must only use upper case letters, lower case letters, and numbers.`;

const passwordSize = `Password must be between ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long`;

const displayNameSize = `Display name must be between ${MINIMUM_DISPLAY_NAME_LENGTH}-${MAXIMUM_DISPLAY_NAME_LENGTH} characters long`;
const displayNameBadCharacters = `Display name must only use upper case and lower case letters, numbers, spaces, and/or the special characters !@#$%`;

describe("isValidUsername", () => {
  it("accepts a reasonable username", () => {
    expect(isValidUsername("bobbytables").ok).toBe(true);
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

    const result2 = isValidUsername("!#$%###");
    expect(result2.ok).toBe(false);
    expect(result2.message).toBe(usernameBadCharacters);
  });
  it("rejects '@' in a username", () => {
    const result = isValidUsername("bobby@tables");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(usernameBadCharacters);
  });
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
  it("accepts a password with spaces", () => {
    expect(isValidPassword("correct horse battery staple").ok).toBe(true);
  });
  it("accepts a password with special characters", () => {
    expect(isValidPassword("owouwu!@#$%%^^&*%#)(\\").ok).toBe(true);
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
    const result = isValidPassword(
      "supercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocious",
    );
    expect(result.ok).toBe(false);
    expect(result.message).toBe(passwordSize);
  });
});

describe("isValidDisplayName", () => {
  it("accepts a reasonable display name", () => {
    expect(isValidDisplayName("bobbytables").ok).toBe(true);
  });
  it("accepts spaces", () => {
    expect(isValidDisplayName("bobby tables").ok).toBe(true);
  });
  it("accepts a display name with permitted special characters", () => {
    expect(isValidDisplayName("bobby!@#$%").ok).toBe(true);
  });
  it("rejects non-permitted special characters in display name, returns proper error message", () => {
    const result = isValidDisplayName("&^)_([]{}\\");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(displayNameBadCharacters);
  });
  it("rejects empty display name, returns proper error message", () => {
    const result = isValidDisplayName("");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(displayNameSize);
  });
  it("rejects too-long display name, returns proper error message", () => {
    const result = isValidDisplayName("supercalifragilisticexpialidocious");
    expect(result.ok).toBe(false);
    expect(result.message).toBe(displayNameSize);
  });
});
