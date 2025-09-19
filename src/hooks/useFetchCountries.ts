import { useEffect, useState } from "react";
import { getCountries } from "@yusifaliyevpro/countries";
import type { Country } from "../types/Country";
import { shuffle } from "../utils/shuffle"

export function useFetchCountries() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries({
        fields: ["name", "flags", "cca2", "cca3", "region"],
      });

      if (data) {
        const countryList: Country[] = data.map((country) => ({
          name: country.name.common,
          flag: `https://flagcdn.com/w640/${country.cca2.toLowerCase()}.png`,
          alpha2: country.cca2,
          alpha3: country.cca3,
          region: country.region,
          shape: `https://cdn-assets.teuteuf.fr/data/common/country-shapes/${country.cca2.toLowerCase()}.svg`
        }));

        setCountries(shuffle(countryList));
      }
    };

    fetchCountries();
  }, []);

  return countries;
}
