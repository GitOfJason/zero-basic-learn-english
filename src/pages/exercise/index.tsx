import { useRouteData } from "@solidjs/router";
import { exerciseData } from "~/pages/exercise/exercise.data";
import { ExerciseProvider } from "./exercise-context";
import { Show } from "solid-js";
import ExerciseDesk from "~/pages/exercise/components/ExerciseDesk";

export default function () {
  const data = useRouteData<typeof exerciseData>();

  return (
    <Show
      when={data.loading}
      fallback={
        <ExerciseProvider progress={data()?.progress ?? 0} questions={data()?.questions ?? []}>
          <ExerciseDesk />
        </ExerciseProvider>
      }
    >
      <div class="p-10">Loading...</div>
    </Show>
  );
}
