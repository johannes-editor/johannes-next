import { EditorPlugin } from "../editor-plugin.ts";
import { SlashMenuContext } from "../slash-menu/slash-menu-plugin.tsx";

export class EmojiPlugin extends EditorPlugin {
    
    override setup(root: HTMLElement): void {
        console.log("initialized!");
    }

    onSelect(context: SlashMenuContext) {
        const emojiNode = document.createTextNode('😎');
        context.range.insertNode(emojiNode);

        context.range.setStartAfter(emojiNode);
        context.range.collapse(true);

        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(context.range);
        }
    }
}