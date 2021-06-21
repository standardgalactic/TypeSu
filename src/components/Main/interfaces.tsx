interface iReply {
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

export type {iReply, iWord, iCharacter}