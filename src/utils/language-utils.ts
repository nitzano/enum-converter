import { Language, LanguageSuffix } from './language.enums';

export function languageToSuffix(language: Language): LanguageSuffix {
  return LanguageSuffix[language as any] as LanguageSuffix;
}

export function suffixToLanguage(suffix: LanguageSuffix): Language {
  return LanguageSuffix[suffix as any] as Language;
}
