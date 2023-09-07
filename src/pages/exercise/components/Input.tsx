import { Component, createMemo, For, Show } from "solid-js";
import { Icon } from "@iconify-icon/solid";

interface InputProps {
  value: string;
  rightAnswer: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

const Input: Component<InputProps> = props => {
  const data = createMemo(() => {
    const answerChars = props.value.split("");
    const rightAnswerChars = props.rightAnswer.split("");
    return answerChars.map((char, index) => {
      let isRight = false;
      try {
        isRight = char == rightAnswerChars[index];
      } catch (e) {}
      return { char: char, isRight: isRight };
    });
  });

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.onSubmit?.();
      }}
    >
      <input
        class="w-[100%] rounded-0 placeholder:text-gray-2 placeholder:font-normal text-neutral-6 text-2xl font-medium py-2 border-b outline-none"
        value={props.value}
        placeholder="请输入答案"
        onInput={event => {
          props.onChange(event.target.value);
        }}
      />
      <div class="flex flex-wrap text-sm mt-5">
        <span class="mr-2 flex flex-items-center font-medium">
          <Icon class="mr-1" icon="solar:lightbulb-bolt-line-duotone" />
          答案检查
        </span>
        <Show when={data().length > 0} fallback={<span class="text-gray-4">待输入...</span>}>
          <For each={data()}>
            {item =>
              item.char == " " ? (
                <span class="mr-1" />
              ) : (
                <span classList={{ "text-green-4": item.isRight, "text-red-4": !item.isRight }}>
                  {item.char}
                </span>
              )
            }
          </For>
        </Show>
      </div>
    </form>
  );
};

export default Input;
