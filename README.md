# Cangry Vault

Мощное приложение для заметок, похожее на Obsidian, созданное на Electron и React.

![Версия](https://img.shields.io/badge/version-1.0.0-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Платформы](https://img.shields.io/badge/platforms-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

## Возможности

- **Редактирование Markdown** — Пишите заметки в формате plain text markdown
- **Файловое хранилище** — Все заметки хранятся как обычные `.md` файлы
- **Wiki-ссылки** — Связывайте заметки с помощью синтаксиса `[[wiki-link]]`
- **Граф связей** — Визуализация связей между заметками
- **Управление хранилищами** — Организуйте заметки в папках (хранилищах)
- **Быстрый переключатель** — Быстрая навигация по файлам через `Ctrl+O`
- **Палитра команд** — Доступ ко всем командам через `Ctrl+P`
- **Клонирование хранилища** — Дублируйте всё хранилище в другое место
- **Граф связей** — Force-directed граф wiki-ссылок
- **Обратные ссылки** — Автоматический поиск обратных ссылок
- **Теги** — Автоматическое извлечение и поиск тегов
- **Разделённый вид** — Редактирование + предпросмотр одновременно
- **Система плагинов** — Расширяемость через manifest.json
- **Тёмная тема** — Красивая тёмная тема в стиле Obsidian
- **Кроссплатформенность** — Работает на Windows, Linux и macOS

## Скриншоты

Приложение имеет чистый минималистичный интерфейс с:
- Боковой панелью с деревом файлов и поиском
- Вкладками для редактирования нескольких файлов
- Разделённым видом (редактирование + предпросмотр)
- Строкой состояния с подсчётом слов

## Установка

### Скачать готовые сборки

- **Windows**: Скачайте NSIS-установщик или портативную версию со страницы [Releases](https://github.com/yourusername/cangry-vault/releases)
- **Linux**: Скачайте AppImage или .deb пакет со страницы [Releases](https://github.com/yourusername/cangry-vault/releases)

### Сборка из исходников

```bash
# Клонируйте репозиторий
git clone https://github.com/yourusername/cangry-vault.git
cd cangry-vault

# Установите зависимости
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Создание дистрибутивов
npm run dist:win      # Windows (NSIS-установщик + портативная)
npm run dist:linux    # Linux (AppImage + deb)
npm run dist:all      # Все платформы
```

## Горячие клавиши

| Комбинация | Действие |
|------------|----------|
| `Ctrl+N` | Новая заметка |
| `Ctrl+S` | Сохранить файл |
| `Ctrl+O` | Быстрый переключатель |
| `Ctrl+P` | Палитра команд |
| `Ctrl+B` | Переключить левую панель |
| `Ctrl+→` | Переключить правую панель |
| `Ctrl+,` | Настройки |
| `Ctrl+E` | Режим редактирования |
| `Ctrl+R` | Режим предпросмотра |
| `Ctrl+Shift+E` | Разделённый режим |
| `Ctrl+W` | Закрыть вкладку |
| `Ctrl+F4` | Закрыть все вкладки |
| `Escape` | Закрыть модальное окно |

## Синтаксис Markdown

Cangry Vault поддерживает стандартный markdown:

```markdown
# Заголовок 1
## Заголовок 2
### Заголовок 3

**жирный текст**
*курсив*
***жирный курсив***

`встроенный код`

[[wiki-ссылка]] — ссылка на другую заметку

- [ ] задача
- [x] выполненная задача

> цитата

--- горизонтальная линия
```

## Структура проекта

```
cangry-vault/
├── src/
│   ├── main/
│   │   ├── main.ts       # Главный процесс Electron
│   │   ├── preload.ts    # Preload-скрипт (context bridge)
│   │   ├── clone.ts      # Модуль клонирования хранилищ
│   │   ├── native.ts     # Fallback для нативных модулей
│   │   └── plugins.ts    # Загрузчик плагинов
│   ├── native/
│   │   ├── addon.cpp     # C++ нативный модуль
│   │   ├── copy.cpp/h    # Копирование файлов
│   │   ├── checksum.cpp/h # SHA256 хеширование
│   │   └── search.cpp/h  # Полнотекстовый поиск
│   └── renderer/
│       ├── App.tsx        # Главный React-компонент
│       ├── index.tsx      # Точка входа
│       ├── types/
│       │   └── api.ts     # TypeScript типы
│       └── styles/
│           └── global.css # Все стили
├── build/
│   ├── icon.ico           # Иконка Windows
│   ├── icon.png           # Иконка Linux
│   ├── icon.icns          # Иконка macOS
│   ├── installer.nsh      # NSIS скрипта
│   ├── entitlements.mac.plist # macOS entitlements
│   └── convert-icons.bat  # Скрипт конвертации иконок
├── dist/                  # Собранные файлы
├── release/               # Дистрибутивы
├── package.json
├── BUILD.md               # Подробная инструкция по сборке
├── tsconfig.main.json
└── vite.config.ts
```

## Разработка

### Требования

- Node.js 18+
- npm 9+

### Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка
npm run build
```

## Сборка для всех платформ

Подробные инструкции по сборке для Windows, macOS и Linux см. в файле [BUILD.md](BUILD.md).

### Краткая инструкция

```bash
# Windows (NSIS установщик + Portable)
npm run dist:win

# macOS (DMG + ZIP)
npm run dist:mac

# Linux (AppImage + DEB + RPM + Snap)
npm run dist:linux

# Все платформы сразу
npm run dist:all
```

### Форматы дистрибутивов

| Платформа | Форматы | Описание |
|-----------|---------|----------|
| Windows | NSIS, MSI, Portable | Установщик, MSI пакет, портативная версия |
| macOS | DMG, ZIP | DMG образ, ZIP архив (Intel, Apple Silicon, Universal) |
| Linux | AppImage, DEB, RPM, Snap | Универсальный, Ubuntu/Debian, Fedora, Snap Store |

## Лицензия

MIT License — подробности в файле [LICENSE](LICENSE).

## Участие в разработке

Вклад приветствуется! Не стесняйтесь создавать Pull Request.

1. Форкните репозиторий
2. Создайте ветку с функцией (`git checkout -b feature/новая-функция`)
3. Зафиксируйте изменения (`git commit -m 'Добавить новую функцию'`)
4. Отправьте в репозиторий (`git push origin feature/новая-функция`)
5. Откройте Pull Request