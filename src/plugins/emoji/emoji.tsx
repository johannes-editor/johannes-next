/** @jsx h */
import { h } from "../../jsx.ts";
import { Plugin } from "../plugin.ts";
import { SlashMenuPluginExtension, SLASH_MENU_PLUGIN_TYPE } from "../slash-menu/slash-menu-plugin.tsx";
import { EmojiPickerOverlay } from "./components/emoji-picker-overlay.tsx";
import { appendOnEditor } from "../../core/editor-manager/index.ts";

/**
 * Example plugin that extends the SlashMenu.
 *
 * Implements `SlashMenuPluginExtension` to appear as a custom item in the menu.
 * When selected, inserts an emoji into the editor.
 */
export class EmojiPlugin extends Plugin implements SlashMenuPluginExtension {

    range: Range | null = null;
    /**
     * Discriminator used by the system to identify this plugin as a SlashMenu extension.
     * Must be set to `SLASH_MENU_PLUGIN_TYPE`.
     */
    public readonly type = SLASH_MENU_PLUGIN_TYPE;

    label: string = "Emoji";

    /**
     * Inserts the specified content (emoji) into the editor's content area.
     * @param content The HTML string to insert.
     */
    insert(content: string) {
        const contentNode = document.getElementById("content")!;
        contentNode.insertAdjacentHTML("beforeend", content);
    }

    /**
     * Handles the SlashMenu item selection.
     * Inserts the emoji into the editor content.
     */
    onSelect(): void {
        // this.insert('😎');

        // insertIntoBlockAtCaret('😎', this.range);

        appendOnEditor(
            <EmojiPickerOverlay range={this.range} />
        )
    }


    onMounted(): void {

        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            this.range = selection.getRangeAt(0).cloneRange();
        } else {
            this.range = null;
        }

        console.log("montado. range: ", this.range);
    }

    override setup(_root: HTMLElement): void {
        // No setup required for this extension plugin.
    }
}