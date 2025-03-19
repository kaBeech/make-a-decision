import SortingForm from "../islands/SortingForm.tsx";

export default function Home() {

  return (
    <div class="px-4 py-8 mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Make A Decision!</h1>
        <div class="my-4">
          <SortingForm />
        </div>
      </div>
    </div>
  );
}
