"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizTimer = void 0;
class QuizTimer {
    constructor() {
        this.startTime = Date.now();
    }
    getElapsedTime() {
        return (Date.now() - this.startTime) / 1000;
    }
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}m ${secs}s`;
    }
}
exports.QuizTimer = QuizTimer;
