import { SUPPORTED_LANGUAGES } from '../../../util/languages/languages';

export const LanguageDropdownValues = SUPPORTED_LANGUAGES.map(({ value, display }) => ({
  value,
  display,
}));
export const LanguageDropdownDefault = LanguageDropdownValues[0];
