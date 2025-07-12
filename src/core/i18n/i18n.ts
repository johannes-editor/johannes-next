import { TranslationSchema } from "./types.ts";

export class I18n {
  private currentLocale = 'en';
  private translations: Record<string, TranslationSchema> = {};

  async setLocale(locale: string): Promise<void> {
    if (this.translations[locale]) {
      this.currentLocale = locale;
      return;
    }

    try {
      const module = await import(`./lang/${locale}.ts`);
      this.translations[locale] = module.default;
      this.currentLocale = locale;
    } catch {
      console.warn(`Locale "${locale}" not found. Falling back to 'en'.`);
      const fallback = await import('./lang/en.ts');
      this.translations['en'] = fallback.default;
      this.currentLocale = 'en';
    }
  }

  t(key: keyof TranslationSchema): string {
    return this.translations[this.currentLocale]?.[key] ?? `{{${key}}}`;
  }
}
