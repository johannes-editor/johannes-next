
export abstract class Plugin {
    
    abstract setup(root: HTMLElement, plugins: Plugin[] ): void;
}