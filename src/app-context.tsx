import { createContext, createMemo, onMount, ParentComponent, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { questionBank } from "~/data/question-bank";
import { Lesson } from "~/global";

export enum ExerciseMode {
  lesson = "lesson",
  sequence = "sequence",
  random = "random"
}

type AppContextState = {
  readonly exerciseMode: ExerciseMode;
  readonly lessons: Lesson[];
};

interface AppContext {
  state: AppContextState;
  actions: {
    changeMode: (changeMode: ExerciseMode) => void;
  };
}

export const AppContext = createContext<AppContext>({
  state: { exerciseMode: ExerciseMode.lesson, lessons: [] },
  actions: {
    changeMode: () => {}
  }
});

export const AppProvider: ParentComponent = props => {
  const [state, setState] = createStore<AppContextState>({
    exerciseMode: ExerciseMode.lesson,
    lessons: []
  });

  onMount(() => {
    const lessons = questionBank.map(lesson => ({
      lessonId: lesson.lessonId,
      title: lesson.title
    }));
    setState({ lessons: lessons });
  });

  const changeMode = (mode: ExerciseMode) => {
    setState({ exerciseMode: mode });
  };

  const value = {
    state,
    actions: {
      changeMode: changeMode
    }
  };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
