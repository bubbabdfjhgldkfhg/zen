**Zen Mods**
- Vertical Split Tab Groups
- Back Fwd Always Hidden
- SuperPins (just to uncheck "Shows the workspace-indicator between Essentials and Pins")

**Keyboard Shortcuts**
- Toggle Sidebar's Width -> ⌃⌥S

**about:config**
- browser.tabs.hoverPreview.enabled -> true
- browser.urlbar.trimURLs -> false
- browser.urlbar.suggest.history -> false
- browser.urlbar.suggest.recentsearches -> false
- browser.urlbar.suggest.searches -> false

**userChrome.css**

/*
.zen-toolbar-background {
  background: transparent !important;
}
*/

/* URL Bar - Show results only when typing */
#urlbar .urlbarView-body-inner {
  display: none !important;
} 
#urlbar[usertyping] .urlbarView-body-inner {
  display: block !important;
}
