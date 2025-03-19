import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Make A Decision!</h1>
        <p class="my-4">
          <form class="flex flex-col gap-4">
            <div class="flex flex-col">
              <label htmlFor="question">Add your question:</label>
              <input
                type="text"
                id="question"
                name="question"
                class="border-2 rounded p-2"
              />
            </div>
            <div class="flex flex-col">
              <label htmlFor="options">Enter your options (one per line):</label>
              <textarea
                id="options"
                name="options"
                rows={4}
                class="border-2 rounded p-2"
              ></textarea>
            </div>
          </form>
        </p>
        <Counter count={count} />
      </div>
    </div>
  );
}
