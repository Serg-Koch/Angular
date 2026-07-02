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
  #questionsAndAnswers = inject(QuestionsAndAnswers)
  protected questions = signal<Question[]>([]);
  protected topicId!: string;
  protected catalogId!: string;

  constructor() {
    this.topicId = this.#route.snapshot.paramMap.get('topicId')!;
    this.catalogId = this.#route.snapshot.paramMap.get('catalogId')!;
console.log('topicId:', this.topicId);
console.log('catalogId:', this.catalogId);

    this.#questionsAndAnswers.getAll(this.topicId, this.catalogId).subscribe(questions => {
      this.questions.set(questions);
    })
  }
  showCorrectAnswer(id: number) {
    const question = this.questions().find((q) => q.id === id)!;
    for (const answer of question.answers) {
      if (answer.isCorrect) {
        answer.state = 'correct';
      }
    }
  }
}
