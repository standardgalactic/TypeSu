import { iReply } from "./interfaces";

/**
 * Modifies Word & Character statuses and calls highlighting styles functions accordingly
 * @param inputText Actual text in the input
 * @param reply Word & Characters in the reply you're typing
 * @param wordPos Where in 'reply' you're positioned
 * @returns Updated 'reply' obj with different statuses
 */
const check_inputText_in_wordPos = (inputText: string, reply: iReply, wordPos) => {
    const resp = reply;
    
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
            
            const replyElement: HTMLSpanElement = (document.getElementById(wordPos+resp.words[wordPos].characters[i].character+i) as HTMLSpanElement)
            if (replyElement != null) {
                replyElement.className = ''
                replyElement.className = resp.words[wordPos].characters[i].status
                // replyElement.classList.add(resp.words[wordPos].status)
            }
        })
    }
    return resp
}

export { check_inputText_in_wordPos } 