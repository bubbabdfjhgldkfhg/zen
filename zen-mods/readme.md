# Tab Preview Hover

Enhanced tab hover effects for Zen Browser, providing better visual feedback when hovering over tabs.

## ⚠️ Important Note

Zen Browser mods are **CSS-only**. This mod provides enhanced tooltips and hover effects, but **not true tab content preview** like vanilla Firefox (which requires JavaScript).

For true tab preview functionality, see the [Full JavaScript Solution](#full-javascript-solution-advanced) section below.

## Features

This CSS-based mod provides:

- ✨ Large, styled tooltips showing tab titles
- 🎨 Tab highlight effects with shadows and lift animation
- 🔍 Optional favicon zoom on hover
- 📝 Option to show full tab title (no truncation)
- ⚙️ Multiple tooltip styles (Default, Minimal, Card)
- 🎛️ Fully customizable via preferences

## Installation

### Method 1: Manual Copy/Paste (Easiest - Recommended)

1. Open Zen Browser
2. Go to `Settings > Zen Mods`
3. Click "Create New Mod" or the "+" button
4. **Copy CSS:**
   - Open `chrome.css` from this folder
   - Copy all content and paste into the CSS editor
5. **Copy Preferences:**
   - Open `preferences.json` from this folder
   - Copy all content and paste into the preferences section
6. Save and enable the mod

### Method 2: Import from JSON (Local Testing)

**Note:** There's a known bug where local imports may not work correctly. Use Method 1 instead.

1. Open `theme-local.json` and update the file paths to match your system
2. Go to `Settings > Zen Mods` → "Import"
3. Select `theme-local.json`

### Method 3: Import from GitHub (After Publishing)

1. Upload this mod to GitHub
2. Update `theme.json` with your GitHub username and repo name
3. Go to `Settings > Zen Mods` → "Import"
4. Paste the raw URL to `theme.json` or upload it
5. Zen will fetch CSS and preferences automatically

## Customization

After installation, you can customize the mod in `Settings > Zen Mods > Tab Preview Hover`:

- **Large Tooltip**: Enable/disable the enhanced tooltip
- **Highlight Effect**: Add shadow and lift animation on hover
- **Favicon Zoom**: Scale up the favicon when hovering
- **Show Full Title**: Display the complete tab title without truncation
- **Tooltip Style**: Choose between Default, Minimal, or Card styles
- **Delay**: Customize how quickly tooltips appear (in milliseconds)
- **Font Size**: Adjust tooltip text size
- **Favicon Scale**: Control how much the favicon zooms

## Full JavaScript Solution (Advanced)

For **true tab preview** with actual page content snapshots (like vanilla Firefox), you need to use JavaScript via userChrome.js.

### Requirements

1. **userChrome.js support** - Requires [xiaoxiaoflood's loader](https://github.com/xiaoxiaoflood/firefox-scripts) or similar
2. **drawWindow API access** - Firefox's tab capture functionality

### Installation Steps

1. Set up userChrome.js support (follow the loader documentation)
2. Create a file called `tabPreview.uc.js` in your `chrome` folder
3. Copy the following JavaScript code:

```javascript
// Tab Preview with Content Capture
(function() {
  'use strict';

  const PREVIEW_DELAY = 300;
  const PREVIEW_SCALE = 0.3;
  let previewContainer = null;
  let previewCanvas = null;
  let hoverTimeout = null;

  function createPreviewContainer() {
    if (previewContainer) return;

    previewContainer = document.createElement('div');
    previewContainer.style.cssText = \`
      position: fixed;
      z-index: 10000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
      border: 1px solid rgba(0,0,0,0.3);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      background: #f9f9fb;
    \`;

    previewCanvas = document.createElement('canvas');
    previewCanvas.style.display = 'block';

    previewContainer.appendChild(previewCanvas);
    document.documentElement.appendChild(previewContainer);
  }

  function removePreview() {
    if (previewContainer) {
      previewContainer.style.opacity = '0';
    }
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
  }

  async function showTabPreview(tab, event) {
    if (!tab?.linkedBrowser) return;

    createPreviewContainer();
    const browser = tab.linkedBrowser;
    const window = browser.contentWindow;

    if (!window) return;

    const width = Math.floor((window.innerWidth || 1024) * PREVIEW_SCALE);
    const height = Math.floor((window.innerHeight || 768) * PREVIEW_SCALE);

    previewCanvas.width = width;
    previewCanvas.height = height;

    const ctx = previewCanvas.getContext('2d');
    ctx.save();
    ctx.scale(PREVIEW_SCALE, PREVIEW_SCALE);

    try {
      ctx.drawWindow(window, 0, 0, width / PREVIEW_SCALE, height / PREVIEW_SCALE, '#fff');
    } catch (e) {
      console.warn('drawWindow failed:', e);
    }

    ctx.restore();

    // Position preview
    let left = event.clientX + 20;
    let top = event.clientY + 20;

    if (left + width > window.innerWidth) {
      left = event.clientX - width - 20;
    }
    if (top + height > window.innerHeight) {
      top = window.innerHeight - height - 20;
    }

    previewContainer.style.left = left + 'px';
    previewContainer.style.top = top + 'px';
    previewContainer.style.opacity = '1';
  }

  function handleTabHover(event) {
    const tab = event.target.closest('.tabbrowser-tab');
    if (!tab || tab.selected) {
      removePreview();
      return;
    }

    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => showTabPreview(tab, event), PREVIEW_DELAY);
  }

  const tabContainer = document.getElementById('tabbrowser-tabs');
  if (tabContainer) {
    tabContainer.addEventListener('mouseover', handleTabHover);
    tabContainer.addEventListener('mouseout', removePreview);
  }

  createPreviewContainer();
})();
```

4. Restart Zen Browser
5. You should now see true tab content previews on hover

### Troubleshooting

- Ensure userChrome.js loader is properly installed
- Check browser console for errors
- Verify `drawWindow` API is enabled in `about:config`

## Comparison

| Feature | CSS Mod (This) | JavaScript Solution |
|---------|----------------|---------------------|
| Enhanced tooltips | ✅ | ✅ |
| Tab highlighting | ✅ | ✅ |
| Favicon zoom | ✅ | ✅ |
| **Actual page preview** | ❌ | ✅ |
| Easy installation | ✅ | ❌ |
| Requires setup | ❌ | ✅ |

## License

Free to use and modify.

## Credits

Created for Zen Browser community.
