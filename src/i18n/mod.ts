import en from './lang/en.ts';
import pt from './lang/pt.ts';
import { Translation } from './translation.ts';

const translations: Record<string, Translation> = { en, pt, };

let currentLocale = 'en';

export function setLocale(locale: string) {
  currentLocale = translations[locale] ? locale : 'en';
}

export function t(key: keyof Translation): string {
  return translations[currentLocale][key];
}

export type { Translation } from './translation.ts';