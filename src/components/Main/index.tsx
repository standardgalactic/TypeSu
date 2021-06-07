import React, { useState } from 'react';
import { iQuote, iCharacter, iWord, iQuoteProgress } from './interfaces'
import './main.scss';

const text = 'Lorem ip/sum etc y al\'go mas.'
const textWords :string[] = text.split(' ').map((elem) => { return elem+' ' }) // splits and add space after each word
textWords[textWords.length-1] = textWords[textWords.length-1].trim() // removes space added to the last word
const Quote :iQuote = {text: text, words: [{word: 'unknown', characters: [{character:'unknown', status:'vibing'}]}]}

// createing example iQuote && iQuoteProgress
textWords.forEach( (word) => {
    let characters = word.split(''),
        Character :iCharacter[]= characters.map(x => {return {character: x, status: 'vibing'}}),
        Word :iWord =  {word: word, characters: Character}
        
    Quote.words.push(Word)
})

Quote.words.shift() // deletes 'unknown' words example

const QuoteProgress :iQuoteProgress = {characterPosition: 0, wordPosition: 0, writtenTotal: 0, writtenCorrect: 0, writtenIncorret: 0} 

// highlight_word_position(quote, inputText, quoteProgress)
// highlight_character_position(quote, inputText, quoteProgress)

console.log('Quote', Quote, 'QuoteProgress', QuoteProgress)

const Main: React.FC = () => {

    const [sQuote, setQuote] = useState<iQuote>(Quote);
    const [sQuoteProgress, setQuoteProgress] = useState<iQuoteProgress>(QuoteProgress);
    
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const inputElement :HTMLInputElement = e.currentTarget,
              inputText :string = inputElement.value,
              words = sQuote.words

        // checkCharacter({sQuote, inputText, inputElement, sQuoteProgress})

        // highlight_word_position(sQuote, inputText, sQuoteProgress)
        
        // highlight_character_position(sQuote, inputText, sQuoteProgress)

        
        // input correct & spacebar pressed, clear input
        if (words!=null && inputText.trim() === words[0].word.trim()) {
            if (inputText.includes(' ')) {
                inputElement.value = ''
            }
        }
        
    }
    
    return (
        <div className="d-flex justify-content-center">
            <label id="text">
                {
                    sQuote.words.map((word) => {
                        return (<span>{word.word}</span>)
                    })
                }
            </label>
            <br />
            <input className="d-flex justify-content-center" onChange={handleOnChange} id="typeing-input" />
        </div>
    );
};

export default Main;
