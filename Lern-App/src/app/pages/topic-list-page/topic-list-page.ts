import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Topic } from '../../shared/topic';
import { HttpClient } from '@angular/common/http';
import { QuestionsAndAnswers } from '../../shared/questions-and-answers';

@Component({
  selector: 'app-topic-list-page',
  imports: [RouterLink],
  templateUrl: './topic-list-page.html',
  styleUrl: './topic-list-page.css',
})
export class TopicListPage {
  #http = inject(HttpClient);
  #questionsAndAnswers = inject(QuestionsAndAnswers);
  topics = signal<Topic[]>([]);
  hasError = signal(false);

  constructor() {
    this.#questionsAndAnswers.getTopic().subscribe({
      next: topics => {
        this.topics.set(topics);
      },
      error: error => {
        console.error(error);
        this.hasError.set(true);
      }
    });   
  }
}
