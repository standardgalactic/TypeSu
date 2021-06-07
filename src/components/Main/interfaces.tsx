interface iQuote {
    text: string,
    words: Array<iWord>,
}

interface iWord {
    word: string,
    characters: Array<iCharacter>
}

interface iCharacter {
    character: string,
    status: 'correct'|'incorrect'|'vibing'
}

interface iQuoteProgress {
    characterPosition: number,
    wordPosition: number,
    writtenTotal: number,
    writtenCorrect: number,
    writtenIncorret: number,
}

export type {iQuote, iWord, iCharacter, iQuoteProgress}