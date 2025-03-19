import { useState, useEffect } from "preact/hooks";

export default function SortingForm() {
  const [options, setOptions] = useState<string[]>([]);
  const [currentPair, setCurrentPair] = useState<[string, string] | null>(null);
  const [sortingInProgress, setSortingInProgress] = useState(false);
  const [sortedList, setSortedList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1000);
  const [timerId, setTimerId] = useState<number | null>(null);
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const questionText = (form.elements.namedItem('question') as HTMLInputElement).value;
    const optionsText = (form.elements.namedItem('options') as HTMLTextAreaElement).value;
    setQuestion(questionText);
    const optionsList = optionsText.split('\n').filter(option => option.trim() !== '');

    // Randomize the initial list
    const shuffledList = [...optionsList].sort(() => Math.random() - 0.5);

    // Initialize the sorting process
    setOptions(shuffledList);
    setSortingInProgress(true);
    setCurrentPair([shuffledList[0], shuffledList[1]]);
    setCurrentIndex(0);
    setCurrentPass(0);
    setTimeLeft(1000);
  };

  // Reset and start timer when showing a new pair
  useEffect(() => {
    if (sortingInProgress && currentPair) {
      // Clear any existing timer
      if (timerId) {
        clearInterval(timerId);
      }

      // Reset timer
      setTimeLeft(1000);

      // Start new timer
      const id = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 10) {
            clearInterval(id);
            // Make random choice when timer expires
            const randomChoice = Math.random() < 0.5;
            handleChoice(randomChoice);
            return 0;
          }
          return prev - 10;
        });
      }, 10);

      setTimerId(id);

      // Cleanup on unmount or when pair changes
      return () => {
        clearInterval(id);
      };
    }
  }, [currentPair, sortingInProgress]);

  const handleChoice = (chooseSecond: boolean) => {
    // Clear the timer when a choice is made
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    const currentList = [...options];

    // If second item was chosen, swap the items
    if (chooseSecond && currentPair) {
      const [first, second] = currentPair;
      currentList[currentIndex] = second;
      currentList[currentIndex + 1] = first;
    }

    // Move to next pair
    const nextIndex = currentIndex + 1;

    // If we've reached the end of this pass
    if (nextIndex >= currentList.length - 1) {
      const nextPass = currentPass + 1;

      // If we've completed all passes
      if (nextPass >= currentList.length) {
        setSortedList(currentList);
        setSortingInProgress(false);
        return;
      }

      // Start next pass
      setCurrentPass(nextPass);
      setCurrentIndex(0);
      setOptions(currentList);
      setCurrentPair([currentList[0], currentList[1]]);
    } else {
      // Continue current pass
      setCurrentIndex(nextIndex);
      setOptions(currentList);
      setCurrentPair([currentList[nextIndex], currentList[nextIndex + 1]]);
    }

  };

  const resetForm = () => {
    setSortingInProgress(false);
    setSortedList([]);
    setCurrentPair(null);
    setOptions([]);
    setCurrentIndex(0);
    setCurrentPass(0);
    setQuestion("");
  };

  return (
    <div>
      {!sortingInProgress && sortedList.length === 0 && (
        <form onSubmit={handleSubmit} class="flex flex-col gap-4">
          <div class="flex flex-col">
            <label htmlFor="question">Add your question:</label>
            <input
              type="text"
              id="question"
              name="question"
              class="border-2 rounded p-2"
              value="What's for dinner?"
            />
          </div>
          <div class="flex flex-col">
            <label htmlFor="options">Enter your options (one per line):</label>
            <textarea
              id="options"
              name="options"
              rows={4}
              class="border-2 rounded p-2"
            >
              Tacos&#13;&#10;Curry&#13;&#10;Pizza&#13;&#10;BBQ
            </textarea>
          </div>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Sorting
          </button>
        </form>
      )}

      {sortingInProgress && currentPair && (
        <div class="mt-8 popup">
          <h2 class="text-2xl font-bold mb-4">{question} ({(timeLeft / 1000).toFixed(1)}s)</h2>
          <div class="flex gap-4">
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded bigButton"
              onClick={() => handleChoice(false)}
            >
              {currentPair[0]}
            </button>
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded bigButton"
              onClick={() => handleChoice(true)}
            >
              {currentPair[1]}
            </button>
          </div>
        </div>
      )}

      {sortedList.length > 0 && !sortingInProgress && (
        <div class="mt-8 popup">
          <h2 class="text-2xl font-bold mb-4">{question}</h2>
          <ol class="list-decimal pl-6 mb-8"
            style={{ margin: "2em 0" }}
          >
            {sortedList.map((item, index) => (
              <li key={index} class="mb-2">{item}</li>
            ))}
          </ol>
          <button
            onClick={resetForm}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            New Decision
          </button>
        </div>
      )
      }
    </div >
  );
}
