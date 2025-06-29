import type { AnyPluginManifest } from "./types.ts";
import { loadActivePlugins as loadFromIndex } from "./index.ts";

/**
 * Return all active plugins defined in the build generated plugin index.
 */
export function loadActivePlugins(): AnyPluginManifest[] {
    return loadFromIndex();
}