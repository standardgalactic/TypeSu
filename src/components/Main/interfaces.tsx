interface iQuote {
    text: string,
    words: Array<iWord>,
}

interface iWord {
    word: string,
    class?: string,
    status: 'correct'|'incorrect'|'vibing',
    characters: Array<iCharacter>
}

interface iCharacter {
    character: string,
    class?: string,
    status: 'correct'|'incorrect'|'vibing'
}

interface iUser {
    id: string,
    name: string,
    history: iHistory[]
}

interface iHistory {
    quote_id: string, 
    result: iResult[]
}

interface iResult {
    words_failed: number,
    chars_failed: number,
    max_words_combo: number,
    max_chars_combo: number,
    total_score: number
}

export type {iQuote, iWord, iCharacter, iUser}
