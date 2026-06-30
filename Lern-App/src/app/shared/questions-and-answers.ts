import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';
import { Answer } from './answer';

@Injectable({
    providedIn: 'root'
})
export class QuestionsAndAnswers {
    #http = inject(HttpClient);
    #apiUrlLpic101 = 'http://localhost:5100/questions/lpic101';
    #apiUrlLpic102 = 'http://localhost:5100/questions/lpic102';
    getAll(level: string): Observable<Question[]> {
        switch (level) {
            case "101":
                return this.#http.get<Question[]>(`${this.#apiUrlLpic101}`);
            case "102":
                return this.#http.get<Question[]>(`${this.#apiUrlLpic102}`);
            default:
                throw new Error("Unknown level");
        }
    }
    getSingle(level: string, id: string): Observable<Question> {

        switch (level) {
            case "101":
                return this.#http.get<Question>(`${this.#apiUrlLpic101}/${id}`);
            case "102":
                return this.#http.get<Question>(`${this.#apiUrlLpic102}/${id}`);
            default:
                throw new Error("Unknown level");
        }
    }
}
