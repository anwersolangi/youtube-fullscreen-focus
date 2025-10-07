# ![YouTube Fullscreen Focus Banner](https://raw.githubusercontent.com/anwersolangi/youtube-fullscreen-focus/main/assets/banner.jpg)

<div align="center">

# YouTube Fullscreen Focus

### Keep Little Fingers from Interrupting Videos!

[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/cgkahhgcnekfpkbmpggblgojbjapjdom?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore/detail/cgkahhgcnekfpkbmpggblgojbjapjdom)
[![Users](https://img.shields.io/chrome-web-store/users/cgkahhgcnekfpkbmpggblgojbjapjdom?style=for-the-badge&color=success)](https://chrome.google.com/webstore/detail/cgkahhgcnekfpkbmpggblgojbjapjdom)
[![Rating](https://img.shields.io/chrome-web-store/rating/cgkahhgcnekfpkbmpggblgojbjapjdom?style=for-the-badge&color=yellow)](https://chrome.google.com/webstore/detail/cgkahhgcnekfpkbmpggblgojbjapjdom)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://anwersolangi.com)

**[Install from Chrome Web Store](https://chrome.google.com/webstore/detail/cgkahhgcnekfpkbmpggblgojbjapjdom)** •
**[Report Bug](https://github.com/anwersolangi/youtube-fullscreen-focus/issues)** •
**[Request Feature](https://github.com/anwersolangi/youtube-fullscreen-focus/issues)**

</div>

---

## 🎯 **The Problem**

Ever had a toddler accidentally pause, skip, or exit your carefully queued YouTube video? Or maybe you've accidentally hit the spacebar while reaching for your coffee?

**We've all been there!** 🤦‍♂️

## ✨ **The Solution**

YouTube Fullscreen Focus is a lightweight Chrome extension that **blocks all keyboard input** when YouTube videos are in fullscreen mode. Perfect for:

- 👶 **Parents** - Let kids watch without worry
- 🎓 **Educators** - Uninterrupted classroom videos
- 🎮 **Gamers** - No accidental pauses during cutscenes
- 🐱 **Cat Owners** - Because cats love keyboards!

## 🌟 **Features**

<table>
<tr>
<td width="50%">

### 🎯 Smart Protection

- **Auto-activates** in fullscreen only
- Works on **YouTube** & **YouTube Kids**
- **Escape key** always works
- Zero configuration needed

</td>
<td width="50%">

### ⚡ Lightweight & Fast

- **< 100KB** total size
- **Zero** performance impact
- **No** data collection
- **100%** offline functionality

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Beautiful Design

- Kid-friendly interface
- Smooth animations
- Visual feedback
- Dark mode support

</td>
<td width="50%">

### ⚙️ Customizable

- Choose allowed keys
- Toggle notifications
- Enable/disable instantly
- Sync across devices

</td>
</tr>
</table>

## 📸 **Screenshots**

<div align="center">
<table>
<tr>
<td><img src="https://raw.githubusercontent.com/anwersolangi/youtube-fullscreen-focus/main/assets/screenshot1.png" alt="Popup Interface" width="300"/></td>
<td><img src="https://raw.githubusercontent.com/anwersolangi/youtube-fullscreen-focus/main/assets/screenshot2.png" alt="Protection Active" width="300"/></td>
<td><img src="https://raw.githubusercontent.com/anwersolangi/youtube-fullscreen-focus/main/assets/screenshot3.png" alt="YouTube Kids Mode" width="300"/></td>
</tr>
<tr>
<td align="center"><b>Beautiful Popup UI</b></td>
<td align="center"><b>Protection Notification</b></td>
<td align="center"><b>YouTube Kids Support</b></td>
</tr>
</table>
</div>

## 🚀 **Quick Start**

### **Install from Chrome Web Store** (Recommended)

1. Visit [Chrome Web Store](https://chrome.google.com/webstore/detail/cgkahhgcnekfpkbmpggblgojbjapjdom)
2. Click "Add to Chrome"
3. Done! 🎉

### **Install from Source** (For Developers)

```bash
# Clone the repository
git clone https://github.com/anwersolangi/youtube-fullscreen-focus.git

# Navigate to chrome://extensions/
# Enable "Developer mode"
# Click "Load unpacked"
# Select the cloned folder
```

## 📖 **How to Use**

1. **Install** the extension
2. **Navigate** to any YouTube video
3. **Click** fullscreen button or press `F`
4. **Enjoy** uninterrupted viewing!

All keyboard inputs (except `Escape`) are now blocked! 🛡️

## ⚙️ **Configuration**

Click the extension icon to access settings:

| Setting             | Description                        | Default     |
| ------------------- | ---------------------------------- | ----------- |
| **Protection Mode** | Enable/disable keystroke blocking  | ✅ Enabled  |
| **Notifications**   | Show visual feedback when blocking | ✅ Enabled  |
| **Allowed Keys**    | Keys that remain functional        | Escape only |

## 🏗️ **Project Structure**

```
youtube-fullscreen-focus/
├── 📄 manifest.json          # Extension configuration
├── 🎨 popup.html            # Extension popup UI
├── 🔧 popup.js              # Popup functionality
├── 📝 content.js            # Core blocking logic
├── ⚡ background.js         # Service worker
├── 🎯 welcome.html          # Welcome page
├── 🔒 privacy.html          # Privacy policy
└── 🎨 icons/                # Extension icons
    ├── icon16-active.png
    ├── icon32-active.png
    ├── icon48-active.png
    └── icon128-active.png
```

## 🤝 **Contributing**

We love contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 🐛 **Found a Bug?**

Please [open an issue](https://github.com/anwersolangi/youtube-fullscreen-focus/issues) with:

- Bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Browser version

## 💡 **Feature Requests**

Have an idea? We'd love to hear it! [Open an issue](https://github.com/anwersolangi/youtube-fullscreen-focus/issues) and tag it with `enhancement`.

## 📊 **Browser Support**

| Browser | Version | Support         |
| ------- | ------- | --------------- |
| Chrome  | 88+     | ✅ Full Support |
| Edge    | 88+     | ✅ Full Support |
| Brave   | Latest  | ✅ Full Support |
| Opera   | 74+     | ⚠️ Should work  |
| Firefox | -       | ❌ Coming Soon  |

## 🔒 **Privacy**

**Your privacy is our priority!**

- ✅ **NO** data collection
- ✅ **NO** analytics or tracking
- ✅ **NO** external requests
- ✅ **NO** ads
- ✅ Works **100% offline**

Read our full [Privacy Policy](privacy.html).

## 📈 **Roadmap**

- [x] Core keystroke blocking
- [x] YouTube Kids support
- [x] Customizable allowed keys
- [x] Visual notifications
- [ ] Firefox support
- [ ] Parental PIN lock (Premium)
- [ ] Screen time limits (Premium)
- [ ] Multiple profiles
- [ ] Whitelist specific channels

## 🙏 **Acknowledgments**

- Inspired by parents everywhere dealing with accidental key presses
- Built with love for my nephew who kept pausing his cartoons
- Thanks to all our [contributors](https://github.com/anwersolangi/youtube-fullscreen-focus/graphs/contributors)

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💝 **Support the Project**

If this extension makes your life easier, here are some ways you can show your support:

<div align="center">

### 🌟 **Free Ways to Help**

| Action                                                                                                    | Impact               |
| --------------------------------------------------------------------------------------------------------- | -------------------- |
| ⭐ **[Star this repo](https://github.com/anwersolangi/youtube-fullscreen-focus)**                         | Increases visibility |
| ⭐ **[Rate on Chrome Store](https://chrome.google.com/webstore/detail/cgkahhgcnekfpkbmpggblgojbjapjdom)** | Helps others find it |
| 📢 **Share on social media**                                                                              | Spreads the word     |
| 🐛 **[Report bugs](https://github.com/anwersolangi/youtube-fullscreen-focus/issues)**                     | Improves quality     |
| 💻 **[Contribute code](https://github.com/anwersolangi/youtube-fullscreen-focus/pulls)**                  | Adds features        |
| 📝 **Improve documentation**                                                                              | Helps new users      |

<br/>

**Every star, review, and share helps this project grow!** 🚀

**Have a project or looking to hire?** [Get in touch!](https://anwersolangi.com)

</div>

## 👨‍💻 **Author**

<div align="center">

**Anwer Solangi**

[![Website](https://img.shields.io/badge/Website-anwersolangi.com-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://anwersolangi.com)
[![GitHub](https://img.shields.io/badge/GitHub-@anwersolangi-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anwersolangi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/anwersolangi)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/anwer_solangi)

</div>

---

<div align="center">

### ⭐ **Star this repo if you find it helpful!** ⭐

Made with ❤️ by [Anwer Solangi](https://anwersolangi.com) | © 2025 All Rights Reserved

</div>
