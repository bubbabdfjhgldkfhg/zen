// Tab Preview with Content Capture for Zen Browser
// Requires userChrome.js loader: https://github.com/xiaoxiaoflood/firefox-scripts
// Place this file in your chrome folder and restart Zen Browser

(function() {
  'use strict';

  const PREVIEW_DELAY = 300; // milliseconds before preview shows
  const PREVIEW_SCALE = 0.3; // 30% of original size
  const PREVIEW_OFFSET = 20; // pixels from cursor

  let previewContainer = null;
  let previewCanvas = null;
  let previewTitle = null;
  let hoverTimeout = null;
  let currentTab = null;

  function createPreviewContainer() {
    if (previewContainer) return;

    previewContainer = document.createElement('div');
    previewContainer.style.cssText = `
      position: fixed;
      z-index: 10000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      background: #f9f9fb;
      max-width: 400px;
      max-height: 300px;
    `;

    previewCanvas = document.createElement('canvas');
    previewCanvas.style.cssText = `
      display: block;
      width: 100%;
      height: 100%;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    `;

    previewTitle = document.createElement('div');
    previewTitle.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.75);
      color: white;
      padding: 8px 12px;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      backdrop-filter: blur(4px);
    `;

    previewContainer.appendChild(previewCanvas);
    previewContainer.appendChild(previewTitle);
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
    currentTab = null;
  }

  function positionPreview(event) {
    if (!previewContainer) return;

    const x = event.clientX;
    const y = event.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const previewWidth = previewContainer.offsetWidth;
    const previewHeight = previewContainer.offsetHeight;

    let left = x + PREVIEW_OFFSET;
    let top = y + PREVIEW_OFFSET;

    // Keep preview within window bounds
    if (left + previewWidth > windowWidth) {
      left = x - previewWidth - PREVIEW_OFFSET;
    }
    if (top + previewHeight > windowHeight) {
      top = windowHeight - previewHeight - PREVIEW_OFFSET;
    }
    if (left < 0) left = PREVIEW_OFFSET;
    if (top < 0) top = PREVIEW_OFFSET;

    previewContainer.style.left = left + 'px';
    previewContainer.style.top = top + 'px';
  }

  async function showTabPreview(tab, event) {
    if (!tab || !tab.linkedBrowser) return;

    createPreviewContainer();
    currentTab = tab;

    // Set title
    previewTitle.textContent = tab.label || 'Untitled';

    try {
      const browser = tab.linkedBrowser;
      const win = browser.contentWindow;

      if (!win) {
        console.warn('Cannot access tab content window');
        return;
      }

      // Get the dimensions
      const windowWidth = win.innerWidth || 1024;
      const windowHeight = win.innerHeight || 768;

      // Set canvas size based on scale
      const canvasWidth = Math.floor(windowWidth * PREVIEW_SCALE);
      const canvasHeight = Math.floor(windowHeight * PREVIEW_SCALE);

      previewCanvas.width = canvasWidth;
      previewCanvas.height = canvasHeight;

      // Update container size
      previewContainer.style.width = canvasWidth + 'px';
      previewContainer.style.height = canvasHeight + 'px';

      // Position preview
      positionPreview(event);

      // Draw the preview
      const ctx = previewCanvas.getContext('2d');
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.save();
      ctx.scale(PREVIEW_SCALE, PREVIEW_SCALE);

      try {
        ctx.drawWindow(
          win,
          0, 0,
          windowWidth, windowHeight,
          'rgb(255, 255, 255)'
        );
      } catch (e) {
        console.warn('drawWindow failed:', e);
        // Fallback: show placeholder
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, windowWidth, windowHeight);
        ctx.fillStyle = '#333';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Preview unavailable', windowWidth / 2, windowHeight / 2);
      }

      ctx.restore();

      // Show the preview
      if (currentTab === tab) {
        previewContainer.style.opacity = '1';
      }

    } catch (error) {
      console.error('Error generating tab preview:', error);
    }
  }

  function handleTabHover(event) {
    const tab = event.target.closest('.tabbrowser-tab');

    if (!tab) {
      removePreview();
      return;
    }

    // Don't show preview for the active tab
    if (tab.selected) {
      removePreview();
      return;
    }

    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    // Set new timeout
    hoverTimeout = setTimeout(() => {
      showTabPreview(tab, event);
    }, PREVIEW_DELAY);
  }

  function handleMouseMove(event) {
    if (previewContainer && previewContainer.style.opacity === '1') {
      positionPreview(event);
    }
  }

  function init() {
    const tabContainer = document.getElementById('tabbrowser-tabs');

    if (!tabContainer) {
      setTimeout(init, 100);
      return;
    }

    console.log('Tab Preview userChrome.js initialized');

    // Add event listeners
    tabContainer.addEventListener('mouseover', handleTabHover);
    tabContainer.addEventListener('mouseout', removePreview);
    tabContainer.addEventListener('mousemove', handleMouseMove);

    // Create the preview container
    createPreviewContainer();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
