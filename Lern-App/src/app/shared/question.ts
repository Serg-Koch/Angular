import { Answer } from './answer';

export interface Question {
  id: number;
  type: string;
  questionText: string;
  answers: Answer[];
  hint: string;
}
