/** @jsx h */
import { h } from "../../jsx.ts";
import { EditorPlugin } from "../editor-plugin.ts";
import { SlashMenu } from "./components/slash-menu.tsx";

export interface SlashMenuContext {
    node: Node;
    range: Range;
}

export class SlashMenuPlugin extends EditorPlugin {

    override setup(root: HTMLElement, plugins: EditorPlugin[]): void {

        const extensionPlugins = plugins.filter(isSlashMenuExtensionPlugin);

        root.append(
            <SlashMenu extensionPlugins={extensionPlugins} />
        );
        console.log(plugins);
    }




}

export interface SlashMenuExtensionEditorPlugin {
    label: string;
    onSelect(baseContent: string): void;
}



function isSlashMenuExtensionPlugin(
    plugin: EditorPlugin
): plugin is EditorPlugin & SlashMenuExtensionEditorPlugin {
    return (
        typeof (plugin as any).label === "string" &&
        typeof (plugin as any).onSelect === "function"
    );
}
