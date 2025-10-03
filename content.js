// YouTube Fullscreen Focus - Content Script
// Optimized for performance with lazy loading

(function () {
  "use strict";

  // Early exit if not on YouTube or YouTube Kids
  const hostname = window.location.hostname;
  if (
    !hostname.includes("youtube.com") &&
    !hostname.includes("youtubekids.com")
  ) {
    return;
  }

  // State management
  let isFullscreen = false;
  let isEnabled = true;
  let allowedKeys = ["Escape"];
  let isInitialized = false;

  // Defer initialization until user interaction or after page loads
  function deferredInit() {
    if (isInitialized) return;
    isInitialized = true;

    // Load user preferences
    chrome.storage.sync.get(
      {
        enabled: true,
        allowedKeys: ["Escape"],
        showNotifications: true,
      },
      function (settings) {
        isEnabled = settings.enabled;
        allowedKeys = settings.allowedKeys;
      }
    );

    // Listen for storage changes
    chrome.storage.onChanged.addListener(function (changes, namespace) {
      if (namespace === "sync") {
        if (changes.enabled) {
          isEnabled = changes.enabled.newValue;
          updateBlockingState();
        }
        if (changes.allowedKeys) {
          allowedKeys = changes.allowedKeys.newValue;
        }
      }
    });

    // Initialize fullscreen detection
    initializeFullscreenDetection();
  }

  /**
   * Detects if we're on YouTube Kids
   */
  function isYouTubeKids() {
    return hostname.includes("youtubekids.com");
  }

  /**
   * Detects fullscreen state changes
   */
  function detectFullscreenChange() {
    const wasFullscreen = isFullscreen;

    // Check for fullscreen
    isFullscreen = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    // YouTube-specific check (only if standard fullscreen not detected)
    if (!isFullscreen) {
      const player = document.querySelector(".html5-video-player");
      if (player) {
        isFullscreen = player.classList.contains("ytp-fullscreen");
      }
    }

    // State changed
    if (wasFullscreen !== isFullscreen) {
      updateBlockingState();

      // Notify background script
      try {
        chrome.runtime.sendMessage({
          action: "fullscreenStateChanged",
          isFullscreen: isFullscreen,
          isEnabled: isEnabled,
        });
      } catch (e) {
        // Ignore errors if extension context is invalidated
      }

      // Show notification if entering fullscreen
      if (isFullscreen && isEnabled) {
        showToast("Keystroke protection activated");
      }
    }
  }

  /**
   * Main keystroke blocking function
   */
  function handleKeyEvent(event) {
    // Only block if in fullscreen and extension is enabled
    if (!isFullscreen || !isEnabled) {
      return;
    }

    // Check if this key is allowed
    if (allowedKeys.includes(event.key) || allowedKeys.includes(event.code)) {
      return;
    }

    // Block the keystroke
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    // Visual feedback
    flashIndicator();

    return false;
  }

  /**
   * Updates the blocking state
   */
  function updateBlockingState() {
    const shouldBlock = isFullscreen && isEnabled;

    if (shouldBlock) {
      // Add event listeners with capture phase
      document.addEventListener("keydown", handleKeyEvent, true);
      document.addEventListener("keyup", handleKeyEvent, true);
      document.addEventListener("keypress", handleKeyEvent, true);
    } else {
      // Remove event listeners
      document.removeEventListener("keydown", handleKeyEvent, true);
      document.removeEventListener("keyup", handleKeyEvent, true);
      document.removeEventListener("keypress", handleKeyEvent, true);
    }
  }

  /**
   * Visual indicator (optimized with debouncing)
   */
  let indicatorTimeout = null;
  function flashIndicator() {
    // Remove existing indicator
    const existing = document.querySelector(".yff-block-indicator");
    if (existing) {
      existing.remove();
    }

    // Clear existing timeout
    if (indicatorTimeout) {
      clearTimeout(indicatorTimeout);
    }

    const indicator = document.createElement("div");
    indicator.className = "yff-block-indicator";
    indicator.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 8px 16px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
      color: white;
      border-radius: 20px;
      z-index: 999998;
      pointer-events: none;
      animation: yff-subtle-pulse 0.3s ease-out;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;

    indicator.textContent = "🛡️ Protected";
    document.body.appendChild(indicator);

    // Remove after animation
    indicatorTimeout = setTimeout(() => {
      indicator.style.animation = "yff-fade-out 0.2s ease-out";
      setTimeout(() => {
        indicator.remove();
        indicatorTimeout = null;
      }, 200);
    }, 500);
  }

  /**
   * Shows toast notification
   */
  function showToast(message) {
    chrome.storage.sync.get({ showNotifications: true }, function (settings) {
      if (!settings.showNotifications) return;

      // Remove existing toast
      const existingToast = document.querySelector(".yff-toast");
      if (existingToast) {
        existingToast.remove();
      }

      const toast = document.createElement("div");
      toast.className = "yff-toast";
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.98), rgba(118, 75, 162, 0.98));
        color: white;
        padding: 14px 24px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 999999;
        animation: yff-slide-up 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
      `;

      const icon = "🛡️";
      toast.innerHTML = `<span style="font-size: 18px;">${icon}</span> ${message}`;
      document.body.appendChild(toast);

      // Auto remove
      setTimeout(() => {
        toast.style.animation = "yff-slide-down 0.3s ease-out";
        setTimeout(() => toast.remove(), 300);
      }, 2000);
    });
  }

  /**
   * Initialize fullscreen detection
   */
  function initializeFullscreenDetection() {
    // Inject minimal CSS
    if (!document.querySelector("#yff-styles")) {
      const style = document.createElement("style");
      style.id = "yff-styles";
      style.textContent = `
        @keyframes yff-slide-up {
          from { transform: translateX(-50%) translateY(100px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes yff-slide-down {
          from { transform: translateX(-50%) translateY(0); opacity: 1; }
          to { transform: translateX(-50%) translateY(100px); opacity: 0; }
        }
        @keyframes yff-subtle-pulse {
          0% { transform: scale(0.95); opacity: 0; }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes yff-fade-out {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
      `;
      document.head.appendChild(style);
    }

    // Set up fullscreen event listeners
    document.addEventListener("fullscreenchange", detectFullscreenChange);
    document.addEventListener("webkitfullscreenchange", detectFullscreenChange);

    // YouTube-specific observer (lightweight)
    if (!isYouTubeKids()) {
      // For regular YouTube, observe player class changes
      const observePlayer = () => {
        const player = document.querySelector(".html5-video-player");
        if (player) {
          const observer = new MutationObserver(detectFullscreenChange);
          observer.observe(player, {
            attributes: true,
            attributeFilter: ["class"],
          });
          return true;
        }
        return false;
      };

      // Try to observe player, retry a few times if not found
      if (!observePlayer()) {
        let retries = 0;
        const retryInterval = setInterval(() => {
          if (observePlayer() || ++retries > 10) {
            clearInterval(retryInterval);
          }
        }, 1000);
      }
    }

    // Initial check
    detectFullscreenChange();
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    // Initialize if not already done
    if (!isInitialized) {
      deferredInit();
    }

    if (request.action === "getFullscreenStatus") {
      sendResponse({ isFullscreen: isFullscreen });
    } else if (request.action === "toggleEnabled") {
      isEnabled = request.enabled;
      updateBlockingState();
    }
    return true;
  });

  // Initialize on first user interaction or after delay
  // This prevents slowing down initial page load
  const initTriggers = ["click", "keydown", "fullscreenchange"];
  const initHandler = () => {
    deferredInit();
    // Remove all triggers after init
    initTriggers.forEach((event) => {
      document.removeEventListener(event, initHandler);
    });
  };

  // Add initialization triggers
  initTriggers.forEach((event) => {
    document.addEventListener(event, initHandler, {
      once: true,
      passive: true,
    });
  });

  // Also initialize after a delay if no interaction
  setTimeout(() => {
    if (!isInitialized) {
      deferredInit();
    }
  }, 3000);
})();
