# Cangry Vault - Инструкция по сборке для всех ОС

## Требования

### Общие
- Node.js 18+ (https://nodejs.org/)
- npm 9+ (устанавливается вместе с Node.js)

### Windows
- Windows 10/11 (x64)
- Visual Studio Build Tools 2019+ (для нативных модулей)
  - Установите с опцией "Desktop development with C++"
- Python 3.x (для node-gyp)

### macOS
- macOS 10.15+ (Catalina или новее)
- Xcode 12+ с установленными Command Line Tools
  - `xcode-select --install`
- Для подписи кода: Apple Developer Account

### Linux
- Ubuntu 18.04+ / Debian 10+ / Fedora 32+ / Arch Linux
- build-essential (gcc, g++, make)
- libgtk-3-dev, libnotify-dev, libnss3, libxss1, libasound2
- Для Snap: snapd и snapcraft
- Для AppImage: libfuse2

---

## Установка зависимостей

```bash
# Клонирование репозитория
git clone <repository-url>
cd cangry-vault

# Установка зависимостей
npm install
```

---

## Запуск в режиме разработки

```bash
# Запуск с горячей перезагрузкой
npm run dev
```

---

## Сборка для Windows

### Из Windows (рекомендуется)

```bash
# NSIS установщик (x64 + ARM64)
npm run dist:win

# Только NSIS установщик
npm run dist:win:nsis

# Портативная версия (не требует установки)
npm run dist:win:portable

# MSI установщик
npm run dist:win:msi
```

### Результат сборки (Windows)
- `release/Cangry Vault-1.0.0-x64.exe` — NSIS установщик
- `release/Cangry Vault-1.0.0-arm64.exe` — NSIS установщик для ARM
- `release/Cangry Vault-1.0.0-portable.exe` — портативная версия
- `release/Cangry Vault-1.0.0-x64.msi` — MSI установщик

---

## Сборка для macOS

### Из macOS

```bash
# DMG + ZIP (x64 + ARM64 + Universal)
npm run dist:mac

# Только DMG
npm run dist:mac:dmg

# Только ZIP
npm run dist:mac:zip
```

### Результат сборки (macOS)
- `release/Cangry Vault-1.0.0-x64.dmg` — DMG образ для Intel
- `release/Cangry Vault-1.0.0-arm64.dmg` — DMG образ для Apple Silicon
- `release/Cangry Vault-1.0.0-universal.dmg` — Универсальный DMG
- `release/Cangry Vault-1.0.0-x64.zip` — ZIP архив для Intel
- `release/Cangry Vault-1.0.0-arm64.zip` — ZIP архив для Apple Silicon
- `release/Cangry Vault-1.0.0-universal.zip` — Универсальный ZIP

### Подпись кода (опционально)

Для распространения вне App Store нужно подписать приложение:

```bash
# Установите сертификат в Keychain
# Укажите идентификатор подписи в package.json:
# "mac": {
#   "identity": "Developer ID Application: Your Name (TEAM_ID)",
#   ...
# }

# Сборка с подписью
npm run dist:mac
```

### Нотаризация (обязательно для macOS 10.15+)

```bash
# После сборки, нотаризуйте приложение:
xcrun notarytool submit "release/Cangry Vault-1.0.0-x64.dmg" \
  --apple-id "your@apple.id" \
  --team-id "YOUR_TEAM_ID" \
  --password "app-specific-password" \
  --wait

# Прикрепите тикет нотаризации:
xcrun stapler staple "release/Cangry Vault-1.0.0-x64.dmg"
```

---

## Сборка для Linux

### Из Linux

```bash
# AppImage + DEB (x64 + ARM64)
npm run dist:linux

# Только AppImage
npm run dist:linux:appimage

# Только DEB пакет (Ubuntu/Debian)
npm run dist:linux:deb

# RPM пакет (Fedora/RHEL)
npm run dist:linux:rpm

# Snap пакет
npm run dist:linux:snap
```

### Результат сборки (Linux)
- `release/Cangry Vault-1.0.0-x64.AppImage` — AppImage (универсальный)
- `release/Cangry Vault-1.0.0-arm64.AppImage` — AppImage для ARM64
- `release/Cangry Vault-1.0.0-x64.deb` — DEB пакет для Ubuntu/Debian
- `release/Cangry Vault-1.0.0-arm64.deb` — DEB пакет для ARM64
- `release/Cangry Vault-1.0.0-x64.rpm` — RPM пакет для Fedora
- `release/Cangry Vault-1.0.0-x64.snap` — Snap пакет

### Установка на Linux

```bash
# AppImage
chmod +x "Cangry Vault-1.0.0-x64.AppImage"
./"Cangry Vault-1.0.0-x64.AppImage"

# DEB (Ubuntu/Debian)
sudo dpkg -i "Cangry Vault-1.0.0-x64.deb"
sudo apt-get install -f  # если есть зависимости

# RPM (Fedora)
sudo rpm -i "Cangry Vault-1.0.0-x64.rpm"
# или
sudo dnf install "Cangry Vault-1.0.0-x64.rpm"

# Snap
sudo snap install "Cangry Vault-1.0.0-x64.snap" --dangerous
```

---

## Кроссплатформенная сборка

### Из одной ОС собрать для всех

```bash
# Собрать для Windows, Linux и macOS
npm run dist:all

# Только портативные форматы
npm run dist:all:portable
```

> **Важно:** Кроссплатформенная сборка может иметь ограничения.
> - Из Windows можно собрать для Linux, но не для macOS
> - Из macOS можно собрать для всех платформ
> - Из Linux можно собрать для Windows и Linux, но не для macOS

---

## CI/CD — Автоматическая сборка через GitHub Actions

Создайте файл `.github/workflows/build.yml`:

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  release:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      # Windows
      - name: Build for Windows
        if: matrix.os == 'windows-latest'
        run: npm run dist:win
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      # macOS
      - name: Build for macOS
        if: matrix.os == 'macos-latest'
        run: npm run dist:mac
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          CSC_LINK: ${{ secrets.MAC_CERTS }}
          CSC_KEY_PASSWORD: ${{ secrets.MAC_CERTS_PASSWORD }}

      # Linux
      - name: Build for Linux
        if: matrix.os == 'ubuntu-latest'
        run: npm run dist:linux
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.os }}-build
          path: release/

  publish:
    needs: release
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/')

    steps:
      - name: Download all artifacts
        uses: actions/download-artifact@v4

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          files: release/**/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## Нативные C++ модули (опционально)

