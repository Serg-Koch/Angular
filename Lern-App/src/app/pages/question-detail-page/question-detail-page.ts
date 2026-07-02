import { Component, inject, signal } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

import { Question } from '../../shared/question';
import { Answer } from '../../shared/answer';
import { QuestionsAndAnswers } from '../../shared/questions-and-answers';

import { ElementSchemaRegistry } from '@angular/compiler';

import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-question-detail-page',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './question-detail-page.html',
  styleUrl: './question-detail-page.css',
})
export class QuestionDetailPage {
  #route = inject(ActivatedRoute);
  #questionsAndAnswers = inject(QuestionsAndAnswers);
  protected questions = signal<Question[]>([]);
  protected question = signal<Question | null>(null);
  protected isChecked = false;
  constructor() {
    const topicId = this.#route.snapshot.paramMap.get('topicId')!;
    const catalogId = this.#route.snapshot.paramMap.get('catalogId')!;
    const id = this.#route.snapshot.paramMap.get('id')!;
    this.#questionsAndAnswers.getAll(topicId, catalogId).subscribe((questions) => {
      this.questions.set(questions);
      this.question.set(questions.find((q) => q.id === Number(id))!);
    });
  }
  answerSingle = new FormGroup({
    answer: new FormControl(null),
  });
  answerMulti = new FormGroup({
    answer1: new FormControl(false),
    answer2: new FormControl(false),
    answer3: new FormControl(false),
    answer4: new FormControl(false),
    answer5: new FormControl(false),
    answer6: new FormControl(false),
  });
  checkAnswer() {
      const allAnswers = this.question()?.answers!;
      for (const answer of allAnswers) {
        if (answer.isCorrect) {
          answer.state = 'correct';
        }
        else
          answer.state = 'default';
      }
    //}
  }
  checkSingle() {
    const answerId = Number(this.answerSingle.value.answer);
    const answer = this.question()?.answers.find((a) => a.id === answerId)!;
    this.isChecked = true;
    if (answer.isCorrect) {
      answer.state = 'correct';
    }
    else {
      answer.state = 'wrong';
      const allAnswers = this.question()?.answers!;
      for (const answer of allAnswers) {
        if (answer.isCorrect) {
          answer.state = 'correct';
        }
      }
    }
  }
  checkMultiple() {
    const answerId = this.answerMulti.value;
    console.log(answerId);
    const que = this.question()?.answers!;
    for (const q of que) {
      const selected = answerId['answer${q.id}' as keyof typeof answerId];
      if (selected && q.isCorrect) q.state = 'correct';
      else if (selected && !q.isCorrect) q.state = 'wrong';
    }
  }
}
