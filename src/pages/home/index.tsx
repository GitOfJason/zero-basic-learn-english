import { For, Match, Switch } from "solid-js";
import { ExerciseMode, useAppContext } from "~/app-context";
import { A } from "solid-start";
import { Icon } from "@iconify-icon/solid";

const tabs = [
  {
    mode: ExerciseMode.lesson,
    title: "课程"
  },
  {
    mode: ExerciseMode.sequence,
    title: "顺序"
  },
  {
    mode: ExerciseMode.random,
    title: "随机"
  }
];

export default function () {
  const { state, actions } = useAppContext();

  const changeMode = (mode: ExerciseMode) => {
    actions.changeMode(mode);
  };

  return (
    <div class="w-2xl mt-6 px-6">
      <div class="flex flex-justify-center flex-col flex-items-center  py-12">
        <Icon class="text-8xl mb-2" icon={"solar:square-academic-cap-2-line-duotone"} />
        <span class="text-3xl font-medium text-gray-8 mb-1">
          <span class="text-gray-4">‹</span> 零基础学好英语语法 <span class="text-gray-4">›</span>
        </span>
        <span class="text-xl font-light">消除语法练习心智负担</span>
      </div>
      <div class="flex space-x-sm">
        <For each={tabs}>
          {tab => (
            <button
              class="text-gray-5 flex-1 py-2 text-base px-4 py-1 rounded-t-4"
              classList={{
                "bg-white text-gray-6 font-medium": tab.mode == state.exerciseMode,
                "bg-gray-2": tab.mode !== state.exerciseMode
              }}
              onClick={() => changeMode(tab.mode)}
            >
              {tab.title}
            </button>
          )}
        </For>
      </div>
      <div class="bg-white rounded-b-4 p-6">
        <Switch>
          <Match when={state.exerciseMode == ExerciseMode.lesson}>
            <p class="pb-4">课程模式，选择指定章节题目进行练习。</p>
            <ul>
              <For each={state.lessons}>
                {item => (
                  <li class="py-3 flex flex-items-center border-b-1 border-b-dotted">
                    <Icon class="mr-2" icon={"solar:round-alt-arrow-right-broken"} />
                    <A href={`/exercise/${ExerciseMode.lesson}?id=${item.lessonId}`}>
                      {item.title}
                    </A>
                  </li>
                )}
              </For>
            </ul>
          </Match>
          <Match when={state.exerciseMode == ExerciseMode.sequence}>
            <p class="pb-6">顺序模式，按照章节顺序进行练习。</p>
            <A
              class="bg-green text-white px-8 py-2 rounded-36"
              href={`/exercise/${ExerciseMode.sequence}`}
            >
              开始练习
            </A>
          </Match>
          <Match when={state.exerciseMode == ExerciseMode.random}>
            <p class="pb-6">随机模式，随机题目进行练习，建议学习完全书内容后使用该模式。</p>
            <A
              class="bg-green text-white px-8 py-2 rounded-36"
              href={`/exercise/${ExerciseMode.random}`}
            >
              开始练习
            </A>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
