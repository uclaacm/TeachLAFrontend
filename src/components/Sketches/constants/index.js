import { SUPPORTED_LANGUAGES } from '../../../util/languages/languages.js';

export const LanguageDropdownValues = SUPPORTED_LANGUAGES.map(({ value, display }) => ({
  value,
  display,
}));
export const LanguageDropdownDefault = LanguageDropdownValues[0];
