# CourseGraph Installation and Setup Guide

**Version 1.0 | January 2025**

---

## Table of Contents

1. [System Requirements](#1-system-requirements)
2. [Prerequisites](#2-prerequisites)
3. [Installation for Development](#3-installation-for-development)
4. [Running the Application](#4-running-the-application)
5. [Building for Production](#5-building-for-production)
6. [Platform-Specific Instructions](#6-platform-specific-instructions)
7. [Configuration](#7-configuration)
8. [Troubleshooting Installation Issues](#8-troubleshooting-installation-issues)
9. [Uninstallation](#9-uninstallation)

---

## 1. System Requirements

### Minimum Requirements

| Component | Requirement |
|-----------|-------------|
| **Operating System** | Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+) |
| **Processor** | 64-bit Intel or ARM processor |
| **Memory** | 4 GB RAM minimum |
| **Storage** | 500 MB free disk space |
| **Display** | 1280 x 720 resolution minimum |

### Recommended Requirements

| Component | Requirement |
|-----------|-------------|
| **Operating System** | Windows 11, macOS 12+, or Ubuntu 22.04 |
| **Processor** | Modern multi-core processor |
| **Memory** | 8 GB RAM or more |
| **Storage** | 1 GB free disk space |
| **Display** | 1920 x 1080 resolution or higher |

---

## 2. Prerequisites

### For Development

Before installing CourseGraph for development, ensure you have the following software installed:

#### Node.js

**Required Version:** v20.x or higher

**Check if installed:**
```bash
node --version
```

**Installation:**

- **Windows/macOS:** Download from [nodejs.org](https://nodejs.org/)
- **Linux (Ubuntu/Debian):**
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **macOS (Homebrew):**
  ```bash
  brew install node@20
  ```

#### npm (Node Package Manager)

**Required Version:** v11.x or higher

npm is included with Node.js. Verify installation:
```bash
npm --version
```

To update npm:
```bash
npm install -g npm@latest
```

#### Git

**Required for:** Cloning the repository

**Check if installed:**
```bash
git --version
```

**Installation:**
- **Windows:** Download from [git-scm.com](https://git-scm.com/)
- **macOS:** `xcode-select --install` or `brew install git`
- **Linux:** `sudo apt-get install git`

---

## 3. Installation for Development

### Step 1: Clone the Repository

```bash
git clone https://github.com/wi23b162/CourseGraph.git
```

Or if you have the project as a ZIP file:
```bash
unzip CourseGraph.zip
```

### Step 2: Navigate to Project Directory

```bash
cd CourseGraph
```

### Step 3: Install Dependencies

```bash
npm install
```

This command installs all required packages defined in `package.json`:
- Electron (desktop application framework)
- React (UI library)
- ReactFlow (graph visualization)
- Vite (build tool)
- And other dependencies

**Expected Output:**
```
added XXX packages in XXs
```

### Step 4: Verify Installation

Check that all dependencies are correctly installed:
```bash
npm list --depth=0
```

You should see a list of installed packages without errors.

---

## 4. Running the Application

### Development Mode

Start the application with hot-reload enabled:

```bash
npm start
```

**What happens:**
1. Vite compiles the React application
2. Electron launches a window
3. The application loads in the window
4. Changes to source files trigger automatic reload

**Expected Behavior:**
- An Electron window opens with the CourseGraph interface
- The console shows compilation status
- Hot-reload is active for development

### Stopping the Application

- Close the Electron window, OR
- Press `Ctrl + C` in the terminal

---

## 5. Building for Production

### Package the Application

Create a packaged version without making installers:

```bash
npm run package
```

**Output Location:** `out/` directory

### Create Distributable Installers

Build platform-specific installers:

```bash
npm run make
```

**Output Location:** `out/make/` directory

### Build Targets by Platform

| Platform | Installer Type | Output |
|----------|---------------|--------|
| **Windows** | Squirrel | `.exe` installer |
| **macOS** | ZIP | `.zip` archive |
| **Linux** | DEB | `.deb` package |
| **Linux** | RPM | `.rpm` package |

---

## 6. Platform-Specific Instructions

### Windows

#### Prerequisites
- Windows 10 or later (64-bit)
- Administrator access for installation

#### Installation Steps
1. Install Node.js from the official installer
2. Open Command Prompt or PowerShell
3. Follow the standard installation steps above

#### Running the Packaged App
1. Navigate to `out/make/squirrel.windows/x64/`
2. Run the generated `.exe` installer
3. Follow installation prompts
4. Launch CourseGraph from the Start Menu

#### Common Windows Issues
- **EACCES errors:** Run terminal as Administrator
- **PATH issues:** Ensure Node.js is in system PATH

---

### macOS

#### Prerequisites
- macOS 10.15 (Catalina) or later
- Xcode Command Line Tools

#### Installation Steps
1. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
2. Install Node.js (via Homebrew recommended):
   ```bash
   brew install node@20
   ```
3. Follow the standard installation steps

#### Running the Packaged App
1. Navigate to `out/make/zip/darwin/`
2. Extract the `.zip` file
3. Move `CourseGraph.app` to Applications
4. Double-click to launch

#### macOS Security Note
If macOS blocks the app:
1. Go to **System Preferences > Security & Privacy**
2. Click **"Open Anyway"** for CourseGraph
3. Confirm in the dialog

#### Common macOS Issues
- **"App is damaged":** Remove quarantine attribute:
  ```bash
  xattr -cr /Applications/CourseGraph.app
  ```

---

### Linux (Ubuntu/Debian)

#### Prerequisites
- Ubuntu 18.04+ or Debian 10+
- `build-essential` package

#### Installation Steps
1. Install build tools:
   ```bash
   sudo apt-get update
   sudo apt-get install -y build-essential
   ```
2. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. Follow the standard installation steps

#### Running the Packaged App
1. Navigate to `out/make/deb/x64/`
2. Install the `.deb` package:
   ```bash
   sudo dpkg -i coursegraph_*.deb
   ```
3. Launch from applications menu or terminal:
   ```bash
   coursegraph
   ```

#### Common Linux Issues
- **Missing libraries:** Install required dependencies:
  ```bash
  sudo apt-get install -y libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils libatspi2.0-0 libuuid1 libsecret-1-0
  ```

---

### Linux (Fedora/RHEL)

#### Installation Steps
1. Install Node.js:
   ```bash
   sudo dnf install nodejs
   ```
2. Follow the standard installation steps

#### Running the Packaged App
1. Navigate to `out/make/rpm/x64/`
2. Install the `.rpm` package:
   ```bash
   sudo rpm -i coursegraph-*.rpm
   ```

---

## 7. Configuration

### Build Configuration

The build process is configured via `forge.config.js`:

```javascript
// Key configuration options
module.exports = {
  packagerConfig: {
    asar: true,  // Package as ASAR archive
  },
  makers: [
    // Platform-specific builders
  ],
  plugins: [
    // Vite plugin for fast builds
  ]
};
```

### Vite Configuration

Three Vite configuration files control the build:

| File | Purpose |
|------|---------|
| `vite.main.config.mjs` | Electron main process |
| `vite.renderer.config.mjs` | React UI (renderer) |
| `vite.preload.config.mjs` | Preload scripts |

### Environment Variables

Currently, CourseGraph does not require environment variables. All configuration is handled through the config files.

---

## 8. Troubleshooting Installation Issues

### Common Issues and Solutions

#### "npm install" fails with permission errors

**Solution (Unix):**
```bash
sudo chown -R $(whoami) ~/.npm
npm install
```

**Solution (Windows):**
Run Command Prompt as Administrator

---

#### "Cannot find module" errors

**Solution:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

#### Electron fails to start

**Possible Causes:**
- Incomplete installation
- Port conflicts
- Missing native dependencies

**Solution:**
```bash
npm run make -- --skip-build
npm rebuild
npm start
```

---

#### "ENOENT" errors during build

**Solution:**
Ensure all files exist and paths are correct:
```bash
npm cache clean --force
npm install
```

---

#### Application window is blank/white

**Possible Causes:**
- React compilation failed
- Path issues

**Solution:**
1. Check console for errors
2. Restart with:
   ```bash
   npm start -- --verbose
   ```

---

#### Build fails on Windows with native module errors

**Solution:**
Install Windows Build Tools:
```bash
npm install --global windows-build-tools
```

---

### Verifying Your Installation

Run these commands to verify everything is working:

```bash
# Check Node.js
node --version  # Should show v20.x.x

# Check npm
npm --version   # Should show v11.x.x

# Check dependencies
npm list --depth=0  # Should show all packages

# Test the application
npm start  # Should launch the Electron window
```

---

## 9. Uninstallation

### Removing Development Installation

```bash
# Navigate to parent directory
cd ..

# Remove project folder
rm -rf CourseGraph
```

### Removing Installed Application

**Windows:**
1. Go to **Settings > Apps**
2. Find CourseGraph
3. Click **Uninstall**

**macOS:**
1. Move `CourseGraph.app` from Applications to Trash
2. Empty Trash

**Linux (DEB):**
```bash
sudo apt-get remove coursegraph
```

**Linux (RPM):**
```bash
sudo rpm -e coursegraph
```

### Cleaning npm Cache

```bash
npm cache clean --force
```

---

## Quick Reference

### Essential Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm start` | Run in development mode |
| `npm run package` | Create packaged app |
| `npm run make` | Create installer |
| `npm list --depth=0` | List installed packages |

### File Locations

| Item | Location |
|------|----------|
| Source code | `src/` |
| Dependencies | `node_modules/` |
| Build output | `out/` |
| Installers | `out/make/` |
| Configuration | `forge.config.js`, `vite.*.config.mjs` |

---

**Need Help?**

If you encounter issues not covered in this guide:
1. Check the project's GitHub Issues
2. Contact your project supervisor
3. Review the technical documentation

---

*FH Technikum Wien - Software Engineering*
