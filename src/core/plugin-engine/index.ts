import { PluginManager } from "./plugin-manager.ts";

const pluginManager = new PluginManager();

export const init = async (root: HTMLElement) => await pluginManager.init(root);