#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enquirer_1 = __importDefault(require("enquirer"));
const chalk_1 = __importDefault(require("chalk"));
var figlet = require('figlet');
const path_1 = __importDefault(require("path"));
const fileLoader_1 = require("./fileLoader");
const quizRunner_1 = require("./quizRunner");
const utils_1 = require("./utils");
const ora_1 = __importDefault(require("ora"));
async function main() {
    console.log('\n\n' +
        chalk_1.default.yellowBright(figlet.textSync('Quiz-Me', {
            font: 'ANSI Shadow',
            horizontalLayout: 'default',
            verticalLayout: 'default',
        })) +
        chalk_1.default.yellowBright('\n\n\tCLI to create quick quiz from json file\n'));
    const { sourceType } = await enquirer_1.default.prompt({
        type: 'select',
        name: 'sourceType',
        message: 'Select quiz source:',
        choices: [
            { name: 'local', message: 'Local JSON file' },
            { name: 'url', message: 'Remote URL (https://...)' },
        ],
    });
    let quizSource = '';
    let isJson = false;
    if (sourceType === 'local') {
        const { filePath } = await enquirer_1.default.prompt({
            type: 'input',
            name: 'filePath',
            message: 'Enter path to quiz JSON file:',
            initial: './quiz.json',
        });
        quizSource = path_1.default.resolve(filePath.replace(/^["']|["']$/g, '').trim());
    }
    else {
        const { url } = await enquirer_1.default.prompt({
            type: 'input',
            name: 'url',
            message: 'Enter URL to quiz JSON:',
            initial: 'https://example.com/quiz.json',
        });
        quizSource = url.trim();
        isJson = true;
    }
    const spinner = (0, ora_1.default)('Loading quiz questions...').start();
    try {
        let questions;
        if (sourceType === 'local') {
            const validPath = (0, utils_1.validateFilePath)(quizSource);
            spinner.succeed(`Found file: ${validPath}`);
            questions = (0, fileLoader_1.loadQuiz)(quizSource);
        }
        else {
            spinner.text = 'Fetching quiz from URL...';
            const jsonData = await (0, utils_1.validateAndFetchUrl)(quizSource);
            spinner.succeed(`Successfully fetched quiz data from URL`);
            questions = (0, fileLoader_1.loadQuiz)(jsonData, true);
        }
        spinner.succeed(`Loaded ${questions.length} questions!`);
        const { proceed } = await enquirer_1.default.prompt({
            type: 'confirm',
            name: 'proceed',
            message: 'Start quiz now?',
            initial: true,
        });
        if (proceed) {
            const quiz = new quizRunner_1.QuizRunner(questions);
            await quiz.start();
        }
        else {
            console.log(chalk_1.default.yellow('\nExiting. Run quizme again when ready!'));
        }
    }
    catch (error) {
        spinner.fail(error.message);
        process.exit(1);
    }
}
main().catch(console.error);
