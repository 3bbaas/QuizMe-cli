#!/usr/bin/env node

import Enquirer from 'enquirer';
import chalk from 'chalk';
var figlet = require('figlet');
import path from 'path';
import { loadQuiz } from './fileLoader';
import { QuizRunner } from './quizRunner';
import { validateFilePath, validateAndFetchUrl } from './utils';
import ora from 'ora';

async function main() {
  console.log(
    '\n\n' +
      chalk.yellowBright(
        figlet.textSync('Quiz-Me', {
          font: 'ANSI Shadow',
          horizontalLayout: 'default',
          verticalLayout: 'default',
        }),
      ) +
      chalk.yellowBright('\n\n\tCLI to create quick quiz from json file\n'),
  );

   const { sourceType } = await Enquirer.prompt<{ sourceType: string }>({
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
    const { filePath } = await Enquirer.prompt<{ filePath: string }>({
      type: 'input',
      name: 'filePath',
      message: 'Enter path to quiz JSON file:',
      initial: './quiz.json',
    });
    quizSource = path.resolve(filePath.replace(/^["']|["']$/g, '').trim());
  } else {
    const { url } = await Enquirer.prompt<{ url: string }>({
      type: 'input',
      name: 'url',
      message: 'Enter URL to quiz JSON:',
      initial: 'https://example.com/quiz.json',
    });
    quizSource = url.trim();
    isJson = true;
  }
  const spinner = ora('Loading quiz questions...').start();

  try {
    let questions;

    if (sourceType === 'local') {
      const validPath = validateFilePath(quizSource);
      spinner.succeed(`Found file: ${validPath}`);
      questions = loadQuiz(quizSource);
    } else {
      spinner.text = 'Fetching quiz from URL...';
      const jsonData = await validateAndFetchUrl(quizSource);
      spinner.succeed(`Successfully fetched quiz data from URL`);
      questions = loadQuiz(jsonData, true);
    }

    spinner.succeed(`Loaded ${questions.length} questions!`);

    const { proceed } = await Enquirer.prompt<{ proceed: boolean }>({
      type: 'confirm',
      name: 'proceed',
      message: 'Start quiz now?',
      initial: true,
    });

    if (proceed) {
      const quiz = new QuizRunner(questions);
      await quiz.start();
    } else {
      console.log(chalk.yellow('\nExiting. Run quizme again when ready!'));
    }
  } catch (error: any) {
    spinner.fail(error.message);
    process.exit(1);
  }
}

main().catch(console.error);
