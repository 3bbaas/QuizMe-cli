# QuizMe - Interactive CLI Quiz Tool

<div align="center">
  <img src="https://github.com/3bbaas/quizme/blob/main/assets/demo.png" alt="QuizMe demo" width="400" />
</div>

[![NPM Version](https://img.shields.io/npm/v/@3bbas/quizme.svg)](https://www.npmjs.com/package/@3bbas/quizme)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

QuizMe is an interactive command-line quiz tool that transforms JSON-based question banks into engaging quizzes. Perfect for students, or anyone who wants to test their knowledge in a fun and interactive way.

## Features

- **Interactive CLI Interface**: Colorful and engaging command-line interface
- **Multiple Question Sources**: Load questions from local files or remote URLs
- **LaTeX Support**: Automatic conversion of LaTeX math formulas to Unicode
- **True/False and Multiple-Choice**: Support for different question formats
- **Randomized Questions**: Questions are shuffled for a fresh experience every time
- **Timed Quizzes**: Track how long it takes to complete each quiz
- **Results Summary**: Review your performance with detailed statistics
- **Error Handling**: Robust validation for file paths and URLs

## Installation

```bash
# Install globally
npm install -g @3bbas/quizme

# Or use npx
npx @3bbas/quizme
```

## Usage

### Basic Usage

Run the command to start the quiz:

```bash
quizme
```

### JSON Format

Your quiz JSON file should follow this format:

```json
[
  {
    "id": 1,
    "question": "What is the capital of France?",
    "options": {
      "A": "London",
      "B": "Paris",
      "C": "Berlin",
      "D": "Madrid"
    },
    "answer": "B"
  },
  {
    "id": 2,
    "question": "The speed of light in a vacuum is about $30 \\, \\text{cm/ns}$.",
    "answer": true,
    "id": 2
  }
]
```

The tool supports:
- **Multiple-choice questions**: With `options` object and an `answer` that matches one of the option keys
- **True/False questions**: With a boolean `answer` property
- **LaTeX formatting**: For math formulas that are automatically converted to Unicode

## Features in Detail

### 1. Quiz Sources

QuizMe supports loading quiz questions from:

- **Local JSON files**: Specify a path to a JSON file on your system
- **Remote URLs**: Provide a URL to a JSON endpoint (e.g., `https://example.com/quiz.json`)

### 2. LaTeX to Unicode Conversion

The tool automatically converts LaTeX math notation to Unicode characters:

- Fractions: `\frac{1}{2}` → `1/2`
- Square roots: `\sqrt{2}` → `√2`
- Greek letters: `\alpha`, `\beta`, etc. → `α`, `β`, etc.
- Mathematical symbols: `\infty`, `\pm`, etc. → `∞`, `±`, etc.

### 3. Question Processing

- **Shuffling**: Questions are randomly shuffled for each quiz attempt
- **Validation**: Questions are validated for required fields
- **Format handling**: Both multiple-choice and True/False questions are supported
- **Default options**: Questions with missing options are provided with defaults

### 4. User Interface

- **Interactive prompts**: Easy selection of options using arrow keys
- **Color coding**: Questions, answers, and results are displayed with intuitive colors
- **Loading spinners**: Visual feedback during data loading and processing
- **Readable output**: Clear presentation of questions and results

### 5. Quiz Flow

1. **Source selection**: Choose between local file or remote URL
2. **Question loading**: Load and process questions
3. **Quiz progression**: Answer questions one by one
4. **Feedback**: Immediate feedback after each answer
5. **Results**: Detailed summary of performance at the end

### 6. Timing and Results

- **Timer**: Tracks the total time taken to complete the quiz
- **Score calculation**: Tallies correct and incorrect answers
- **Incorrect answers review**: Option to review all incorrect answers at the end

## File Structure

- **cli.ts**: Main entry point and command-line interface
- **fileLoader.ts**: Handles loading quiz data from files or URLs
- **quizRunner.ts**: Manages the quiz flow and user interaction
- **timer.ts**: Tracks quiz duration
- **types.ts**: TypeScript interfaces for quiz data
- **utils.ts**: Utility functions for LaTeX conversion and validation

<!-- ## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/3bbas/quizme.git
cd quizme
npm install
```

Build the project:

```bash
npm run build
```

Test the tool locally:

```bash
node dist/cli.js
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
 -->
## Author

Created by [3bbas](https://github.com/3bbaas)

---

Enjoy testing your knowledge with QuizMe! 🎓