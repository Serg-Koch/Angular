import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Question } from '../../shared/question';
import { Answer } from '../../shared/answer';
import { QuestionsAndAnswers } from '../../shared/questions-and-answers';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { ElementSchemaRegistry } from '@angular/compiler';


@Component({
  selector: 'app-question-detail-page',
  imports: [ReactiveFormsModule],
  templateUrl: './question-detail-page.html',
  styleUrl: './question-detail-page.css',
})
export class QuestionDetailPage{
  
#route = inject(ActivatedRoute);
#questionsAndAnswers = inject(QuestionsAndAnswers)
protected questions = signal<Question[]>([]);
protected question = signal<Question| null>(null);
constructor() {
  const level = this.#route.snapshot.paramMap.get('level')!;
  const id = this.#route.snapshot.paramMap.get('id')!;
  this.#questionsAndAnswers.getAll(level).subscribe(questions =>{
    this.questions.set(questions);
  this.question.set(questions.find(q => q.id === Number(id))!);
   })
  }

answerCheck = new FormGroup({
  answer: new FormControl('')
});
checkSingle(){
  const answerId = Number(this.answerCheck.value.answer);
  const q = this.question()?.answers.find(a => a.id === answerId)!;
  if (q.isCorrect)
  {
    console.log('Es funktioniert!');
  }
  else{
    console.log('nicht funkt')};

}
}