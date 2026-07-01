import { Component, inject, signal } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

import { Question } from '../../shared/question';
import { Answer } from '../../shared/answer';
import { QuestionsAndAnswers } from '../../shared/questions-and-answers';

import { ElementSchemaRegistry } from '@angular/compiler';

import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { NgClass } from '@angular/common';



@Component({
  selector: 'app-question-detail-page',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './question-detail-page.html',
  styleUrl: './question-detail-page.css',
})
export class QuestionDetailPage {

  #route = inject(ActivatedRoute);
  #questionsAndAnswers = inject(QuestionsAndAnswers)
  protected questions = signal<Question[]>([]);
  protected question = signal<Question | null>(null);
  constructor() {
      const topicId = this.#route.snapshot.paramMap.get('topicId')!;
  const catalogId = this.#route.snapshot.paramMap.get('catalogId')!;
    const id = this.#route.snapshot.paramMap.get('id')!;
    this.#questionsAndAnswers.getAll(topicId, catalogId).subscribe(questions => {
      this.questions.set(questions);
      this.question.set(questions.find(q => q.id === Number(id))!);
    })
  }


answerCheck = new FormGroup({
  answer: new FormControl('')
});
checkAnswer(){
  const answerId = Number(this.answerCheck.value.answer);
  //const q = this.question()?.answers.find(a => a.id === answerId)!;
  if(answerId === 0){
    const allAnswers = this.question()?.answers!;
    for(const answer of allAnswers){
      if(answer.isCorrect)
      {
        answer.state = 'correct';
      }
    }
  }
checkSingle(){
  


  /*if (q.isCorrect)
  {
    q.state = 'correct';
  }
  else{
    const allAnswers = this.question()?.answers!;
    for(const answer of allAnswers){
      if(answer !== q && answer.isCorrect)
      {
        answer.state = 'correct';
      }
      else
      {
        answer.state = 'wrong';
      }
    }
}
checkSingle(){
  const answerId = Number(this.answerCheck.value.answer);
  const q = this.question()?.answers.find(a => a.id === answerId)!;
  if (q.isCorrect)
  {
    q.state = 'correct';
  }
  else{
    const allAnswers = this.question()?.answers!;
    for(const answer of allAnswers){
      if(answer !== q && answer.isCorrect)
      {
        answer.state = 'correct';
      }
      else
      {
        answer.state = 'wrong';
      }
    }
}
}
showCorrectAnswer(id:number){
    
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
  }
  */
}
