import { EditorPlugin } from "../editor-plugin.ts";
import { SlashMenuExtensionEditorPlugin } from "../slash-menu/slash-menu-plugin.tsx";

export class EmojiPlugin extends EditorPlugin implements SlashMenuExtensionEditorPlugin {
    
    label: string = "Emoji";

    insert(content: string) {
        const contentNode = document.getElementById("content")!;
        contentNode.insertAdjacentHTML("beforeend", content);
    }
    
    onSelect(): void {
      this.insert('😎');
    }
    
    override setup(root: HTMLElement): void {
        console.log("initialized!!!!!!!");
    }
}