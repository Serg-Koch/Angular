import { Component, computed, inject, signal } from '@angular/core';
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
  protected allAnswers = computed(() => {
    return this.question()?.answers ?? [];
  });
  protected topicId!: string;
  protected catalogId!: string;
  protected previousQuestionId!: number;
  protected nextQuestionId!: number;
  protected inputAnswer!: string;
  protected isInputAnswersShowed = false;
  protected inputAnswerState: 'default' | 'correct' | 'wrong' = 'default';

  constructor() {
    this.#route.paramMap.subscribe((params) => {
      this.topicId = params.get('topicId')!;
      this.catalogId = params.get('catalogId')!;
      const id = Number(params.get('id'));

      this.loadQuestion(id);
    });
  }

  private loadQuestion(id: number) {
    this.#questionsAndAnswers
      .getAllQuestions(this.topicId, this.catalogId)
      .subscribe((questions) => {
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
  showAnswerSingle() {
    this.resetSelection();
    for (const answer of this.allAnswers()) {
      if (answer.isCorrect && answer.state !== 'correct') {
        answer.state = 'correct';
      } else {
        answer.state = '';
      }
    }
  }
  showAnswerMultiple() {
    this.resetSelection();
    for (const answer of this.allAnswers()) {
      if (!answer.isShown && answer.isCorrect) {
        answer.state = 'correct';
        answer.isShown = true;
      } else {
        answer.state = '';
        answer.isShown = false;
      }
    }
  }

  //Überprüft Single-Choice-Eingabe
  checkSingle() {
    const answerInput = Number(this.answerSingle.value.answer);
    const answer = this.allAnswers().find((a) => a.id === answerInput)!;
    this.resetSelection();
    this.resetState();
    if (answerInput != 0) {
      if (answer.isCorrect) {
        answer.state = 'correct';
      } else {
        answer.state = 'wrong';
      }
    }
  }

  //Überprüft Multiple-Choice-Eingabe
  checkMultiple() {
    const selected = this.answerMulti.value;
    this.resetSelection();
    this.resetState();
    for (const answer of this.allAnswers()) {
      const isSelected = selected[`answer${answer.id}` as keyof typeof selected];
      if (isSelected && answer.isCorrect) {
        answer.state = 'correct';
      } else if (isSelected && !answer.isCorrect) {
        answer.state = 'wrong';
      }
    }
  }

  //Überprüft von Nutzer eingegebenden Text
  checkInput() {
    const answerTextInput = this.answerTextInput.value.answer?.toLowerCase();
    if (!answerTextInput) {
      this.inputAnswer = 'Bitte eine Antwort eingeben!';
      this.inputAnswerState = 'default';
      return;
    }
    if (this.allAnswers().some((answer) => answer.answerText.toLowerCase() === answerTextInput)) {
      this.inputAnswer = 'Die Antwort ist korrekt! =)';
      this.inputAnswerState = 'correct';
    } else {
      this.inputAnswer = 'Die Antwort ist falsch!';
      this.inputAnswerState = 'wrong';
    }
  }

  showAnswerInput() {
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

  resetState() {
    for (const answer of this.allAnswers()) {
      answer.state = '';
    }
  }
}
