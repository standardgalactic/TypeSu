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
            // checking if entire word is correct again on spacebar press
            if (inputChars.length === resp.words[wordPos].characters.length) {
                resp.words[wordPos].status = inputText === resp.words[wordPos].word ? 'correct' : 'incorrect'        
            }
            
            const quoteElement: HTMLSpanElement = (document.getElementById(resp.words[wordPos].word+i) as HTMLSpanElement)
            if (quoteElement != null) {
                quoteElement.classList.add(resp.words[wordPos].status)
            }
            console.log(resp.words[wordPos].word)
            console.log(character)            
        })
    }
    return resp
}

export { check_inputText_in_wordPos} 