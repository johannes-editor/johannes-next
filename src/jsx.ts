import { Component } from './component.ts';

export function h(tag: any, props: Record<string, any> | null, ...children: any[]) {
  if (typeof tag === 'function') {
    if (tag.prototype instanceof Component) {
      const instance = new tag({ ...(props || {}), children });
      const el = instance.mount();
      (el as any).__componentInstance = instance;
      return el;
    }
    return tag({ ...(props || {}), children });
  }

  const el = document.createElement(tag);
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (key === 'className') {
        el.setAttribute('class', value);
      } else if (key.startsWith('on') && typeof value === 'function') {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, String(value));
      }
    }
  }
  for (const child of children.flat()) {
    if (child == null) continue;
    el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return el;
}

export function Fragment(props: { children?: any[] }) {
  const frag = document.createDocumentFragment();
  for (const child of props.children || []) {
    if (child == null) continue;
    frag.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return frag;
}