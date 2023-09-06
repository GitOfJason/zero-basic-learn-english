import { RouteDataFuncArgs } from "@solidjs/router";
import { questionBank } from "~/data/question-bank";
import { Question, QuestionGroup } from "~/global";
import { createResource, createSignal } from "solid-js";
import { ExerciseMode } from "~/app-context";
import { Md5 } from "ts-md5";
import { makePersisted } from "@solid-primitives/storage";

export interface ExerciseResultData {
  questions: Question[];
  progress: number;
}

export const exerciseData = (route: RouteDataFuncArgs) => {
  const [data] = createResource(
    () => route,
    async route => {
      switch (route.params.mode) {
        case ExerciseMode.lesson: {
          const lessonId = route.location.query["id"];
          return getQuestionsByLesson(lessonId);
        }
        case ExerciseMode.sequence: {
          return getQuestionsBySequence();
        }
        default: {
          return getQuestionsByRandom();
        }
      }
    }
  );
  return data;
};

/**
 * 通过Lesson获取Question
 * @param lessonId
 */
function getQuestionsByLesson(lessonId: string): ExerciseResultData {
  const bank = questionBank.filter(item => item.lessonId == lessonId);
  const [signal] = makePersisted(createSignal([]), {
    storage: localStorage,
    name: `lesson${lessonId}-progress`
  });
  let questions = questionBankToQuestions(bank);
  return { questions: questions, progress: signal().length };
}

/**
 * 按顺序获取Question
 */
function getQuestionsBySequence(): ExerciseResultData {
  let questions = questionBankToQuestions(questionBank);
  const [signal] = makePersisted(createSignal([]), {
    storage: localStorage,
    name: `sequence-progress`
  });
  return { questions: questions, progress: signal().length };
}

/**
 * 随机获取Question
 */
function getQuestionsByRandom(): ExerciseResultData {
  let questions = questionBankToQuestions(questionBank);
  const [signal] = makePersisted(createSignal([]), {
    storage: localStorage,
    name: `random-progress`
  });
  return { questions: questions, progress: signal().length };
}

function questionBankToQuestions(questionBank: QuestionGroup[]) {
  let questions: Question[] = [];
  questionBank.forEach(groupItem => {
    groupItem.questions.forEach(item => {
      const questionId = new Md5();
      questionId.appendStr(groupItem.lessonId + item.question);
      questions.push({
        id: questionId.end()?.toString() ?? "",
        lessonId: groupItem.lessonId,
        title: groupItem.title,
        ...item
      });
    });
  });
  return questions;
}
