import { useExerciseContext } from "../exercise-context";
import Input from "~/pages/exercise/components/Input";
import { Icon } from "@iconify-icon/solid";
import { A } from "solid-start";
import { Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

const ExerciseDesk = () => {
  const { state, memos, actions } = useExerciseContext();
  const navigator = useNavigate();

  return (
    <Show
      when={state.questions.length > 0}
      fallback={
        <div class="w-2xl px-6  pt-24 flex flex-col flex-justify-center flex-items-center">
          <Icon class="text-8xl mb-4" icon="solar:emoji-funny-circle-broken" />
          <h1 class="text-xl mb-8">当前没有可练习的题目</h1>
          <div class="space-x-sm">
            <button onClick={() => navigator("/")} class="bg-amber text-white px-8 py-2 rounded-36">
              返回
            </button>
          </div>
        </div>
      }
    >
      <Show
        when={state.progress <= state.questions.length - 1}
        fallback={
          <div class="w-2xl px-6  pt-24 flex flex-col flex-justify-center flex-items-center">
            <Icon class="text-8xl mb-4" icon="solar:confetti-bold-duotone" />
            <h1 class="text-xl mb-8">恭喜，你已完成所有练习</h1>
            <div class="space-x-sm">
              <button
                onClick={() => navigator("/")}
                class="bg-amber text-white px-8 py-2 rounded-36"
              >
                返回
              </button>
              <button
                class="bg-green text-white px-8 py-2 rounded-36"
                onClick={actions.resetProgress}
              >
                重新开始
              </button>
            </div>
          </div>
        }
      >
        <div class="w-2xl px-6 py-10">
          <div class="flex flex-justify-between flex-items-center mb-8">
            <div class="flex flex-items-center">
              <A href={"/"}>
                <Icon
                  class="mr-4 text-3xl flex flex-items-center"
                  icon="solar:round-alt-arrow-left-broken"
                />
              </A>
              <div>
                <h1 class="text-base font-medium">零基础学好英语语法</h1>
                <span class="text-xs">{memos.question().title}</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-4 px-6 py-6 relative">
            <h1 class="text-2xl text-gray-6 mb-4">{memos.question().question}</h1>
            <Input
              onSubmit={actions.next}
              rightAnswer={memos.question().answer}
              value={state.answer}
              onChange={actions.onAnswerChange}
            />
            <span class="absolute top-0 right-0 px-4 py-2 text-sm text-gray-4">
              {state.questions.length}/{state.progress + 1}
            </span>
          </div>
          <div class="mt-6 flex flex-justify-between">
            <div class="space-x-sm">
              <button onClick={actions.viewAnswer} class="bg-amber text-white px-8 py-2 rounded-36">
                提示
              </button>
              <button
                classList={{ "bg-green": memos.isRight(), "bg-gray-3": !memos.isRight() }}
                class=" text-white px-8 py-2 rounded-36"
                onClick={() => actions.next()}
              >
                下一题
              </button>
            </div>
            <button
              class="bg-red text-white px-8 py-2 rounded-36"
              onClick={() => actions.resetProgress()}
            >
              重置
            </button>
          </div>
        </div>
      </Show>
    </Show>
  );
};

export default ExerciseDesk;
