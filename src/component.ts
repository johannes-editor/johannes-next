export interface ComponentProps {
    // deno-lint-ignore no-explicit-any
    children?: any[];
    // deno-lint-ignore no-explicit-any
    [key: string]: any;
}

export interface T extends Component {

}

export abstract class Component<P = any, S = any> {
    props: P;
    state?: S;
    el!: HTMLElement;
    onMount?(): void;
    onUnmount?(): void;

    private _listeners: Array<[EventTarget, string, EventListenerOrEventListenerObject, boolean?]> = [];

    constructor(props: P) {
        this.props = props;
    }

    protected on(
        target: EventTarget,
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean
    ) {
        target.addEventListener(type, listener, options);
        this._listeners.push([target, type, listener, options]);
    }

    abstract render(): HTMLElement;

    setState(partialState: Partial<S>) {
        this.state = { ...this.state, ...partialState } as S;
        this.rerender();
    }

    rerender() {
        if (!this.el) return;

        for (const child of Array.from(this.el.childNodes)) {
            const comp = (child as any).__componentInstance;
            if (comp) comp.unmount();
        }

        this.removeAllListeners();

        const newEl = this.render();
        this.el.replaceWith(newEl);
        this.el = newEl;
        if (typeof this.onMount === 'function') {
            this.onMount();
        }
    }


    mount(): HTMLElement {
        const element = this.render();
        this.el = element;
        if (typeof this.onMount === 'function') {
            this.onMount();
        }
        return element;
    }

    unmount(): void {
        if (typeof this.onUnmount === 'function') {
            this.onUnmount();
        }

        this.removeAllListeners();

        if (this.el) {
            this.unmountAllComponents(this.el);
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }
    }


    private removeAllListeners() {
        this._listeners.forEach(([target, type, listener, options]) => {
            target.removeEventListener(type, listener, options);
        });
        this._listeners = [];
    }

    private unmountAllComponents(parent: Node) {
        for (const child of Array.from(parent.childNodes)) {
            const comp = (child as any).__componentInstance;
            if (comp && typeof comp.unmount === 'function') {
                comp.unmount();
            }
            this.unmountAllComponents(child);
        }
    }
}