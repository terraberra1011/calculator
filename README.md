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

January 2026
- Added light/dark theme toggle with optimized color contrast for readability.
- Implemented undo bar with timed restore for deleted history entries.
- Smooth fade + collapse animations for per-entry deletion.
- Fixed keyboard shortcuts to update display and prevent browser defaults.
- Click-to-reuse results in history; improved keyboard coverage.

## Tech

- HTML5
- CSS3
- JavaScript (ES6+)
