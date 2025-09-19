import React, { useState } from "react";
import type { Country } from "../types/Country";
import useQuizLogic from "../hooks/useQuizLogic";
import "./Quiz.css";
import Score from "./Score";
import Feedback from "./Feedback";

type QuizProps = {
    header: string;
    countries: Country[];
    renderQuestion: (country: Country) => React.ReactNode;
    checkAnswer: (input: string, country: Country) => boolean; // required
    placeholder?: string;
    filterUI?: React.ReactNode;
};

const Quiz = ({
    header,
    countries,
    renderQuestion,
    checkAnswer,
    placeholder = "Guess the country",
    filterUI,
}: QuizProps) => {

    const {
        countries: shuffledCountries,
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
    } = useQuizLogic(countries, checkAnswer);

    if (!shuffledCountries.length) return <div className="loading">Loading...</div>;

    return (
        <div className="wrapper">
            {!finished ? (
                <>
                    <header className="quiz-header">
                        <h1>{header}</h1>
                    </header>

                    {filterUI}

                    <Score score={score} index={index + 1} total={shuffledCountries.length} />
                    <div className="question">{renderQuestion(shuffledCountries[index])}</div>
                    <div className="submit">
                        {isCorrect === null ? (
                            <>
                                <input
                                    ref={inputRef}
                                    className="submit-input"
                                    type="text"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder={placeholder}
                                />
                                <button className="submit-button" onClick={submitAnswer}>
                                    Submit
                                </button>
                            </>
                        ) : (
                            <>
                                <Feedback
                                    correct={isCorrect!}
                                    message={`The answer was ${shuffledCountries[index].name} ${isCorrect ? "✅" : "❌"}`}
                                />
                                <button className="submit-button" onClick={nextQuestion}>
                                    Next
                                </button>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h2>Quiz Finished!</h2>
                    <p>
                        Your score: {score} / {shuffledCountries.length}
                    </p>
                    <button className="submit-button" onClick={resetQuiz}>
                        Play again
                    </button>
                </>
            )}
        </div>
    );
};

export default Quiz;