Для ускорения операций копирования и хеширования:

```bash
# Установка зависимостей для сборки
npm install --save-dev node-gyp

# Сборка нативного модуля
npm run build:native

# Для Windows (требуется Visual Studio Build Tools)
npm run build:native:win

# Для macOS/Linux
npm run build:native:unix
```

---

## Устранение проблем

### Ошибка: "electron-builder not found"
```bash
npm install --save-dev electron-builder
```

### Ошибка: "node-gyp" при установке зависимостей
```bash
# Windows
npm install --global windows-build-tools

# macOS
xcode-select --install

# Linux (Ubuntu/Debian)
sudo apt-get install build-essential
```

### Ошибка: "cannot find module" при запуске
```bash
npm install
npm run build
```

### Ошибка: "code sign" на macOS
```bash
# Отключить подпись (для разработки)
export CSC_IDENTITY_AUTO_DISCOVERY=false
npm run dist:mac
```

### Ошибка: "AppImage" на Linux
```bash
# Установить libfuse
sudo apt-get install libfuse2
```

### Ошибка: "snap" на Linux
```bash
# Установить snapd
sudo apt-get install snapd
sudo snap install snapcraft --classic
```

---

## Структура выходных файлов

```
release/
├── win-unpacked/                    # Распакованная версия Windows
│   ├── Cangry Vault.exe
│   └── resources/
├── linux-unpacked/                  # Распакованная версия Linux
│   ├── cangry-vault
│   └── resources/
├── mac/                             # Распакованная версия macOS
│   ├── Cangry Vault.app
│   └── Resources/
├── Cangry Vault-1.0.0-x64.exe       # NSIS установщик
├── Cangry Vault-1.0.0-portable.exe  # Портативная версия
├── Cangry Vault-1.0.0-x64.dmg       # DMG образ
├── Cangry Vault-1.0.0-x64.AppImage  # AppImage
├── Cangry Vault-1.0.0-x64.deb       # DEB пакет
└── ...
```

---

## Публикация

### Microsoft Store
1. Соберите MSIX пакет: `npm run dist:win:msix`
2. Загрузите в Microsoft Partner Center

### Mac App Store
1. Настройте подписи и entitlements
2. Соберите: `npm run dist:mac`
3. Загрузите через Transporter App

### Snap Store
```bash
snapcraft upload --release=stable "release/Cangry Vault-1.0.0-x64.snap"
```

### AUR (Arch Linux)
Создайте PKGBUILD и отправьте в AUR.

---

## Лицензия

MIT License — свободное распространение разрешено.