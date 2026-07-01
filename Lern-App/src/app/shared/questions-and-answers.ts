import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';

@Injectable({
    providedIn: 'root'
})
export class QuestionsAndAnswers {
    #http = inject(HttpClient);

    getAll(topicId: string, catalogId: string): Observable<Question[]> {
        return this.#http.get<Question[]>(
            `http://localhost:5100/topics/${topicId}/catalogs/${catalogId}/questions`
        );
    }
}
