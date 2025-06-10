"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.latexToText = exports.suffleQuestions = exports.displayResult = void 0;
exports.validateFilePath = validateFilePath;
exports.validateAndFetchUrl = validateAndFetchUrl;
const log_symbols_1 = __importDefault(require("log-symbols"));
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const displayResult = (isCorrect, correctAnswer) => {
    if (isCorrect) {
        console.log(`${log_symbols_1.default.success}   ${chalk_1.default.green.bold('GooAAAAaaal!')}\n`);
    }
    else {
        console.log(`${log_symbols_1.default.error}   ${chalk_1.default.red.bold('Wro00000ong!')}\n ${chalk_1.default.yellow.bold(`   Correct: ${correctAnswer}`)}\n`);
    }
};
exports.displayResult = displayResult;
function validateFilePath(filePath) {
    try {
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const stats = fs_1.default.statSync(filePath);
        if (!stats.isFile()) {
            throw new Error(`Path is not a file: ${filePath}`);
        }
        return filePath;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Invalid file path: ${error.message}`);
        }
        else {
            throw new Error(`Invalid file path: ${String(error)}`);
        }
    }
}
const suffleQuestions = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};
exports.suffleQuestions = suffleQuestions;
async function validateAndFetchUrl(url) {
    try {
        new URL(url);
        const response = await axios_1.default.get(url);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch from URL: HTTP status ${response.status}`);
        }
        return JSON.stringify(response.data);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Invalid URL or fetch failed: ${error.message}`);
        }
        else {
            throw new Error(`Invalid URL or fetch failed: ${String(error)}`);
        }
    }
}
const latexToText = (latex) => {
    return latex
        .replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '$1/$2') // Fractions
        .replace(/\\sqrt\{(.*?)\}/g, '√$1') // Square roots
        .replace(/\\text\{(.*?)\}/g, '$1') // Text mode
        .replace(/\$\$?(.*?)\$\$?/g, '$1') // Math mode delimiters
        .replace(/\\alpha/g, 'α')
        .replace(/\\beta/g, 'β')
        .replace(/\\gamma/g, 'γ')
        .replace(/\\delta/g, 'δ')
        .replace(/\\epsilon/g, 'ε')
        .replace(/\\zeta/g, 'ζ')
        .replace(/\\eta/g, 'η')
        .replace(/\\theta/g, 'θ')
        .replace(/\\iota/g, 'ι')
        .replace(/\\kappa/g, 'κ')
        .replace(/\\lambda/g, 'λ')
        .replace(/\\mu/g, 'μ')
        .replace(/\\nu/g, 'ν')
        .replace(/\\xi/g, 'ξ')
        .replace(/\\pi/g, 'π')
        .replace(/\\rho/g, 'ρ')
        .replace(/\\sigma/g, 'σ')
        .replace(/\\tau/g, 'τ')
        .replace(/\\upsilon/g, 'υ')
        .replace(/\\phi/g, 'φ')
        .replace(/\\chi/g, 'χ')
        .replace(/\\psi/g, 'ψ')
        .replace(/\\omega/g, 'ω')
        .replace(/\\Gamma/g, 'Γ')
        .replace(/\\Delta/g, 'Δ')
        .replace(/\\Theta/g, 'Θ')
        .replace(/\\Lambda/g, 'Λ')
        .replace(/\\Xi/g, 'Ξ')
        .replace(/\\Pi/g, 'Π')
        .replace(/\\Sigma/g, 'Σ')
        .replace(/\\Upsilon/g, 'Υ')
        .replace(/\\Phi/g, 'Φ')
        .replace(/\\Psi/g, 'Ψ')
        .replace(/\\Omega/g, 'Ω')
        .replace(/\\infty/g, '∞')
        .replace(/\\int/g, '∫')
        .replace(/\\sum/g, '∑')
        .replace(/\\prod/g, '∏')
        .replace(/\\pm/g, '±')
        .replace(/\\times/g, '×')
        .replace(/\\div/g, '÷')
        .replace(/\\neq/g, '≠')
        .replace(/\\approx/g, '≈')
        .replace(/\\leq/g, '≤')
        .replace(/\\geq/g, '≥')
        .replace(/\\subset/g, '⊂')
        .replace(/\\subseteq/g, '⊆')
        .replace(/\\in/g, '∈')
        .replace(/\\notin/g, '∉')
        .replace(/\\to/g, '→')
        .replace(/\\Rightarrow/g, '⇒')
        .replace(/\\Leftrightarrow/g, '⇔')
        .replace(/\\partial/g, '∂')
        .replace(/\\nabla/g, '∇')
        .replace(/\\forall/g, '∀')
        .replace(/\\exists/g, '∃')
        .replace(/\\emptyset/g, '∅')
        .replace(/\\cup/g, '∪')
        .replace(/\\cap/g, '∩')
        .replace(/\\ldots/g, '…')
        .replace(/\\cdots/g, '⋯')
        .replace(/\\vdots/g, '⋮')
        .replace(/\\ddots/g, '⋱')
        .replace(/\\hat\{([^}]*)\}/g, '$1̂') // Hat accent
        .replace(/\\bar\{([^}]*)\}/g, '$1̄') // Bar accent
        .replace(/\\dot\{([^}]*)\}/g, '$1̇') // Dot accent
        .replace(/\\vec\{([^}]*)\}/g, '$1⃗') // Vector arrow
        .replace(/\{/g, '') // Remove curly braces
        .replace(/\}/g, '') // Remove curly braces
        .replace(/\\/g, ''); // Remove backslashes
};
exports.latexToText = latexToText;
