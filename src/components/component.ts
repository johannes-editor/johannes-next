interface ComponentConstructor {
    styles?: string;
    tagName?: string;
}

// deno-lint-ignore no-explicit-any
export abstract class Component<P = any, S = any> extends HTMLElement {

    props: P = {} as P;
    state: S = {} as S;
    element!: HTMLElement;
    shadow = this.attachShadow({ mode: 'open' });

    private listeners: Array<[EventTarget, string, EventListenerOrEventListenerObject, boolean?]> = [];

    constructor() {
        super();
    }

    connectedCallback() {
        this.renderDOM();
        this.onMount?.();
    }

    disconnectedCallback() {
        this.onUnmount?.();
        for (const [target, type, listener, options] of this.listeners) {
            target.removeEventListener(type, listener, options);
        }
        this.listeners = [];
    }

    public setState(partial: Partial<S>) {
        const nextState = { ...this.state, ...partial };
        this.state = nextState;
        this.renderDOM();
    }

    protected on(
        target: EventTarget,
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean
    ) {
        target.addEventListener(type, listener, options);
        this.listeners.push([target, type, listener, options]);
    }

    protected injectStyles() {

        if (Object.prototype.hasOwnProperty.call(this, "styles")) {
            console.warn(
                `${this.constructor.name} has 'styles' as an instance property, which will be ignored. ` +
                "Define 'static styles' to apply styles to your component."
            );
        }

        const ctor = this.constructor as ComponentConstructor;
        const styles = ctor.styles;
        if (styles && typeof styles === "string") {
            const styleEl = document.createElement("style");
            styleEl.textContent = styles;
            this.shadow.appendChild(styleEl);
        }
    }

    private renderDOM() {
        this.shadow.innerHTML = "";
        this.injectStyles();
        this.shadow.appendChild(this.render());
    }

    abstract render(): HTMLElement;

    onMount?(): void;
    onUnmount?(): void;
}