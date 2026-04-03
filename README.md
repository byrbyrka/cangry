# Cangry Vault

A powerful note-taking application similar to Obsidian, built with Electron and React.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Markdown Editing** - Write notes in plain text markdown format
- **File-based Storage** - All notes are stored as regular `.md` files
- **Wiki Links** - Link between notes using `[[wiki-link]]` syntax
- **Vault Management** - Organize notes in folders (vaults)
- **Quick Switcher** - Fast file navigation with `Ctrl+O`
- **Command Palette** - Access all commands with `Ctrl+P`
- **Clone Vault** - Duplicate your entire vault to another location
- **Dark Theme** - Beautiful Obsidian-like dark theme
- **Cross-platform** - Works on Windows, Linux, and macOS

## Screenshots

The application features a clean, minimal interface with:
- Sidebar with file tree and search
- Tabbed editing for multiple files
- Split view (edit + preview)
- Status bar with word count

## Installation

### Download Pre-built Binaries

- **Windows**: Download the NSIS installer or portable executable from [Releases](https://github.com/yourusername/cangry-vault/releases)
- **Linux**: Download the AppImage or .deb package from [Releases](https://github.com/yourusername/cangry-vault/releases)

### Build from Source

```bash
# Clone the repository
git clone https://github.com/yourusername/cangry-vault.git
cd cangry-vault

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Create distributable packages
npm run dist:win      # Windows (NSIS installer + portable)
npm run dist:linux    # Linux (AppImage + deb)
npm run dist:all      # All platforms
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+N` | New note |
| `Ctrl+S` | Save file |
| `Ctrl+O` | Quick switcher |
| `Ctrl+P` | Command palette |
| `Ctrl+\` | Toggle sidebar |
| `Escape` | Close modal |

## Markdown Syntax

Cangry Vault supports standard markdown:

```markdown
# Heading 1
## Heading 2
### Heading 3

**bold text**
*italic text*
***bold italic***

`inline code`

[[wiki-link]] - links to another note

- [ ] task item
- [x] completed task

> blockquote

--- horizontal rule
```

## Project Structure

```
cangry-vault/
├── src/
│   ├── main/
│   │   ├── main.ts       # Electron main process
│   │   └── preload.ts    # Preload script (context bridge)
│   └── renderer/
│       ├── App.tsx        # Main React component
│       ├── index.tsx      # Entry point
│       ├── types/
│       │   └── api.ts     # TypeScript types
│       └── styles/
│           └── global.css # All styles
├── dist/                  # Built files
├── release/               # Distributable packages
├── package.json
├── tsconfig.main.json
└── vite.config.mjs
```

## Development

### Requirements

- Node.js 18+
- npm or yarn

### For Windows builds:
- NSIS installer requires Windows or Wine
- Portable build works everywhere

### For Linux builds:
- AppImage requires Linux environment
- deb package for Debian/Ubuntu

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request