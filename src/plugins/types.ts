import { SlashMenuItemData } from "../components/samples/slash-menu/types.ts";

export interface PluginManifest {
    name: string;
    author: string;
    version: string;
    active: boolean;
}

export interface SlashMenuPluginManifest extends PluginManifest {
    slashMenuItems: SlashMenuItemData[];
}

export type AnyPluginManifest = PluginManifest | SlashMenuPluginManifest;