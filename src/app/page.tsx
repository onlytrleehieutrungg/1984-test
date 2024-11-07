"use client";
import Navbar from "@/components/nav";
import React, { DragEvent, useState } from "react";

interface Blank {
  id: number;
  position: string;
  correctAnswer: string;
  type: string;
}

interface DragWord {
  word: string;
  color: string;
  id: number;
  hidden?: boolean;
}

interface QuestionData {
  paragraph: string;
  blanks: Blank[];
  dragWords: DragWord[];
}

// Sample JSON data from backend
const data: { question: QuestionData } = {
  question: {
    paragraph:
      "The sky is [_input] and the grass is [_input]. You should drag the word <span style='color: red;'>green</span> to the correct blank.",
    blanks: [
      { id: 1, position: "first", correctAnswer: "blue", type: "input" },
      { id: 2, position: "second", correctAnswer: "green", type: "drag" },
    ],
    dragWords: [
      { word: "blue", color: "default", id: 1 },
      { word: "green", color: "red", id: 2 },
      { word: "yellow", color: "default", id: 3 },
      { word: "red", color: "default", id: 4 },
    ],
  },
};
export default function Home() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [feedback, setFeedback] = useState<string>("");
  const [draggableWords, setDraggableWords] = useState<DragWord[]>(
    data.question.dragWords
  );
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Handle drop event and update answers state
  const handleDrop = (event: DragEvent<HTMLSpanElement>, blankId: number) => {
    event.preventDefault();
    const wordId = event.dataTransfer.getData("text");
    const wordObj = draggableWords.find((word) => `word-${word.id}` === wordId);

    if (wordObj) {
      // Update the answers state with the dragged word
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [blankId]: wordObj.word,
      }));

      // Hide the dragged word after it's dropped
      setDraggableWords((prevWords) =>
        prevWords.map((word) =>
          word.id === parseInt(wordId.split("-")[1])
            ? { ...word, hidden: true }
            : word
        )
      );
    }
  };

  // Handle the start of a drag event
  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    wordId: string
  ) => {
    event.dataTransfer.setData("text", wordId);
  };

  // Allow dropping by preventing the default behavior
  const allowDrop = (event: DragEvent<HTMLSpanElement>) =>
    event.preventDefault();

  // Check if answers are correct on submit
  const handleSubmit = () => {
    const isCorrect = data.question.blanks.every(
      (blank) => answers[blank.id] === blank.correctAnswer
    );
    setIsCorrect(isCorrect);

    setFeedback(isCorrect ? "Chính xác!" : "Sai rồi, thử lại!");
  };

  function handleFeedback() {
    if (isCorrect) return;
    setFeedback("");
    setAnswers({});
    setDraggableWords(data.question.dragWords);
  }

  // Render the paragraph with blanks
  const renderParagraph = () => {
    const { paragraph, blanks } = data.question;
    const parts = paragraph.split("[_input]");

    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {blanks[index] && (
              <div
                className="inline-block w-[100px] h-[28px] p-1 border-b-2 border-gray-800 mx-1.5 text-center"
                id={`blank-${blanks[index].id}`}
                onDrop={(e) => handleDrop(e, blanks[index].id)}
                onDragOver={allowDrop}
              >
                <span> {answers[blanks[index].id] || ""}</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen max-w-[600px] mx-auto text-center font-sans ">
        <div className="mb-5">{renderParagraph()}</div>
        <div className="flex gap-2.5 mb-5">
          {draggableWords.map(
            (word) =>
              !word.hidden && (
                <div
                  key={word.id}
                  id={`word-${word.id}`}
                  className={`p-2 border border-gray-800 rounded cursor-pointer ${
                    word.color === "red" ? "text-red-500" : "text-black"
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, `word-${word.id}`)}
                >
                  {word.word}
                </div>
              )
          )}
        </div>

        <button
          className="px-5 py-2 bg-green-600 hover:bg-green-700  text-white rounded cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <div
          className={`mt-5 font-bold ${
            isCorrect ? `text-green-500` : `text-red-600`
          }  ${!isCorrect && ` cursor-pointer hover:underline`}`}
          onClick={handleFeedback}
        >
          {feedback}
        </div>
      </div>
    </>
  );
}
