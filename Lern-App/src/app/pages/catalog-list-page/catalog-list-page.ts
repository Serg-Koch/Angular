import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Catalog } from '../../shared/catalog';


@Component({
  selector: 'app-catalog-list-page',
  imports: [RouterLink],
  templateUrl: './catalog-list-page.html',
  styleUrl: './catalog-list-page.css',
})
export class CatalogListPage {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  catalogs = signal<Catalog[]>([]);
  topicId = this.route.snapshot.paramMap.get('topicId');

constructor() {
    this.http.get<Catalog[]>(`http://localhost:5100/topics/${this.topicId}/catalogs`)
    .subscribe(catalogs => {
      this.catalogs.set(catalogs);
    });
  }
}


