// Popup script for YouTube Fullscreen Focus

document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const enableToggle = document.getElementById("enableToggle");
  const notificationToggle = document.getElementById("notificationToggle");
  const statusTitle = document.getElementById("statusTitle");
  const statusDesc = document.getElementById("statusDesc");
  const supportLink = document.getElementById("supportLink");
  const privacyLink = document.getElementById("privacyLink");
  const kidsModeBadge = document.getElementById("kidsModeBadge");
  const coffeeBtn = document.getElementById("coffeeBtn");

  // Key checkboxes
  const keyCheckboxes = document.querySelectorAll(
    '.key-option input[type="checkbox"]'
  );

  // Load current settings
  chrome.storage.sync.get(
    {
      enabled: true,
      showNotifications: true,
      allowedKeys: ["Escape"],
    },
    function (settings) {
      enableToggle.checked = settings.enabled;
      notificationToggle.checked = settings.showNotifications;

      // Set allowed keys
      keyCheckboxes.forEach((checkbox) => {
        const key = checkbox.dataset.key;
        checkbox.checked = settings.allowedKeys.includes(key);
      });

      updateStatus(settings.enabled);
    }
  );

  // Enable/Disable toggle
  enableToggle.addEventListener("change", function () {
    const enabled = enableToggle.checked;
    chrome.storage.sync.set({ enabled: enabled });
    updateStatus(enabled);

    // Send message to content scripts
    chrome.tabs.query(
      {
        url: ["*://*.youtube.com/*", "*://*.youtubekids.com/*"],
      },
      function (tabs) {
        tabs.forEach((tab) => {
          // Safely send message with error handling
          chrome.tabs.sendMessage(
            tab.id,
            {
              action: "toggleEnabled",
              enabled: enabled,
            },
            function (response) {
              // Check for errors but don't do anything - expected if content script isn't ready
              if (chrome.runtime.lastError) {
                // Silent fail - this is normal
              }
            }
          );
        });
      }
    );
  });

  // Notification toggle
  notificationToggle.addEventListener("change", function () {
    chrome.storage.sync.set({ showNotifications: notificationToggle.checked });
  });

  // Allowed keys checkboxes
  keyCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      updateAllowedKeys();
    });
  });

  // Update allowed keys in storage
  function updateAllowedKeys() {
    const allowedKeys = ["Escape"]; // Always include Escape

    keyCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        allowedKeys.push(checkbox.dataset.key);
      }
    });

    chrome.storage.sync.set({ allowedKeys: allowedKeys });
  }

  // Update status display
  function updateStatus(enabled) {
    const statusCharacter = document.querySelector(".status-character");
    if (enabled) {
      statusTitle.textContent = "Protection Active";
      statusDesc.textContent = "Videos are safe from accidental taps!";
      statusCharacter.textContent = "😊";
      statusCharacter.style.background =
        "linear-gradient(135deg, #ffd93d, #ffb93d)";
    } else {
      statusTitle.textContent = "Protection Paused";
      statusDesc.textContent = "Keys will work normally";
      statusCharacter.textContent = "😴";
      statusCharacter.style.background =
        "linear-gradient(135deg, #cbd5e0, #a8b5c4)";
    }
  }

  // Check current tab for YouTube/YouTube Kids
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0] && tabs[0].url) {
      if (tabs[0].url.includes("youtubekids.com")) {
        kidsModeBadge.style.display = "block";
      } else if (tabs[0].url.includes("youtube.com")) {
        // Check if currently in fullscreen
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: "getFullscreenStatus",
          },
          function (response) {
            // Handle any errors silently
            if (chrome.runtime.lastError) {
              // Content script not loaded yet - this is normal
              return;
            }
            if (response && response.isFullscreen) {
              statusTitle.textContent = "🎬 Currently in Fullscreen";
              statusDesc.textContent = "Keystrokes are being blocked";
              const statusCharacter =
                document.querySelector(".status-character");
              if (statusCharacter) {
                statusCharacter.textContent = "🛡️";
              }
            }
          }
        );
      }
    }
  });

  // Footer links and coffee button
  supportLink.addEventListener("click", function (e) {
    e.preventDefault();
    chrome.tabs.create({
      url: "welcome.html",
    });
  });

  privacyLink.addEventListener("click", function (e) {
    e.preventDefault();
    chrome.tabs.create({
      url: "privacy.html",
    });
  });

  coffeeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    chrome.tabs.create({
      url: "https://www.buymeacoffee.com/youtubefocus",
    });
  });
});
