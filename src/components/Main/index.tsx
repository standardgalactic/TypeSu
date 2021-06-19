import React, { useState } from 'react';
import { check_inputText_in_wordPos } from './checkings';
import { iQuote, iCharacter, iWord } from './interfaces'
import './main.scss';

/**
 * Incoming text converts into an iQuote type
 * Spaces between each Word added to help checking and printing the Text
 */
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
        // lil restart thing real fast to show the app
        if (e.key === 'Enter') {
            console.log(e.key)
            quote.words.forEach((word, word_i) => {
                word.characters.forEach((character, char_i)=> {
                    const quoteElement: HTMLSpanElement = (document.getElementById(word_i+quote.words[word_i].characters[char_i].character+char_i) as HTMLSpanElement)
                    if (quoteElement != null) {
                        quoteElement.className = ''
                    }
                })                
            });
            
            setQuote(quoteDefault)
            setWordPos(0)
            setCharPos(0)
            e.currentTarget.value = ''
            e.preventDefault()
            
            return false
        }
        
        const key = e.key.split('').length > 1 ?'':e.key
        const inputText: string = e.currentTarget.value+key
       
        const resp_quote = check_inputText_in_wordPos(inputText, quote, wordPos)
        if (key.includes(' ')) {
            setWordPos(wordPos+1)
            setCharPos(0)
            e.currentTarget.value = ''
            e.preventDefault()
        } else setCharPos(charPos+1)

        setQuote(resp_quote)
    }
    
    return (
        <div className='flex-container'>
            <div className='left-column'>
                <div>[compartir icon]</div>
            </div>
            <div className='center-column'>
                <div className='main-title'>TypeSu</div>
                <div className='quote-and-input'>
                    <div id="quote-container">
                        <div id="quote">
                            {   /* quote Prints word by word */ 
                                quote.words.map((word, index) => {
                                    return (<span id={word.word+index} key={word.word}>
                                        {   /* And character by character*/
                                            word.characters.map( (char, i) => {
                                                return ( <span id={index+char.character+i} key={char.character}>{char.character}</span> )       
                                            } )
                                        }
                                    </span>) 
                                })
                            }
                        </div>
                    </div>
                    <div id="input-container">
                        <input onKeyDown={(e) => handleOnClickDown(e)} />
                    </div>
                </div>
            </div>
            <div className='right-column'>
                <div className='icons-container'>
                    <div>[NM]</div>
                    <div>[S IN/S UP]</div>
                </div>
            </div>
        </div>
    );
};

export default Main;
