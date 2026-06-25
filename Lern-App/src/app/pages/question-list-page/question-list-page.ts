import { Component, inject, signal } from '@angular/core';
import { Question } from '../../shared/question';
import { Answer } from '../../shared/answer';
import { QuestionsAndAnswers } from '../../shared/questions-and-answers';

@Component({
  selector: 'app-question-list-page',
  imports: [],
  templateUrl: './question-list-page.html',
  styleUrl: './question-list-page.css',
})
export class QuestionListPage {
protected questions = signal<Question[]>([]);
#questionsAndAnswers = inject(QuestionsAndAnswers)
  constructor() {
   this.#questionsAndAnswers.getAll().subscribe(questions =>{
    console.log(questions);
    this.questions.set(questions);
   })
  }
}
