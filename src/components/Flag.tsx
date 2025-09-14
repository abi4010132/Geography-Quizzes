import type { Country } from "../types/Country";
import "./Flag.css"

interface FlagProp {
    country: Country;
    size: "small" | "medium" | "large";
}

const Flag = ({ country, size = "large" }: FlagProp) => (
    <img
        className={`flag flag-${size}`}
        src={country.flag}
        alt={country.name}
    />
);

export default Flag;
