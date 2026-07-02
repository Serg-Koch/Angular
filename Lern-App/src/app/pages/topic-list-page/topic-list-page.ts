import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Topic } from '../../shared/topic';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-topic-list-page',
  imports: [RouterLink],
  templateUrl: './topic-list-page.html',
  styleUrl: './topic-list-page.css',
})
export class TopicListPage {
  private http = inject(HttpClient);

  topics = signal<Topic[]>([]);
  hasError = signal(false);

  constructor() {
    this.http.get<Topic[]>('http://localhost:5100/topics')
    .subscribe({
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
