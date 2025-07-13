# Plugin Development

Plugins are stored in the `plugins` directory. Each plugin resides in its own
folder and must contain at least a `manifest.json` file describing its
metadata.

## Manifest fields

- `name` – the plugin name.
- `author` – plugin author.
- `version` – plugin version.
- `active` – whether the plugin should be loaded when the editor starts.

Additional fields are defined by plugin type. For example a Slash Menu plugin
provides a `slashMenuItems` array describing items to insert via the slash
menu.

## Activation

Plugins listed in `plugins/index.ts` are bundled with the editor. Set `active`
to `true` or `false` within a manifest to enable or disable a plugin.

## Examples

- `sample` – minimal plugin containing only a manifest.
- `callout` – a more advanced plugin with its own TSX component and a quick
  menu item that inserts a callout block.