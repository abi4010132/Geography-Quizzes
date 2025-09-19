// hooks/useQuiz.ts
import { useState, useEffect, useRef } from "react";
import type { Country } from "../types/Country";
import { useOnKeyPress } from "./useOnKeyPress";
import { shuffle } from "../utils/shuffle";

function useQuizLogic(countries: Country[], checkAnswer: (input: string, country: Country) => boolean) {
  const [shuffled, setShuffled] = useState<Country[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    resetQuiz();
  }, [countries]);

  const submitAnswer = () => {
    const country = shuffled[index];
    if (!country) return;

    if (checkAnswer(answer, country)) {
      setScore((prev) => prev + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setAnswer("");
  };

  const nextQuestion = () => {
    const next = index + 1;
    if (next < shuffled.length) {
      setIndex(next);
    } else {
      setFinished(true);
    }
    setIsCorrect(null);
  };

  const resetQuiz = () => {
    setShuffled(shuffle(countries));
    setIndex(0);
    setScore(0);
    setFinished(false);
    setIsCorrect(null);
    setAnswer("");
  };

  useEffect(() => {
    if (isCorrect === null) inputRef.current?.focus();
  }, [isCorrect]);

  useOnKeyPress(() => {
    if (isCorrect === null && !finished) {
      submitAnswer();
    } else if (finished) {
      resetQuiz();
    } else {
      nextQuestion();
    }
  }, "Enter");

  return {
    countries: shuffled,
    index,
    score,
    finished,
    answer,
    setAnswer,
    isCorrect,
    inputRef,
    submitAnswer,
    nextQuestion,
    resetQuiz,
  };
}

export default useQuizLogic;
