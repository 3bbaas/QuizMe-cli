import logSymbol from 'log-symbols';
import chalk from 'chalk';
import fs from 'fs';
import axios from 'axios';

export const displayResult = (isCorrect: boolean, correctAnswer?: string): void => {
  if (isCorrect) {
    console.log(`${logSymbol.success}   ${chalk.green.bold('GooAAAAaaal!')}\n`);
  } else {
    console.log(
      `${logSymbol.error}   ${chalk.red.bold('Wro00000ong!')}\n ${chalk.yellow.bold(
        `   Correct: ${correctAnswer}`,
      )}\n`,
    );
  }
};
export function validateFilePath(filePath: string): string {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      throw new Error(`Path is not a file: ${filePath}`);
    }

    return filePath;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid file path: ${error.message}`);
    } else {
      throw new Error(`Invalid file path: ${String(error)}`);
    }
  }
}

export const suffleQuestions = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export async function validateAndFetchUrl(url: string): Promise<string> {
  try {
    new URL(url);

    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch from URL: HTTP status ${response.status}`);
    }

    return JSON.stringify(response.data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid URL or fetch failed: ${error.message}`);
    } else {
      throw new Error(`Invalid URL or fetch failed: ${String(error)}`);
    }
  }
}
export const latexToText = (latex: string): string => {
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
