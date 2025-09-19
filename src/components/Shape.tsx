import type { Country } from "../types/Country";
import "./shape.css"

type ShapeProps = {
  country: Country;
};

const Shape = ({ country }: ShapeProps) => (
    <img
        className={`shape ${country}`}
        src={country.shape}
        alt={country.name}
    />
);

export default Shape;
