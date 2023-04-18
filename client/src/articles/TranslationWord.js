import { useState } from "react"
import styled from "styled-components"


export function TranslationWord( {word, translation} ) {

    const [isReadMore, setReadMore] = useState(false)

    
    return (
        <WordItem key={word.id}>
            <Word>{word}:</Word>
            <Translation>
                {translation?.length > 50 ? translation?.substring(0, 50) : translation}

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
