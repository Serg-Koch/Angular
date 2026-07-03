import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Question } from '../../shared/question';
import { Answer } from '../../shared/answer';
import { QuestionsAndAnswers } from '../../shared/questions-and-answers';
import { ElementSchemaRegistry } from '@angular/compiler';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-question-detail-page',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './question-detail-page.html',
  styleUrl: './question-detail-page.css',
})
export class QuestionDetailPage {
  #route = inject(ActivatedRoute);
  #questionsAndAnswers = inject(QuestionsAndAnswers);
  protected questions = signal<Question[]>([]);
  protected question = signal<Question | null>(null);
  protected topicId!: string;
  protected catalogId!: string;
  protected previousQuestionId!: number;
  protected nextQuestionId!: number;
  protected inputAnswer!: string;
  protected inputAnswers: Answer[] = [];
  protected isInputAnswersShowed = false;


  constructor() {
    this.#route.paramMap.subscribe((params) => {
      this.topicId = params.get('topicId')!;
      this.catalogId = params.get('catalogId')!;
      const id = Number(params.get('id'));

      this.loadQuestion(id);
    });
  }

  private loadQuestion(id: number) {
    this.#questionsAndAnswers.getAll(this.topicId, this.catalogId).subscribe((questions) => {
      this.questions.set(questions);

      const currentQuestion = questions.find((q) => q.id === id)!;
      this.question.set(currentQuestion);
      const currentIndex = questions.findIndex((q) => q.id === id);

      const previousIndex = currentIndex === 0 ? questions.length - 1 : currentIndex - 1;

      const nextIndex = currentIndex === questions.length - 1 ? 0 : currentIndex + 1;

      this.previousQuestionId = questions[previousIndex].id;
      this.nextQuestionId = questions[nextIndex].id;
    });
  }

  //Antwortenstruktur von <form>

  answerSingle = new FormGroup({
    answer: new FormControl(null),
  });
  answerMulti = new FormGroup({
    answer1: new FormControl(false),
    answer2: new FormControl(false),
    answer3: new FormControl(false),
    answer4: new FormControl(false),
    answer5: new FormControl(false),
  });
  answerTextInput = new FormGroup({
    answer: new FormControl(''),
  });

  //Zeigt die richtigen Antworte für keine Eingabenaufgaben
  checkAnswerS() {
    const allAnswers = this.question()?.answers!;
    this.resetSelection();
    for (const answer of allAnswers) {
        if(answer.isCorrect && answer.state !== 'correct'){
            this.resetState();
            answer.state = 'correct'
          }
          else{
           answer.state = '';
      }
    }
  }
    checkAnswerM() {
    const allAnswers = this.question()?.answers!;
    this.resetSelection();
    for (const answer of allAnswers) {
          if(!answer.isShown && answer.isCorrect){
            answer.state = 'correct';
            answer.isShown = true;
          }
          else
          {
            answer.state = '';
            answer.isShown = false;
          }
      }
    }

  //Überprüft Single-Choice-Eingabe
  checkSingle() {
    const answerId = Number(this.answerSingle.value.answer);
    const answer = this.question()?.answers.find((a) => a.id === answerId)!;
    if(answerId)
      {
      this.resetSelection();
      this.resetState();
      }
    if (answer.isCorrect) {
      answer.state = 'correct';
    } else {
      answer.state = 'wrong';
    }
  }

  //Überprüft Multiple-Choice-Eingabe
  checkMultiple() {
    const selected = this.answerMulti.value;
    const answers = this.question()?.answers ?? [];
    this.resetSelection();

    for (const answer of answers) {
      const isSelected = selected[`answer${answer.id}` as keyof typeof selected];
      if (isSelected && answer.isCorrect) {
        answer.state = 'correct';
      } else if (isSelected && !answer.isCorrect) {
        answer.state = 'wrong';
      } else {
        answer.state = '';
      }
    }
  }

  //Überprüft von Nutzer eingegebenden Text
  checkInput() {
    const answerId = this.answerTextInput.value.answer?.toLowerCase();
    if (!answerId) {
      this.inputAnswer = 'Du hast nichts eingetippt, schreib doch was!';
      return;
    }
    const answers = this.question()?.answers ?? [];
    this.inputAnswer = answers.some((answer) => answer.answerText.toLowerCase() === answerId)
      ? 'Es ist korrekt! =)'
      : 'Die Antwort ist falsch... =*(';
  }
  //Gibt die richtigen Antworte (Eigabenaufgabe) aus
  correctInput() {
    const answers = this.question()?.answers ?? [];
    this.inputAnswers = answers;
    if (!this.isInputAnswersShowed) {
      this.isInputAnswersShowed = true;
    } else {
      this.isInputAnswersShowed = false;
    }
  }
  resetSelection() {
    this.answerSingle.reset();
    this.answerMulti.reset();
  }
  resetState(){
    const answers = this.question()?.answers ?? [];
    for (const answer of answers)
    {
      answer.state = '';
    }
  }
  
}
