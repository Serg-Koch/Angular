import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Catalog } from '../../shared/catalog';
import { QuestionsAndAnswers } from '../../shared/questions-and-answers';


@Component({
  selector: 'app-catalog-list-page',
  imports: [RouterLink],
  templateUrl: './catalog-list-page.html',
  styleUrl: './catalog-list-page.css',
})
export class CatalogListPage {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  #questionsAndAnswers = inject(QuestionsAndAnswers);

  catalogs = signal<Catalog[]>([]);
  topicId: string;

  constructor() {
    this.topicId = this.route.snapshot.paramMap.get('topicId')!;
    console.log('loading catalogs', this.topicId);
    this.#questionsAndAnswers.getCatalog(this.topicId).subscribe((catalogs) => {
      this.catalogs.set(catalogs);
    });
  }
}


