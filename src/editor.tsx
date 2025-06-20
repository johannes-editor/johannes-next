/** @jsx h */
import { h } from './jsx.ts';
import { t, setLocale } from "./i18n/index.ts";
import { CounterToggle } from './components/CounterToggle.tsx';

export { setLocale };

export async function initEditor(root: HTMLElement) {
  const lang = root.getAttribute('lang') || 'en';
  await setLocale(lang);
  root.replaceChildren(
    <h1 data-placeholder={t('untitled')}></h1>,
    <p data-placeholder={t('startTyping')} ></p>,
    <CounterToggle />,
  );
}