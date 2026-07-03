export interface Answer {
    id: number;
    answerText: string;
    isCorrect: boolean;
    state: 'default' | 'correct' | 'wrong' | "";
    isShown: boolean;
}
