
import { useState } from "preact/hooks";

export default function SortingForm() {
  const [options, setOptions] = useState<string[]>([]);
  const [currentPair, setCurrentPair] = useState<[string, string] | null>(null);
  const [sortingInProgress, setSortingInProgress] = useState(false);
  const [sortedList, setSortedList] = useState<string[]>([]);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const optionsText = (form.elements.namedItem('options') as HTMLTextAreaElement).value;
    const optionsList = optionsText.split('\n').filter(option => option.trim() !== '');

    // Initialize the sorting process
    setOptions(optionsList);
    setSortingInProgress(true);
    setCurrentPair([optionsList[0], optionsList[1]]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} class="flex flex-col gap-4">
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
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Sorting
        </button>
      </form>

      {sortingInProgress && currentPair && (
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">Choose the better option:</h2>
          <div class="flex gap-4">
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {/* TODO: Handle first choice */ }}
            >
              {currentPair[0]}
            </button>
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {/* TODO: Handle second choice */ }}
            >
              {currentPair[1]}
            </button>
          </div>
        </div>
      )}

      {sortedList.length > 0 && !sortingInProgress && (
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">Final Sorted List:</h2>
          <ul class="list-decimal pl-6">
            {sortedList.map((item, index) => (
              <li key={index} class="mb-2">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
