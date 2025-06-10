import Enquirer from 'enquirer';
import chalk from 'chalk';
import { IQuizQ, IQuizResult } from './types';
import { displayResult, suffleQuestions } from './utils';
import { QuizTimer } from './timer';
var Table = require('cli-table3');

export class QuizRunner {
  private questions: IQuizQ[];
  private timer: QuizTimer;
  private results: IQuizResult;

  constructor(questions: IQuizQ[]) {
    this.questions = suffleQuestions(questions);
    this.timer = new QuizTimer();
    this.results = {
      correct: 0,
      total: questions.length,
      incorrect: [],
      timeTaken: 0,
    };
  }

  async start() {
    console.log(chalk.blue.bold('\nStarting Quiz...'));
    console.log(chalk.yellow(`Total questions: ${this.results.total}\n`));

    for (const [index, question] of this.questions.entries()) {
      await this.askQuestion(question, index + 1);
    }

    this.results.timeTaken = this.timer.getElapsedTime();
    this.showFinalResults();
  }
  private async askQuestion(question: IQuizQ, qNum: number) {
    if (!question.options || Object.keys(question.options).length === 0) {
      console.log(chalk.red.bold(`Error: Question ${qNum} has no options to choose from.`));
      return;
    }

    const choices = Object.entries(question.options).map(([key, value]) => ({
      name: key,
      message: `${key}) ${value}`,
      value: key,
    }));

    if (choices.length === 0) {
      console.log(chalk.red.bold(`Error: Question ${qNum} has no valid choices.`));
      return;
    }

    const { answer } = await Enquirer.prompt<{ answer: string }>({
      type: 'select',
      name: 'answer',
      message: chalk.bold(`Q${qNum}: ${question.question}`),
      choices,
      prefix: chalk.cyan('?'),
    });

    const isCorrect = answer.toLowerCase() === question.answer.toLowerCase();

    if (isCorrect) {
      this.results.correct++;
    } else {
      this.results.incorrect.push(question);
    }

    displayResult(isCorrect, question.answer);
  }

  private async showFinalResults() {
    console.log(chalk.bold('\nQUIZ COMPLETE!\n'));
    console.log(chalk.blue(`Time taken: ${this.timer.formatTime(this.results.timeTaken)}`));
    console.log(chalk.green(`Correct answers: ${this.results.correct}/${this.results.total}`));
    console.log(chalk.red(`Incorrect answers: ${this.results.incorrect.length}\n\n`));

    if (this.results.incorrect.length > 0) {
      const { check } = await Enquirer.prompt<{ check: boolean }>({
        type: 'confirm',
        name: 'chk',
        initial: true,
        message: 'Want to show incorrect answer?',
      });
      if (!check) {
        var table = new Table({
          head: [
            { colSpan: 2, hAlign: 'center', content: chalk.blue.bold('Review incorrect answers') },
          ],
          colWidths: [3, 120],
          wordWrap: true,
        });

        this.results.incorrect.forEach((q, i) => {
          table.push([
            `${i + 1}`,
            chalk.bold(`${q.question}`) +
              '\n' +
              chalk.green(`✓ ${q.answer}) ${q.options[q.answer]}`),
          ]);
        });
        console.log(table.toString());
      }
    }

    console.log('\n');
  }

  getResults(): IQuizResult {
    return this.results;
  }
}
