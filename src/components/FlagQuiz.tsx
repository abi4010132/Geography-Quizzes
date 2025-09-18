import { useState, useEffect, useRef } from "react";
import type { Country } from "../types/Country";
import { useFetchCountries } from "../hooks/useFetchCountries"
import "./FlagQuiz.css";
import Flag from "./Flag";
import { checkAnswer } from "../utils/checkAnswer";
import Score from "./Score";
import RegionFilter from "./RegionFilter";
import { shuffle } from "../utils/shuffle";
import { useOnKeyPress } from "../hooks/useOnKeyPress";

const FlagQuiz = () => {
    const countries: Country[] = useFetchCountries();
    const [regions, setRegions] = useState<string[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [answer, setAnswer] = useState("");
    const loading = (filteredCountries.length === 0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        let filtered = countries;
        if (regions.length > 0) {
            filtered = countries.filter((country) => regions.includes(country.region))
        }

        setFilteredCountries(shuffle(filtered));
        setIndex(0);
        setScore(0);
        setFinished(false);
    }, [countries, regions]);


    const submitAnswer = () => {
        const country: Country = filteredCountries[index];
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
        if (next < filteredCountries.length) {
            setIndex(next);
        } else {
            setFinished(true);
        }
        setIsCorrect(null);
    }

    const resetQuiz = () => {
        setIndex(0);
        setScore(0);
        setFinished(false);
        setIsCorrect(null);
        setFilteredCountries(shuffle(countries))
    }
    useEffect(() => {
        if (isCorrect === null) {
            inputRef.current?.focus();
        }
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


    if (loading) {
        return <div className="loading">Loading Flags...</div>;
    }

    return (
        <div className="wrapper">
            {!finished ? (
                <>
                    <header className="quiz-header">
                        <h1>Guess the Flag</h1>
                    </header>
                    <RegionFilter filteredRegions={regions} onChange={setRegions} />
                    <Score score={score} index={index + 1} total={filteredCountries.length} />
                    <Flag country={filteredCountries[index]} size="large" />
                    <div className="submit">
                        {isCorrect === null ? (
                            <>
                                <input
                                    ref={inputRef}
                                    className="submit-input"
                                    type="text"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="Guess the country name"
                                />
                                <button className="submit-button" onClick={submitAnswer}>Submit</button>
                            </>
                        ) : (
                            <>
                                {isCorrect ? (
                                    <p className="feedback correct">The answer was {filteredCountries[index].name} ✅ </p>
                                ) : (
                                    <p className="feedback incorrect">
                                        The answer was {filteredCountries[index].name} ❌.
                                    </p>
                                )}

                                <button
                                    className="submit-button"
                                    onClick={nextQuestion}
                                >
                                    Next
                                </button>
                            </>
                        )}
                    </div>

                </>
            ) : (
                <>
                    <h2>Quiz Finished!</h2>
                    <p>Your score: {score} / {filteredCountries.length}</p>
                    <button
                        className="submit-button"
                        onClick={resetQuiz}
                    >
                        Play again
                    </button>
                </>
            )}
        </div>
    );
};

export default FlagQuiz;
