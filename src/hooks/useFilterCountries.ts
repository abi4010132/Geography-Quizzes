import { useMemo } from "react";
import type { Country } from "../types/Country";

export function useFilterCountries(countries: Country[], regions: string[]) {
  return useMemo(() => {
    if (regions.length === 0) return countries;
    return countries.filter((c) => regions.includes(c.region));
  }, [countries, regions]);
}
