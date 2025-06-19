/** @jsx h */
import { h } from './jsx.ts';
import { t, setLocale } from './i18n/mod.ts';

export { setLocale };

export function initEditor(root: HTMLElement) {
  const lang = root.getAttribute('lang') || 'en';
  setLocale(lang);
  root.replaceChildren(
    <h1 data-placeholder={t('untitled')}></h1>,
    <p data-placeholder={t('startTyping')} ></p>,
  );
}