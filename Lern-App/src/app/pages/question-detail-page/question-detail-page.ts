import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Question } from '../../shared/question';
import { Answer } from '../../shared/answer';
import { QuestionsAndAnswers } from '../../shared/questions-and-answers';


@Component({
  selector: 'app-question-detail-page',
  imports: [RouterLink],
  templateUrl: './question-detail-page.html',
  styleUrl: './question-detail-page.css',
})
export class QuestionDetailPage{
  
#route = inject(ActivatedRoute);
#questionsAndAnswers = inject(QuestionsAndAnswers)
protected question = signal<Question | null>(null);
constructor() {
  const level = this.#route.snapshot.paramMap.get('level')!;
  const id = this.#route.snapshot.paramMap.get('id')!;
  this.#questionsAndAnswers.getSingle(level,id).subscribe(question =>{
    this.question.set(question);
   })
  }

}