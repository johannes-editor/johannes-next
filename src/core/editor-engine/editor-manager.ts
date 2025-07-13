import { OverlayComponent } from "../../components/overlay-component.ts";

export class EditorManager {

    private editorRoot: HTMLElement | null = null;

    setRoot(editorRoot: HTMLElement) {
        this.editorRoot = editorRoot;
    }

    public appendOverlay(element: OverlayComponent) {
        this.editorRoot?.appendChild(element);
    }
}