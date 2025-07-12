
export class EditorManager {

    private editorRoot: HTMLElement | null = null;
    
    setRoot(editorRoot: HTMLElement){
        this.editorRoot = editorRoot;
    }

    public appendOnEditor(element: HTMLElement){
        this.editorRoot?.appendChild(element);
    }
}