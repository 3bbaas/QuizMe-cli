"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadQuiz = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const loadQuiz = (source, isJson = false) => {
    try {
        const rawData = isJson ? source : fs_1.default.readFileSync(path_1.default.join(source), 'utf-8');
        const questions = JSON.parse(rawData);
        if (questions.length === 0) {
            throw new Error('No questions found in the quiz data');
        }
        return questions.map((q) => ({
            ...q,
            question: (0, utils_1.latexToText)(q.question),
            options: q.options
                ? Object.fromEntries(Object.entries(q.options).map(([key, value]) => [key, (0, utils_1.latexToText)(value)]))
                : {},
        }));
    }
    catch (error) {
        throw new Error(`Failed to load quiz file: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.loadQuiz = loadQuiz;
