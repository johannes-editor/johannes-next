import { EditorManager } from "./editor-manager.ts";

const editorManager = new EditorManager();

export const setRoot = (editorRoot: HTMLElement) => editorManager.setRoot(editorRoot);

export const appendOnEditor = (element: HTMLElement) => editorManager.appendOnEditor(element);
