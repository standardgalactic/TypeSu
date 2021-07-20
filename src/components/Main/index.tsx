import React, { useState } from 'react';
import { People, User, Show } from 'react-iconly'
import { check_inputText_in_wordPos } from './checkings';
import { iQuote, iCharacter, iWord } from './interfaces'
import './main.scss';

/**
 * Incoming text converts into an iQuote type
 * Spaces between each Word are added to help checking and printing the Text
 */
const text = 'Lorem ip/sum etc y al\'go mas.'
const textWords: string[]= text.split(' ').map((elem) => { return elem+' ' })
textWords[textWords.length-1] = textWords[textWords.length-1].trim()

// Each word, character and text has its own type definition to populate with default values prior to being used
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
    const [startTime, setStartTime] = useState<number>(new Date().getTime())
    const [wpm, setWpm] = useState<number>(0)

    const checkWpm = (): number => {
        let endTime = new Date().getTime();
        let timeDiff = (endTime - startTime)/1000
        console.log(timeDiff, wordPos);
        console.log((60/timeDiff), (60/timeDiff)*wordPos);
        return Math.floor((60/timeDiff)*wordPos)
    }

    /**
     * Checks individual characters and words status
     * Calls functions to modify styling
     * Changes Word position and Character position on input
     * Changes quote status on 'Enter' press
     * @param e input event
     */
    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (wordPos === 0 && charPos === 0 ) {
            setStartTime(new Date().getTime())
        }

        setWpm(checkWpm())
        
        // lil restart thing
        if (e.key === 'Enter') {
            // Resets styling (red/green/blue backgrounds on characters)
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
        
        // Checks if input is not Shift, Ctrl, or any other input appart of a letter/number/simbol
        const key = e.key.split('').length > 1 ?'':e.key
        const inputText: string = e.currentTarget.value+key
        const checked_quote = check_inputText_in_wordPos(inputText, quote, wordPos)
       
        // A space means a new word being typed
        if (key.includes(' ')) {
            setWordPos(wordPos+1)
            setCharPos(0)
            e.currentTarget.value = ''
            e.preventDefault()
        } else setCharPos(charPos+1)

        setQuote(checked_quote)
    }
    
    return (
        <div className='flex-container'>
            <div className='left-column'>
                <div>
                    <People set="bold" />
                </div>
            </div>
            <div className='center-column'>
                <div className='main-title'>TypeSu</div>
                <div className='quote-and-input'>
                    <div id="quote-container">
                        <div id="quote">
                            {   /* quote Prints word by word */ 
                                quote.words.map((word, index) => {
                                    return (<span id={word.word+index} key={word.word+index}>
                                        {   /* And character by character*/
                                            word.characters.map( (char, i) => {
                                                return ( <span id={index+char.character+i} key={index+char.character+i}>{char.character}</span> )       
                                            } )
                                        }
                                    </span>) 
                                })
                            }
                        </div>
                    </div>
                    <div id="input-container">
                        <input onKeyDown={(e) => handleOnKeyDown(e)} />
                    </div>
                    <p>Words Per Minute: {wpm}</p>
                </div>
            </div>
            <div className='right-column'>
                <div className='icons-container'>
                        <Show set="light" />
                        <User set="bold" />
                </div>
            </div>
        </div>
    );
};

export default Main;
