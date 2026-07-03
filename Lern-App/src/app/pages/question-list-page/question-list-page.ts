import { Component, inject, signal } from '@angular/core';
import { Question } from '../../shared/question';
import { Answer } from '../../shared/answer';
import { QuestionsAndAnswers } from '../../shared/questions-and-answers';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-question-list-page',
  imports: [RouterLink, NgClass],
  templateUrl: './question-list-page.html',
  styleUrl: './question-list-page.css',
})
export class QuestionListPage {
  #route = inject(ActivatedRoute);
  #questionsAndAnswers = inject(QuestionsAndAnswers);
  protected questions = signal<Question[]>([]);
  protected topicId!: string;
  protected catalogId!: string;
  protected isInputAnswersShowed = false;

  constructor() {
    this.topicId = this.#route.snapshot.paramMap.get('topicId')!;
    this.catalogId = this.#route.snapshot.paramMap.get('catalogId')!;
    this.#questionsAndAnswers.getAll(this.topicId, this.catalogId).subscribe((questions) => {
      this.questions.set(questions);
    });
  }

  //zeigt die richtigen Antworte
  showCorrectAnswer(id: number, type: string) {
    const question = this.questions().find((q) => q.id === id)!;
    if (type === 'fi') {
    this.isInputAnswersShowed = !this.isInputAnswersShowed;
    return;
  }
      for (const answer of question.answers) {
        answer.isCorrect && answer.state !== 'correct' ? answer.state = 'correct' : answer.state = '';
        }
      }
    }