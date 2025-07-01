import sampleManifest from './sample/manifest.json' with { type: 'json' };
import calloutManifest from './callout/manifest.json' with { type: 'json' };
import listManifest from './list/manifest.json' with { type: 'json' };

import type { AnyPluginManifest } from './types.ts';

const manifests: AnyPluginManifest[] = [sampleManifest, calloutManifest, listManifest];

export function loadActivePlugins(): AnyPluginManifest[] {
    return manifests.filter((m) => m.active);
}

export { manifests };