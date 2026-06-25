import {inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';
import { Answer } from './answer';

@Injectable({
    providedIn:'root'
})
export class QuestionsAndAnswers {
    #http = inject(HttpClient);
    #apiUrlLpic101 = 'http://localhost:5046/questions/lpic101'
//    #apiUrlLpic102 = 'http://localhost:5046/questions/lpic102';
getAll(): Observable<Question[]> {
    return this.#http.get<Question[]>(`${this.#apiUrlLpic101}`);
}
}
