import { TestBed } from '@angular/core/testing';

import { QuestionsAndAnswers } from './questions-and-answers';

describe('QuestionsAndAnswers', () => {
  let service: QuestionsAndAnswers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsAndAnswers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
