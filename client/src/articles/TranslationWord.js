import { useState } from "react"
import styled from "styled-components"

import add_icon from "../assets/images/add_icon.svg"



export function TranslationWord( {word, translation} ) {

    const [isReadMore, setReadMore] = useState(false)

    
    return (
        <WordItem key={word.id}>
            <Word>
                {word}:
                <MarkStudying 
                    src={add_icon} 
                    alt="add translation for word button" 
                    
                />
            </Word>
            
            <Translation>

                {isReadMore ?  translation : translation?.substring(0, 50)}

                {translation?.length > 50 ? 
                
                    <ReadOrHidebutton onClick={() => setReadMore(!isReadMore)}>
                        {isReadMore ? "Show Less" : "...Show More"}
                    </ReadOrHidebutton> 
                    : null
                }
                
            </Translation>
            <hr/>
        </WordItem>
    )
}

const MarkStudying = styled.img`
    float: right;
    width: 25px;
    height: 25px;
    margin-right: 8px;
    cursor: pointer;
`

const ReadOrHidebutton = styled.button`
    color: rgb(41, 128, 185);
    cursor: pointer;
    padding-left: 8px;
    border: none;
    background: none;
`

const WordItem = styled.div``

const Word = styled.div`
    font-weight: bold;
    color: rgb(255, 255, 255);
`

const Translation = styled.div`
    display: inline;
    width: 100%;
`
