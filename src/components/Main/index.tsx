import React, { useState } from 'react';
import { iQuote, iCharacter, iWord, iProgress } from './interfaces'
import './main.scss';

const text = 'Lorem ip/sum etc y al\'go mas.',
      textWords: string[] = split_add_spaces_except_last_word(text),
      quoteDefault: iQuote = {text: text, words: [{word: 'unknown', status: 'vibing', characters: [{character:'unknown', status:'vibing'}]}]}
      
textWords.forEach( (word) => {
    let characters = word.split(''),
        Character: iCharacter[] = characters.map(x => {return {character: x, status: 'vibing'}}),
        Word: iWord =  {word: word, status: 'vibing', characters: Character}
        
    quoteDefault.words.push(Word)
})

quoteDefault.words.shift() // deletes 'unknown' words example

function split_add_spaces_except_last_word(text: string) {
    let arr: string[]= text.split(' ').map((elem) => { return elem+' ' })
    arr[arr.length-1] = arr[arr.length-1].trim() 
    return arr
}

const Main: React.FC = () => {

    const [quote, setQuote] = useState<iQuote>(quoteDefault);
    const [wordPos, setWordPos] = useState<number>(0)
    const [charPos, setCharPos] = useState<number>(0)
    const [progress, setProgress] = useState<iProgress>({writtenTotal: 0, writtenCorrect: 0, writtenIncorrect: 0})
    const [inputText, setInputText] = useState<string>('');

    // const checkWord = () => {
    //     return quote.words[wordPos].word === inputText ? true:false
    // }

    const checkCharacters = (actual_inputText) => {
        actual_inputText.split('').forEach((character, i) => {
            let quoteChar = quote.words[wordPos].characters[i].character
            quote.words[wordPos].characters[i].status = quoteChar === character? 'correct' : 'incorrect'
        })
        setQuote(quote)
    }
    
    
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        let actual_inputText = e.currentTarget.value ? e.currentTarget.value:''
        if (actual_inputText === '') {
            setQuote(quoteDefault) // set to default
        } else {           
            checkCharacters(actual_inputText)

            if (actual_inputText.includes(' ')) {
                setWordPos(wordPos+1)
                setCharPos(0)
                e.currentTarget.value = ''
            } else setCharPos(charPos+1)
            
            
        }
        setInputText(actual_inputText)
        console.log('wordPos: ',wordPos)
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
            <input onChange={handleOnChange} id="typeing-input" />
        </div>
        </>
    );
};

export default Main;
