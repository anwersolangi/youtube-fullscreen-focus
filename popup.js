document.addEventListener("DOMContentLoaded", function () {
  const enableToggle = document.getElementById("enableToggle");
  const notificationToggle = document.getElementById("notificationToggle");
  const statusTitle = document.getElementById("statusTitle");
  const statusDesc = document.getElementById("statusDesc");
  const supportLink = document.getElementById("supportLink");
  const privacyLink = document.getElementById("privacyLink");
  const feedbackLink = document.getElementById("feedbackLink");
  const feedbackBtn = document.getElementById("feedbackBtn");
  const kidsModeBadge = document.getElementById("kidsModeBadge");

  const keyCheckboxes = document.querySelectorAll(
    '.key-option input[type="checkbox"]'
  );

  chrome.storage.sync.get(
    {
      enabled: true,
      showNotifications: true,
      allowedKeys: ["Escape"],
    },
    function (settings) {
      enableToggle.checked = settings.enabled;
      notificationToggle.checked = settings.showNotifications;
      keyCheckboxes.forEach((checkbox) => {
        const key = checkbox.dataset.key;
        checkbox.checked = settings.allowedKeys.includes(key);
      });

      updateStatus(settings.enabled);
    }
  );

  enableToggle.addEventListener("change", function () {
    const enabled = enableToggle.checked;
    chrome.storage.sync.set({ enabled: enabled });
    updateStatus(enabled);

    chrome.tabs.query(
      {
        url: ["*://*.youtube.com/*", "*://*.youtubekids.com/*"],
      },
      function (tabs) {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(
            tab.id,
            {
              action: "toggleEnabled",
              enabled: enabled,
            },
            function (response) {
              if (chrome.runtime.lastError) {
                // Silent fail - this is normal
              }
            }
          );
        });
      }
    );
  });

  notificationToggle.addEventListener("change", function () {
    chrome.storage.sync.set({ showNotifications: notificationToggle.checked });
  });

  keyCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      updateAllowedKeys();
    });
  });

  function updateAllowedKeys() {
    const allowedKeys = ["Escape"];

    keyCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        allowedKeys.push(checkbox.dataset.key);
      }
    });

    chrome.storage.sync.set({ allowedKeys: allowedKeys });
  }

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

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0] && tabs[0].url) {
      if (tabs[0].url.includes("youtubekids.com")) {
        kidsModeBadge.style.display = "block";
      } else if (tabs[0].url.includes("youtube.com")) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: "getFullscreenStatus",
          },
          function (response) {
            if (chrome.runtime.lastError) {
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

  feedbackLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.open("https://forms.gle/5P3Zy9pvmzGaYDAP7", "_blank");
  });

  feedbackBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.open("https://forms.gle/5P3Zy9pvmzGaYDAP7", "_blank");
  });
});
