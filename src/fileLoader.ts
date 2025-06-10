import fs from 'fs';
import path from 'path';
import { IQuizQ } from './types';
import { latexToText } from './utils';

export const loadQuiz = (source: string, isJson = false): IQuizQ[] => {
  try {
    const rawData = isJson ? source : fs.readFileSync(path.join(source), 'utf-8');
    const questions: IQuizQ[] = JSON.parse(rawData);
    if (questions.length === 0) {
      throw new Error('No questions found in the quiz data');
    }
    return questions.map((q) => ({
      ...q,
      question: latexToText(q.question),
      options: q.options
        ? Object.fromEntries(
            Object.entries(q.options).map(([key, value]) => [key, latexToText(value)]),
          )
        : {},
    }));
  } catch (error) {
    throw new Error(
      `Failed to load quiz file: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
