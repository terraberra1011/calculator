# JavaScript Calculator

A simple, functional calculator built with HTML, CSS, and vanilla JavaScript.

## Features

-Provides full support for essential arithmetic operations, including addition, subtraction, multiplication, and division, ensuring accurate and reliable calculations
-Designed with a clean, modern interface featuring a sleek dark theme that reduces eye strain and enhances overall user experience
-Offers complete keyboard support, allowing users to enter numbers and operations quickly without relying solely on on-screen buttons
-Includes delete (backspace) and clear (reset) functions, giving users flexibility to correct mistakes or start fresh at any time
-Supports decimal point input for handling precise and fractional values in calculations
-Maintains a detailed calculation history that records past expressions and results for easy reference
-Allows users to clear the entire calculation history with a single action to keep the workspace organized
-Provides per-entry history management, including a trash button for deleting individual calculations without affecting the rest of the history
-Enables users to click on any previous result in the history to instantly reuse it in a new calculation, improving efficiency and workflow
-Features fully functional, responsive button controls that provide smooth interaction across different screen sizes and input methods

## Usage

Simply open `index.html` in your web browser to use the calculator.

### Mouse Controls
- Click number buttons to input digits
- Click operator buttons (+, -, ×, ÷) to perform operations
- Click `=` to calculate the result
- Click `C` to clear all
- Click `Del` to delete the last digit
- In History, click a row to reload its result, or click the trash icon to delete that entry

### Keyboard Controls
- Number keys (0-9) for digit input
- `+`, `-`, `*`, `/` for operations
- `Enter` or `=` to calculate
- `Backspace` to delete last digit
- `Escape` to clear all

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and layout
- `script.js` - Calculator logic and functionality

## Live Demo

Open `index.html` in any modern web browser to try it out!

## Recent Updates

### January 19, 2026
- Fixed history entry deletion animation by correcting event listener from `'transitioned'` to `'transitionend'`, enabling smooth fade-out and slide-left animation before removal
- History section now properly shrinks when entries are deleted with smooth visual feedback

### Previous Updates
- Fixed button event listeners - all operator buttons now properly respond to clicks
- Fixed equals button functionality with corrected class name consistency
- Restructured JavaScript to prevent scope issues with event listeners
- Added per-entry history delete button and streamlined history rendering

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
