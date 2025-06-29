import { SlashMenuContext, SlashMenuPlugin } from "../slash-menu-plugin.ts";

export class EmojiPlugin extends SlashMenuPlugin {
    override title: string;
    override description?: string | undefined;

    constructor() {
        super("Emoji", "Alexandre", true);
        this.title = "Emoji";
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