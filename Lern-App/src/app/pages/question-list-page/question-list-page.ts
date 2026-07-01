import { Component, inject, signal } from '@angular/core';
import { Question } from '../../shared/question';
import { Answer } from '../../shared/answer';
import { QuestionsAndAnswers } from '../../shared/questions-and-answers';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-question-list-page',
  imports: [RouterLink],
  templateUrl: './question-list-page.html',
  styleUrl: './question-list-page.css',
})
export class QuestionListPage {
#route = inject(ActivatedRoute);
#questionsAndAnswers = inject(QuestionsAndAnswers)
protected questions = signal<Question[]>([]);
protected level! : string;

constructor() {
  this.level = this.#route.snapshot.paramMap.get('level')!;
  this.#questionsAndAnswers.getAll(this.level).subscribe(questions =>{
    this.questions.set(questions);
   })
  }
/*showCorrectAnswer(id:number){
    const question = this.questions().find(q => q.id === id)!;
    for(const answer of question.answers){
      if(answer.isCorrect && !answer.isShowed)
      {
        answer.isShowed = true;
      }
      else if (answer.isCorrect && answer.isShowed)
      {
        answer.isShowed = false;
      }
    }
  }*/
}