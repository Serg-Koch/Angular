import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';
import { Catalog } from './catalog';
import { Topic } from './topic';

@Injectable({
    providedIn: 'root'
})
export class QuestionsAndAnswers {
    #http = inject(HttpClient);

    getAllQuestions(topicId: string, catalogId: string): Observable<Question[]> {
        return this.#http.get<Question[]>(
            `http://localhost:5100/topics/${topicId}/catalogs/${catalogId}/questions`
        );
    }
    getCatalog(topicId: string){
        return this.#http.get<Catalog[]>(`http://localhost:5100/topics/${topicId}/catalogs`);
    }
    getTopic(){
        return this.#http.get<Topic[]>('http://localhost:5100/topics');
    }
}
