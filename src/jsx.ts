import { Component } from "./component.ts";

export function h(tag: any, props: Record<string, any> | null, ...children: any[]) {
    if (typeof tag === 'function') {
        if (tag.prototype instanceof Component) {
            const tagName = tag.tagName ?? "x-" + toKebabCase(tag.name);

            if (!customElements.get(tagName)) {
                customElements.define(tagName, tag);
            }
            const el = document.createElement(tagName);

            if (props) {
                (el as any).props = props;
            }

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
            } else if (key !== "children") {
                el.setAttribute(key, String(value));
            }
        }
    }

    for (const child of children.flat()) {
        if (child == null || typeof child === "boolean") continue;
        el.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }

    return el;
}

function toKebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function Fragment(props: { children?: any[] }) {
    const frag = document.createDocumentFragment();
    for (const child of props.children || []) {
        if (child == null || typeof child === "boolean") continue;
        frag.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }
    return frag;
}