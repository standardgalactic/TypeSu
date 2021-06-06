import React, { useState } from 'react';
import './main.scss';

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

const exampleText = 'Lorem ip/sum etc y al\'go mas.',
      // splits and adds a space after each word
      wordsArr :string[] = exampleText.split(' ').map((elem) => { return elem+' ' }),
      iQuote :iQuote = {text: exampleText, words: [{word: 'unknown', characters: [{character:'unknown', status:'vibing'}]}]}

// removes space added to the last word
wordsArr[wordsArr.length-1] = wordsArr[wordsArr.length-1].trim()

// createing example iQuote && iQuoteProgress
wordsArr.forEach( (elem, index) => {
    let characters = elem.split(''),
        charactersArr :iCharacter[]= characters.map(x => {return {character: x, status: 'vibing'}}),
        iWord :iWord =  {word: elem, characters: charactersArr}
        
    iQuote.words.push(iWord)
})
iQuote.words.shift() // deletes first example 'words' property

const iQuoteProgress :iQuoteProgress = {characterPosition: 0, wordPosition: 0, writtenTotal: 0, writtenCorrect: 0, writtenIncorret: 0} 

// highlight_word_position(quote, inputText, quoteProgress)
// highlight_character_position(quote, inputText, quoteProgress)

console.log('iQuote', iQuote, 'iQuoteProgress', iQuoteProgress)

const Main: React.FC = () => {

    const [quote, setQuote] = useState<iQuote>(iQuote);
    const [quoteProgress, setQuoteProgress] = useState<iQuoteProgress>(iQuoteProgress);
    
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const inputElement :HTMLInputElement = e.currentTarget,
              inputText :string = inputElement.value,
              words = quote.words

        // checkCharacter(quote, inputText, quoteProgress)

        // highlight_word_position(quote, inputText, quoteProgress)
        
        // highlight_character_position(quote, inputText, quoteProgress)

        
        // input correct & spacebar pressed, clear input
        if (words!=null && inputText.trim() === words[0].word.trim()) {
            if (inputText.includes(' ')) {
                inputElement.value = ''
            }
        }
        
    }
    
    return (
        <div className="d-flex justify-content-center">
            <label id="text">{quote?.text}</label>
            <br />
            <input className="d-flex justify-content-center" onChange={handleOnChange} id="typeing-input" />
        </div>
    );
};

export default Main;