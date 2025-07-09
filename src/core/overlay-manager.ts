import { EventTypes } from "../utils/event-types.ts";
import { KeyboardKeys } from "../utils/keyboard-keys .ts";

export class OverlayManager {

    private stack: HTMLElement[] = [];

    private static _instance: null | OverlayManager = null;

    private constructor() {
        document.addEventListener(EventTypes.KeyDown, (e) => this.handleKey(e));
    }

    public push(element: HTMLElement) {
        this.stack.push(element);
    }

    public pop() {
        const element = this.stack.pop();

        if (element) {
            element.remove();
        }
    }

    static instance(): OverlayManager {
        if (this._instance == null) {
            this._instance = new OverlayManager();
        }

        return this._instance;
    }

    private readonly handleKey = (e: KeyboardEvent) => {
        if (e.key === KeyboardKeys.Escape) {
            this.pop();
        }
    };
}