// import {nameToMode} from './helpers.js'
import { MODE_MAP, JAVASCRIPT, HTML, PROCESSING, PYTHON, DEFAULT_MODE } from "./index";

// testing nameToMode to ensure all possible languages return correct modes and incorrect
// language name returns the default mode
xit("nameToMode returns correct modes for all supported languages", () => {
  expect(nameToMode(PYTHON)).toBe(MODE_MAP[PYTHON]);
  expect(nameToMode(JAVASCRIPT)).toBe(MODE_MAP[JAVASCRIPT]);
  expect(nameToMode(HTML)).toBe(MODE_MAP[HTML]);
  expect(nameToMode(PROCESSING)).toBe(MODE_MAP[PROCESSING]);
});

xit("nameToMode returns the default mode for an unsupported or invalid language string", () => {
  expect(nameToMode(".sdfosjdRiua?$``sdjfus5")).toBe(DEFAULT_MODE);
  expect(nameToMode("Pyton")).toBe(DEFAULT_MODE);
  expect(nameToMode("")).toBe(DEFAULT_MODE);
});
