/** @jsx h */
import { h } from "../../jsx.ts";
import { Plugin } from "../plugin.ts";
import { SlashMenu } from "./components/slash-menu.tsx";

/**
 * The SlashMenuPlugin is an EditorPlugin that integrates a SlashMenu into the editor interface.
 *
 * - The SlashMenu appears when the user triggers a keyboard shortcut (such as pressing the "/" key), and can be hidden the same way.
 * - Menu items allow users to quickly run actions and commands.
 * - You can extend the SlashMenu by creating plugins that implement the `SlashMenuExtensionEditorPlugin` interface—just provide a `label` and an `onSelect()` function, and your plugin will automatically appear as a menu option.
 */
export class SlashMenuPlugin extends Plugin {

    /**
    * Initializes the plugin by appending a SlashMenu to the editor root,
    * including all extension plugins that match the required interface.
    *
    * @param root The editor's root HTMLElement.
    * @param plugins The list of all loaded editor plugins.
    */
    override setup(root: HTMLElement, plugins: Plugin[]): void {

        const extensionPlugins = plugins.filter(isSlashMenuExtensionPlugin);

        root.append(
            <SlashMenu extensionPlugins={extensionPlugins} />
        );
    }
}

/**
 * Interface for plugins that can extend the SlashMenu.
 * Plugins implementing this interface will be shown as items in the menu.
 */
export interface SlashMenuExtensionEditorPlugin {
    /** The display label for the menu item */
    label: string;
    /** The handler invoked when the menu item is selected */
    onSelect(): void;
}

/**
 * Type guard to check if a plugin implements SlashMenuExtensionEditorPlugin.
 * @param plugin The plugin to check.
 * @returns True if the plugin implements the required interface.
 */
function isSlashMenuExtensionPlugin(plugin: Plugin): plugin is Plugin & SlashMenuExtensionEditorPlugin {
    return (
        "label" in plugin &&
        typeof plugin["label"] === "string" &&
        "onSelect" in plugin &&
        typeof plugin["onSelect"] === "function"
    );
}