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
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './question-detail-page.html',
  styleUrl: './question-detail-page.css',
})
export class QuestionDetailPage {
  #route = inject(ActivatedRoute);
  #questionsAndAnswers = inject(QuestionsAndAnswers);
  protected questions = signal<Question[]>([]);
  protected question = signal<Question | null>(null);
  protected topicId!: string;
  protected catalogId!: string;
  protected previousQuestionId!: number;
  protected nextQuestionId!: number;
  protected inputAnswer!: string;
  protected inputAnswers: Answer[] = [];
  protected isInputAnswersShowed = false;
  protected inputAnswerState: 'default' | 'correct' | 'wrong' = 'default';

  constructor() {
    this.#route.paramMap.subscribe((params) => {
      this.topicId = params.get('topicId')!;
      this.catalogId = params.get('catalogId')!;
      const id = Number(params.get('id'));

      this.loadQuestion(id);
    });
  }

  private loadQuestion(id: number) {
    this.#questionsAndAnswers.getAll(this.topicId, this.catalogId).subscribe((questions) => {
      this.questions.set(questions);

      const currentQuestion = questions.find((q) => q.id === id)!;
      this.question.set(currentQuestion);
      const currentIndex = questions.findIndex((q) => q.id === id);

      const previousIndex = currentIndex === 0 ? questions.length - 1 : currentIndex - 1;

      const nextIndex = currentIndex === questions.length - 1 ? 0 : currentIndex + 1;

      this.previousQuestionId = questions[previousIndex].id;
      this.nextQuestionId = questions[nextIndex].id;
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
  });
  answerTextInput = new FormGroup({
    answer: new FormControl(''),
  });

  checkAnswer() {
    const answerId = this.answerSingle.value.answer;
    if (answerId === null) {
      const allAnswers = this.question()?.answers!;
      for (const answer of allAnswers) {
        if (answer.state == 'correct') {
          answer.state = 'default';
        } else if (answer.isCorrect) {
          answer.state = 'correct';
        }
      }
    }
  }
  checkSingle() {
    const answerId = Number(this.answerSingle.value.answer);
    const answer = this.question()?.answers.find((a) => a.id === answerId)!;
    if (answer.isCorrect) {
      answer.state = 'correct';
    } else {
      answer.state = 'wrong';
      const allAnswers = this.question()?.answers!;
      for (const answer of allAnswers) {
        if (answer.isCorrect) {
          answer.state = 'correct';
        }
      }
    }
  }
  /*checkMultiple() {
    const answerId = this.answerMulti.value;
    console.log(answerId);
    const answers = this.question()?.answers!;
    for (const answer of answers) {
      const selected = answerId['answer${q.id}' as keyof typeof answerId];
      if (selected && answer.isCorrect){
        answer.state = 'correct';
      }
      else if (selected && !q.isCorrect)
         {answer.state = 'wrong';}
    }
  }*/
  checkMultiple() {
    const selected = this.answerMulti.value;
    const answers = this.question()?.answers ?? [];

    for (const answer of answers) {
      const isSelected = selected[`answer${answer.id}` as keyof typeof selected];
      if (isSelected && answer.isCorrect) {
        answer.state = 'correct';
      } else if (isSelected && !answer.isCorrect) {
        answer.state = 'wrong';
      } else {
        answer.state = '';
      }
    }
  }
  checkInput() {
    const answerId = this.answerTextInput.value.answer?.toLowerCase();
    if (!answerId) {
      this.inputAnswer = 'Bitte eine Antwort eingeben!';
      this.inputAnswerState = 'default';
      return;
    }
    const answers = this.question()?.answers ?? [];
    if (answers.some(answer => answer.answerText.toLowerCase() === answerId)) {
      this.inputAnswer = 'Die Antwort ist korrekt! =)';
      this.inputAnswerState = 'correct';
    } else {
      this.inputAnswer = 'Die Antwort ist falsch!';
      this.inputAnswerState = 'wrong';
    }
  }

  correctInput() {
    const answers = this.question()?.answers ?? [];
    this.inputAnswers = answers;
    if (!this.isInputAnswersShowed) {
      this.isInputAnswersShowed = true;
    } else {
      this.isInputAnswersShowed = false;
    }
  }
}
