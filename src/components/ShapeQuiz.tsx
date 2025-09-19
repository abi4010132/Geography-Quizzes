import { useState } from "react";
import Quiz from "./Quiz";
import { checkAnswer } from "../utils/checkAnswer";
import RegionFilter from "./RegionFilter";
import { useFetchCountries } from "../hooks/useFetchCountries";
import { useFilterCountries } from "../hooks/useFilterCountries";
import Shape from "./Shape";
const FlagQuiz = () => {
    const countries = useFetchCountries();
    const [regions, setRegions] = useState<string[]>([]);
    const filteredCountries = useFilterCountries(countries, regions);

    if (!filteredCountries.length) return <div className="loading">Loading flags... {filteredCountries.length} </div>;

    return (
        <Quiz
            header="Guess the Shape"
            countries={filteredCountries}
            renderQuestion={(country) => <Shape country={country} />}
            checkAnswer={checkAnswer}
            placeholder="Guess the country"
            filterUI={<RegionFilter filteredRegions={regions} onChange={setRegions} />}
        />
    );
};

export default FlagQuiz;