import { OverlayManager } from "../../core/overlay-manager.ts";
import { Component } from "../component.ts";

// deno-lint-ignore no-explicit-any
export abstract class Overlay<P = any, S = any> extends Component<P, S> {

    zIndex: number = 1000;

    override connectedCallback(): void {
        super.connectedCallback();

        this.style.zIndex = this.zIndex.toString();
        OverlayManager.instance().push(this);
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        OverlayManager.instance().pop();
    }
}