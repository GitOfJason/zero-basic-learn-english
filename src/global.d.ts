/// <reference types="solid-start/env" />

export interface QuestionBase {
  question: string;
  answer: string;
}

export interface Lesson {
  lessonId: string;
  title: string;
}

export interface Question extends QuestionBase, Lesson {
  id: string;
}

export interface QuestionGroup extends Lesson {
  questions: QuestionBase[];
}
