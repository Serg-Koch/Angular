import { Component, inject, signal } from '@angular/core';
import { Question } from '../../shared/question';
import { Answer } from '../../shared/answer';
import { QuestionsAndAnswers } from '../../shared/questions-and-answers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-list-page',
  imports: [],
  templateUrl: './question-list-page.html',
  styleUrl: './question-list-page.css',
})
export class QuestionListPage {
#route = inject(ActivatedRoute);
#questionsAndAnswers = inject(QuestionsAndAnswers)
protected questions = signal<Question[]>([]);
constructor() {
  const level = this.#route.snapshot.paramMap.get('level')!;
  this.#questionsAndAnswers.getAll(level).subscribe(questions =>{
    this.questions.set(questions);
   })
  }
}
