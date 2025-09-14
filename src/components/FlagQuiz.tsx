import { useState } from "react";
import type { Country } from "../types/Country";
import { useFetchCountries } from "../hooks/useFetchCountries"
import "./FlagQuiz.css";
import Flag from "./Flag";
import { checkAnswer } from "../utils/checkAnswer";
import Score from "./Score";

const FlagQuiz = () => {
    const countries: Country[] = useFetchCountries();
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [answer, setAnswer] = useState("");
    const loading = (countries.length === 0);

    const submitAnswer = () => {
        const country: Country = countries[index];
        if (checkAnswer(answer, country)) {
            setScore((prev) => prev + 1)
        }
        setAnswer("");
        const next = index + 1;
        if (next < countries.length) {
            setIndex(next);
        } else {
            setFinished(true);
        }
    };

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
                    <Score score={score} index={index + 1} total={countries.length} />
                    <Flag country={countries[index]} size="large" />
                    <div className="submit">
                        <input
                            className="submit-input"
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    submitAnswer();
                            }}
                            placeholder="Guess the country name"
                        />
                        <button className="submit-button" onClick={submitAnswer}>Submit</button>
                    </div>
                </>
            ) : (
                <>
                    <h2>Quiz Finished!</h2>
                    <p>Your score: {score} / {countries.length}</p>
                </>
            )}
        </div>
    );
};

export default FlagQuiz;
