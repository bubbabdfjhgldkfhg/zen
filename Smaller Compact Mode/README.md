# Smaller Compact Mode

A maintained rebuild of **Smaller Compact Mode** for the [Zen Browser](https://zen-browser.app/). The original mod by [@n7itro](https://github.com/n7itro) no longer works with modern releases of Zen; this update restores the compact density experience while keeping parity with the latest UI changes.

## Features

- Reduced toolbar, url bar, and tab heights for a dense layout
- Compact spacing for menus, panels, download list, and bookmarks sidebar
- Compatible with both horizontal and vertical tab layouts
- Lightweight CSS-only implementation with no scripting required

## Installation

1. Clone or download this repository from <https://github.com/bubbabdfjhgldkfhg/zen-mods/blob/main/Smaller%20Compact%20Mode/>.
2. In Zen Browser, open **Settings → Zen Mods**.
3. Choose **Import mod** and select the `Smaller Compact Mode` directory.
4. Enable the mod and restart Zen if prompted.

## File structure

```
Smaller Compact Mode/
├── mod.json
└── styles/
    ├── compact-chrome.css
    └── compact-content.css
```

- `mod.json` describes the mod metadata and CSS entrypoints used by Zen.
- `styles/compact-chrome.css` applies chrome-level tweaks (toolbars, tabs, panels).
- `styles/compact-content.css` applies content/menupanel density tweaks.

## Credits

- Original concept and assets: [@n7itro](https://github.com/n7itro)
- Maintenance and updates for modern Zen releases: Zen Mods maintainers

## License

Released under the MIT License. See `mod.json` for details.
