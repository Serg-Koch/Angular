export interface Answer {
    id: number;
    answerText: string;
    isCorrect: boolean;
    state: 'correct' | 'wrong' | "";
    isShown: boolean;
}
