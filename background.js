// Background Service Worker for YouTube Fullscreen Focus
// Lightweight and optimized for performance

// Initialize default settings on install
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    // Set default settings
    chrome.storage.sync.set({
      enabled: true,
      showNotifications: true,
      allowedKeys: ["Escape"],
      installDate: new Date().toISOString(),
    });

    // Open welcome page only on first install
    chrome.tabs.create({
      url: "welcome.html",
    });
  }

  // Set initial badge state
  updateBadge(true);
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "fullscreenStateChanged") {
    // Update icon badge based on fullscreen state
    if (request.isFullscreen && request.isEnabled) {
      // Show ON badge only for the specific tab
      chrome.action.setBadgeText({
        text: "ON",
        tabId: sender.tab?.id,
      });
      chrome.action.setBadgeBackgroundColor({
        color: "#4CAF50",
        tabId: sender.tab?.id,
      });
    } else if (sender.tab?.id) {
      // Clear badge when not in fullscreen
      chrome.action.setBadgeText({
        text: "",
        tabId: sender.tab.id,
      });
    }
  }
  return true;
});

// Update badge when settings change
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === "sync" && changes.enabled) {
    updateBadge(changes.enabled.newValue);
  }
});

// Helper function to update extension badge
function updateBadge(enabled) {
  if (!enabled) {
    // Show OFF badge globally when disabled
    chrome.action.setBadgeText({ text: "OFF" });
    chrome.action.setBadgeBackgroundColor({ color: "#9E9E9E" });
  } else {
    // Clear badge when enabled (will show ON only in fullscreen)
    chrome.action.setBadgeText({ text: "" });
  }
}
