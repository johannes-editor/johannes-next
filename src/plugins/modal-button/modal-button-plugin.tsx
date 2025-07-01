/** @jsx h */
import { h } from "../../jsx.ts";
import { EditorPlugin } from "../editor-plugin.ts";
import { ModalButtonUI } from "./components/modal-button-ui.tsx";

export class ModalButtonPlugin extends EditorPlugin {
    get name() {
        return "modal-button";
    }

    render() {
        return <ModalButtonUI />;
    }
}