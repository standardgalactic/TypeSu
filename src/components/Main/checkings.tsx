import { iQuote } from "./interfaces";

const checkWord = (inputText, quote: iQuote, wordPos) => {
    return quote.words[wordPos].word === inputText ? true:false
}

const check_inputText_in_wordPos = (inputText: string, quote: iQuote, wordPos) => {
    const resp = quote;
    
    // vibing word unless correct or incorrect
    resp.words[wordPos].status = 'vibing'
    
    // vibing word characters on clear input
    if (inputText==='') {
        resp.words[wordPos].characters.forEach(char => {
            char.status = 'vibing'
        });
    } else {
        let inputChars: string[]= inputText.split('')
        resp.words[wordPos].characters.forEach((character, i)=> {
            if (inputChars[i]) {
                if (inputChars[i] === character.character) {
                    character.status = 'correct'
                } else {
                    character.status = 'incorrect'
                    resp.words[wordPos].status = 'incorrect'
                }
            } else {
                character.status = 'vibing'
            }
        });
        
    }
    
    return resp
}

export {checkWord, check_inputText_in_wordPos} 