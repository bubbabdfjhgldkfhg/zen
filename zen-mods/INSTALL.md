# Quick Installation Guide

## Option 1: CSS Mod (Easy - Recommended)

This gives you enhanced tab hover effects and tooltips.

### Method A: Manual Copy/Paste (Easiest)

1. **Open Zen Browser**
2. **Navigate to Settings** → Zen Mods
3. **Click "Create New Mod"** or **"+"** button
4. **Copy & Paste CSS:**
   - Open `chrome.css` from this folder
   - Copy all content
   - Paste into the CSS editor in Zen Mods
5. **Copy & Paste Preferences:**
   - Open `preferences.json` from this folder
   - Copy all content
   - Paste into the preferences section
6. **Save** and **Enable** the mod
7. **Customize** settings in Zen Mods preferences

### Method B: Import from GitHub (After Hosting)

If you host this mod on GitHub:

1. **Update `theme.json`:**
   - Replace `YOUR-USERNAME` with your GitHub username
   - Replace `zen-tab-preview` with your repository name
2. **Push to GitHub** and ensure files are in the main branch
3. **Open Zen Browser** → Settings → Zen Mods
4. **Click "Import"** button
5. **Upload `theme.json`** or paste its URL
6. Zen will automatically fetch the CSS and preferences from GitHub

### What you get:
- ✅ Large tooltips with tab titles
- ✅ Tab highlight effects on hover
- ✅ Customizable styling and behavior
- ❌ No actual page content preview (CSS limitation)

---

## Option 2: Full JavaScript Preview (Advanced)

This gives you true tab preview with page content snapshots like vanilla Firefox.

### Prerequisites

1. **Install userChrome.js loader**
   - Download from: https://github.com/xiaoxiaoflood/firefox-scripts
   - Follow their installation instructions for Zen Browser

2. **Enable required Firefox preference**
   - Go to `about:config` in Zen Browser
   - Search for `security.fileuri.strict_origin_policy`
   - Set to `false` if needed for local scripts

### Installation

1. **Locate your Zen Browser profile folder**
   - Type `about:support` in the address bar
   - Click "Open Folder" next to "Profile Folder"

2. **Create/navigate to `chrome` folder**
   ```bash
   cd [Your Profile Folder]
   mkdir -p chrome
   cd chrome
   ```

3. **Copy the userChrome.js file**
   - Copy `tabPreview.uc.js` from this mod to your `chrome` folder

4. **Restart Zen Browser**
   - Completely quit and relaunch

5. **Verify it's working**
   - Hover over a tab (not the active one)
   - After 300ms, you should see a live preview of the page

### Troubleshooting

**Preview not showing?**
- Check Browser Console (Ctrl+Shift+J / Cmd+Shift+J) for errors
- Ensure userChrome.js loader is properly installed
- Verify the file is in the correct `chrome` folder
- Check that the file is named `tabPreview.uc.js` (with `.uc.js` extension)

**Permission errors?**
- Check `about:config` for security settings
- Some pages (like `about:*` pages) cannot be captured for security reasons

**Customization:**
Edit these constants at the top of `tabPreview.uc.js`:
```javascript
const PREVIEW_DELAY = 300;  // Change delay in ms
const PREVIEW_SCALE = 0.3;  // Change preview size (0.1 to 1.0)
const PREVIEW_OFFSET = 20;  // Change distance from cursor
```

---

## Which Option Should I Choose?

| Feature | CSS Mod | JavaScript Solution |
|---------|---------|---------------------|
| Installation | Easy ⭐ | Complex |
| Maintenance | Low | Medium |
| Visual effects | ✅ | ✅ |
| Page preview | ❌ | ✅ |
| Security | Safe ⭐ | Requires loader |

**Recommendation:** Start with **Option 1** (CSS Mod). If you need actual page previews and are comfortable with advanced setup, try **Option 2**.

---

## Support

For issues or questions:
- Check `readme.md` for detailed documentation
- Visit Zen Browser community forums
- Review userChrome.js loader documentation if using Option 2

## Uninstalling

**CSS Mod:** Go to Settings → Zen Mods → Remove the mod

**JavaScript:** Delete `tabPreview.uc.js` from your `chrome` folder and restart Zen Browser
