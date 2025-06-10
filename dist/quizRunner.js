"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRunner = void 0;
const enquirer_1 = __importDefault(require("enquirer"));
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("./utils");
const timer_1 = require("./timer");
var Table = require('cli-table3');
class QuizRunner {
    constructor(questions) {
        this.questions = (0, utils_1.suffleQuestions)(questions);
        this.timer = new timer_1.QuizTimer();
        this.results = {
            correct: 0,
            total: questions.length,
            incorrect: [],
            timeTaken: 0,
        };
    }
    async start() {
        console.log(chalk_1.default.blue.bold('\nStarting Quiz...'));
        console.log(chalk_1.default.yellow(`Total questions: ${this.results.total}\n`));
        for (const [index, question] of this.questions.entries()) {
            await this.askQuestion(question, index + 1);
        }
        this.results.timeTaken = this.timer.getElapsedTime();
        this.showFinalResults();
    }
    async askQuestion(question, qNum) {
        if (!question.options || Object.keys(question.options).length === 0) {
            console.log(chalk_1.default.red.bold(`Error: Question ${qNum} has no options to choose from.`));
            return;
        }
        const choices = Object.entries(question.options).map(([key, value]) => ({
            name: key,
            message: `${key}) ${value}`,
            value: key,
        }));
        if (choices.length === 0) {
            console.log(chalk_1.default.red.bold(`Error: Question ${qNum} has no valid choices.`));
            return;
        }
        const { answer } = await enquirer_1.default.prompt({
            type: 'select',
            name: 'answer',
            message: chalk_1.default.bold(`Q${qNum}: ${question.question}`),
            choices,
            prefix: chalk_1.default.cyan('?'),
        });
        const isCorrect = answer.toLowerCase() === question.answer.toLowerCase();
        if (isCorrect) {
            this.results.correct++;
        }
        else {
            this.results.incorrect.push(question);
        }
        (0, utils_1.displayResult)(isCorrect, question.answer);
    }
    async showFinalResults() {
        console.log(chalk_1.default.bold('\nQUIZ COMPLETE!\n'));
        console.log(chalk_1.default.blue(`Time taken: ${this.timer.formatTime(this.results.timeTaken)}`));
        console.log(chalk_1.default.green(`Correct answers: ${this.results.correct}/${this.results.total}`));
        console.log(chalk_1.default.red(`Incorrect answers: ${this.results.incorrect.length}\n\n`));
        if (this.results.incorrect.length > 0) {
            const { check } = await enquirer_1.default.prompt({
                type: 'confirm',
                name: 'chk',
                initial: true,
                message: 'Want to show incorrect answer?',
            });
            if (!check) {
                var table = new Table({
                    head: [
                        { colSpan: 2, hAlign: 'center', content: chalk_1.default.blue.bold('Review incorrect answers') },
                    ],
                    colWidths: [3, 120],
                    wordWrap: true,
                });
                this.results.incorrect.forEach((q, i) => {
                    table.push([
                        `${i + 1}`,
                        chalk_1.default.bold(`${q.question}`) +
                            '\n' +
                            chalk_1.default.green(`✓ ${q.answer}) ${q.options[q.answer]}`),
                    ]);
                });
                console.log(table.toString());
            }
        }
        console.log('\n');
    }
    getResults() {
        return this.results;
    }
}
exports.QuizRunner = QuizRunner;
