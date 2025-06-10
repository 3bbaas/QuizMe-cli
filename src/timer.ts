export class QuizTimer {
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  getElapsedTime(): number {
    return (Date.now() - this.startTime) / 1000;
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  }
}
