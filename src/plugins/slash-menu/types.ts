import { AnyPluginManifest } from "../../plugins/types.ts";


export interface SlashMenuProps {
    plugins: AnyPluginManifest[];
}

export interface SlashMenuState {
    items: SlashMenuItemData[];
}

export interface SlashMenuItemData {
    label: string;
    content: string;
}