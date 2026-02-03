# JavaScript Calculator

A simple, responsive calculator built with HTML, CSS, and vanilla JavaScript.

## Quick Start

- Open `index.html` in any modern browser.
- Or use VS Code's Live Server for auto-reload while editing.

## Features

- Basic ops: addition, subtraction, multiplication, division.
- Decimals: input and compute fractional values.
- Clear and Delete: `C` resets, `Del` removes last digit.
- Keyboard support: digits, operators, Enter/Equal, Backspace, Escape.
- Light/Dark theme toggle: switch between light and dark modes for comfortable viewing.
- History: records expressions and results; click to reuse a result.
- Per-entry delete: remove individual history rows with smooth animation.
- Clear history: wipe the full list with one click.
- Undo delete: restore a deleted history entry within 5 seconds.
- Responsive UI: buttons scale well on different screen sizes.

## Keyboard Shortcuts

- Digits: `0-9`, decimal: `.`
- Operators: `+`, `-`, `*`, `/`
- Evaluate: `Enter` or `=`
- Delete last: `Backspace`
- Clear all: `Escape`

## Project Structure

```
.
├── index.html   # Markup and layout
├── style.css    # Styles and animations
└── script.js    # Calculator logic + history/undo
```

## Notes

- Division by zero returns `Error` and prevents invalid computation.
- Clicking a history row loads its result into the display for reuse.
- Deleted history entries can be undone for ~5s via the Undo bar.

## Recent Updates

February 2026
- Fully functional calculator with comprehensive features
- Light/dark theme toggle with optimized color contrast for readability
- Complete history system with per-entry deletion and undo functionality
- Keyboard shortcuts for all operations with proper event handling
- Responsive design for various screen sizes
- Click-to-reuse results from history
- Sound effects for button interactions
- Local storage support for theme persistence

## Tech

- HTML5
- CSS3
- JavaScript (ES6+)
