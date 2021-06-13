import React, { useState } from 'react';
import { checkWord, check_inputText_in_wordPos } from './checkings';
import { iQuote, iCharacter, iWord } from './interfaces'
import './main.scss';

const text = 'Lorem ip/sum etc y al\'go mas.'
const textWords: string[]= text.split(' ').map((elem) => { return elem+' ' })
textWords[textWords.length-1] = textWords[textWords.length-1].trim()
const quoteDefault: iQuote = {text: text, words: [{word: 'unknown', status: 'vibing', characters: [{character:'unknown', status:'vibing'}]}]}
      
textWords.forEach( (word) => {
    let characters = word.split('')
    let Character: iCharacter[] = characters.map(x => {return {character: x, status: 'vibing'}})
    let Word: iWord =  {word: word, status: 'vibing', characters: Character}
        
    quoteDefault.words.push(Word)
})

quoteDefault.words.shift() // deletes 'unknown' words example

const Main: React.FC = () => {

    const [quote, setQuote] = useState<iQuote>(quoteDefault);
    const [wordPos, setWordPos] = useState<number>(0)
    const [charPos, setCharPos] = useState<number>(0)
    
    /**
     * Checks individual characters and words status
     * @param e input event
     */
    const handleOnClickDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key.split('').length > 1 ?'':e.key
        const inputText: string = e.currentTarget.value+key
       
        const resp_quote = check_inputText_in_wordPos(inputText, quote, wordPos)
        if (key.includes(' ')) {
            resp_quote.words[wordPos].status = checkWord(inputText, quote, wordPos)? 'correct':'incorrect'
            setWordPos(wordPos+1)
            setCharPos(0)
            e.currentTarget.value = ''
            e.preventDefault()
        } else setCharPos(charPos+1)

        
        setQuote(resp_quote)
        console.log(resp_quote)
    }
    
    return (
        <>
        <div className="d-flex justify-content-center">
            <label id="text">
                {
                    quote.words.map((word) => {
                        return (<span key={word.word} className={word.class?word.class:' '}>
                            {
                                word.characters.map( (char, i) => {
                                    return ( <span key={char.character} className={char.class?char.class:' '}>{char.character}</span> )       
                                } )
                            }
                        </span>) 
                    })
                }
            </label>
            <br />
        </div>
        <div className="d-flex justify-content-center">
            <input onKeyDown={(e) => handleOnClickDown(e)} id="typeing-input" />
        </div>
        </>
    );
};

export default Main;
