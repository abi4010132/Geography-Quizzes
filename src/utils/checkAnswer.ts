import type { Country } from "../types/Country";

export function checkAnswer(input: string, country: Country){
    const answers = [
        country.name.toLowerCase(),
        country.alpha2.toLowerCase(),
        country.alpha3.toLowerCase()
    ]

    return answers.includes(input.toLowerCase())
}