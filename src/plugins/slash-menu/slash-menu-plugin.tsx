/** @jsx h */
import { h } from "../../jsx.ts";
import { EditorPlugin } from "../editor-plugin.ts";
import { SlashMenu } from "./components/slash-menu.tsx";

export interface SlashMenuContext {
    node: Node;
    range: Range;
}

export class SlashMenuPlugin extends EditorPlugin {
    
    override setup(root: HTMLElement): void {
      root.append(<SlashMenu />);
    }

    // abstract onSelect(context: SlashMenuContext): void;
}