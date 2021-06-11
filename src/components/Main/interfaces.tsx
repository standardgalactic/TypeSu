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

interface iProgress {
    writtenTotal: number,
    writtenCorrect: number,
    writtenIncorrect: number,
}

export type {iQuote, iWord, iCharacter, iProgress}