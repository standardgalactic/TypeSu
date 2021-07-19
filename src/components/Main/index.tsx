import React, { useState } from 'react';
import { People, User, Show } from 'react-iconly'
import { check_inputText_in_wordPos } from './checkings';
import { iReply, iCharacter, iWord } from './interfaces'
import './main.scss';

/**
 * Incoming text converts into an iReply type
 * Spaces between each Word added to help checking and printing the Text
 */
const text = 'Lorem ip/sum etc y al\'go mas.'
const textWords: string[]= text.split(' ').map((elem) => { return elem+' ' })
textWords[textWords.length-1] = textWords[textWords.length-1].trim()
const replyDefault: iReply = {text: text, words: [{word: 'unknown', status: 'vibing', characters: [{character:'unknown', status:'vibing'}]}]}
      
textWords.forEach( (word) => {
    let characters = word.split('')
    let Character: iCharacter[] = characters.map(x => {return {character: x, status: 'vibing'}})
    let Word: iWord =  {word: word, status: 'vibing', characters: Character}
        
    replyDefault.words.push(Word)
})

replyDefault.words.shift() // deletes 'unknown' words example

const Main: React.FC = () => {

    const [reply, setReply] = useState<iReply>(replyDefault);
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
            reply.words.forEach((word, word_i) => {
                word.characters.forEach((character, char_i)=> {
                    const replyElement: HTMLSpanElement = (document.getElementById(word_i+reply.words[word_i].characters[char_i].character+char_i) as HTMLSpanElement)
                    if (replyElement != null) {
                        replyElement.className = ''
                    }
                })                
            });
            
            setReply(replyDefault)
            setWordPos(0)
            setCharPos(0)
            e.currentTarget.value = ''
            e.preventDefault()
            
            return false
        }
        
        const key = e.key.split('').length > 1 ?'':e.key
        const inputText: string = e.currentTarget.value+key
       
        const checked_reply = check_inputText_in_wordPos(inputText, reply, wordPos)
        if (key.includes(' ')) {
            setWordPos(wordPos+1)
            setCharPos(0)
            e.currentTarget.value = ''
            e.preventDefault()
        } else setCharPos(charPos+1)

        setReply(checked_reply)
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
                <div className='reply-and-input'>
                    <div id="reply-container">
                        <div id="reply">
                            {   /* reply Prints word by word */ 
                                reply.words.map((word, index) => {
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
                        <input onKeyDown={(e) => handleOnClickDown(e)} />
                    </div>
                    <p>Words Per Minute: {Math.floor(60/wordPos)}</p>
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
