export interface PluginManifest {
    name: string;
    path: string;
    class: string;
    active: boolean;

    version?: string;
    author?: string;
    description?: string;
    license?: string;
}