import React, { useState } from 'react';
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

    const checkWord = (inputText) => {
        return quote.words[wordPos].word === inputText ? true:false
    }

    const checkInputCharacters = (inputText: string) => {
        const resp = quote;
        
        // vibing unless correct or incorrect
        resp.words[wordPos].status = 'vibing'
        
        // vibing all character on clear input
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
    
    const handleOnClickDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key.split('').length > 1 ?'':e.key
        const inputText: string = e.currentTarget.value+key
       
        const resp_quote = checkInputCharacters(inputText)
        if (key.includes(' ')) {
            resp_quote.words[wordPos].status = checkWord(inputText)? 'correct':'incorrect'
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
