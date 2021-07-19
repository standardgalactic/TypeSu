import { iQuote } from "./interfaces";

/**
 * Modifies Word & Character statuses and calls highlighting styles functions accordingly
 * @param inputText Actual text in the input
 * @param quote Word & Characters in the quote you're typing
 * @param wordPos Where in 'quote' you're positioned
 * @returns Updated 'quote' obj with different statuses
 */
const check_inputText_in_wordPos = (inputText: string, quote: iQuote, wordPos) => {
    const resp = quote;
    
    // Default word to vibin in input clears
    if (inputText==='') {
        resp.words[wordPos].characters.forEach(char => {
            char.status = 'vibing'
        });
    } else {
        let inputChars: string[]= inputText.split('')
        if (!resp.words[wordPos]) {
            return resp
        }
        resp.words[wordPos].characters.forEach((character, i)=> {
            if (inputChars[i]) {
                if (inputChars[i] === character.character) {
                    character.status = 'correct'
                } else {
                    character.status = 'incorrect'
                }
            } else {
                character.status = 'vibing'
            }
            resp.words[wordPos].status = character.status
            
            // checking if entire word is correct again on spacebar press
            if (inputChars.length === resp.words[wordPos].characters.length) {
                resp.words[wordPos].status = inputText === resp.words[wordPos].word ? 'correct' : 'incorrect'        
            }
            
            const quoteElement: HTMLSpanElement = (document.getElementById(wordPos+resp.words[wordPos].characters[i].character+i) as HTMLSpanElement)
            if (quoteElement != null) {
                quoteElement.className = resp.words[wordPos].characters[i].status
            }
        })
    }
    return resp
}

export { check_inputText_in_wordPos } 