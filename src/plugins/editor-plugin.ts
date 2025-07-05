
export abstract class EditorPlugin {
    
    abstract setup(root: HTMLElement, plugins: EditorPlugin[] ): void;
}