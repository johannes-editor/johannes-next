
export abstract class Plugin {
    
    /**
     * Essa funcao é responsavel por inicializar o plugin
     * @param root 
     * @param plugins 
     */
    abstract setup(root: HTMLElement, plugins: Plugin[] ): void;
}