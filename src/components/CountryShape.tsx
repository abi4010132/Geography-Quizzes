import type { Country } from "../types/Country";

type ShapeProps = {
  country: Country;
};

const CountryShape = ({ name, shape }: Country) => {
  return (
    <div className='country-shape'>
      <img src={shape} alt={`Shape of ${name}`} />
    </div>
  );
};

export default CountryShape;