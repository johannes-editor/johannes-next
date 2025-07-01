import { EditorPlugin } from "../editor-plugin.ts";


export interface SlashMenuContext {
    node: Node;
    range: Range;
}

export abstract class SlashMenuPlugin extends EditorPlugin {

    abstract title: string;
    abstract description?: string;


    abstract onSelect(context: SlashMenuContext): void;
}