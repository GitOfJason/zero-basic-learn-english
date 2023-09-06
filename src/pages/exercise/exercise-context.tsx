import {
  createContext,
  ParentComponent,
  useContext,
  batch,
  createSignal,
  createMemo
} from "solid-js";
import { createStore } from "solid-js/store";
import { Question } from "~/global";
import { useParams, useLocation } from "@solidjs/router";
import { makePersisted } from "@solid-primitives/storage";
import { ExerciseMode } from "~/app-context";

interface ExerciseState {
  progress: number;
  questions: Question[];
  answer: string;
}

interface ExerciseContext {
  state: ExerciseState;
  memos: {
    question: () => Question;
    isRight: () => boolean;
  };
  actions: {
    next: () => void;
    onAnswerChange: (answer: string) => void;
    viewAnswer: () => void;
    resetProgress: () => void;
  };
}

export const ExerciseContext = createContext<ExerciseContext>();

export interface ExerciseProviderProps {
  progress: number;
  questions: Question[];
}

export const ExerciseProvider: ParentComponent<ExerciseProviderProps> = props => {
  const [state, setState] = createStore<ExerciseState & { randomQuestion?: Question }>({
    progress: props.progress,
    questions: props.questions,
    answer: ""
  });
  const routeParams = useParams();
  const routeLocation = useLocation();
  const [signal, setSignal] = makePersisted(createSignal<string[]>([]), {
    storage: localStorage,
    name: `${routeParams.mode}${routeLocation.query["id"] ?? ""}-progress`
  });

  const question = createMemo(() => {
    if (routeParams.mode == ExerciseMode.random) {
      const questions = state.questions.filter(item => {
        return signal().find(id => id == item.id) == undefined;
      });
      const randomIndex = Math.floor(Math.random() * questions.length);
      if (questions.length > 0) return questions[randomIndex];
    }
    return state.questions[state.progress];
  });

  const isRight = () => {
    return state.answer == question().answer;
  };

  const next = () => {
    if (isRight() && state.progress + 1 <= state.questions.length) {
      const preProgress = state.progress;
      const preQuestion = question();
      let list = [...signal()];
      list.push(preQuestion.id);
      setSignal(list);
      batch(() => {
        setState({ progress: preProgress + 1 });
        setState({ answer: "" });
      });
    }
  };

  const viewAnswer = () => {
    setState({ answer: question().answer });
  };

  const onAnswerChange = (answer: string) => {
    setState({ answer: answer });
  };

  const resetProgress = () => {
    setSignal([]);
    setState({ progress: 0 });
  };

  const context: ExerciseContext = {
    state: state,
    memos: {
      question: question,
      isRight: isRight
    },
    actions: {
      next: next,
      onAnswerChange: onAnswerChange,
      viewAnswer: viewAnswer,
      resetProgress: resetProgress
    }
  };
  return <ExerciseContext.Provider value={context}>{props.children}</ExerciseContext.Provider>;
};

export const useExerciseContext = () => useContext(ExerciseContext)!;
