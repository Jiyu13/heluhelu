import { useState } from "react"
import styled from "styled-components"

import add_icon from "../assets/images/add_icon.svg"
import check_circle_icon from "../assets/images/check_circle_icon.svg"
import { closeMobileDictionary } from "./dictionary-area/closeMobileDictionary"



export function TranslationWord( {
    word, translation, hawaiian_clean, PostAndDelete, checkStatus,
    isMobile, isDictionaryOpen, setDictionaryOpen
} ) {

    const [isReadMore, setReadMore] = useState(false)


    function handleMarkStudying() {
        PostAndDelete(hawaiian_clean, 1)
        closeMobileDictionary(
            isMobile,
            isDictionaryOpen,
            setDictionaryOpen
        )
    }

    
    let src
    let bgColor
    if (checkStatus(hawaiian_clean) === 1) {
        bgColor = "#2ecc71"
        src = check_circle_icon 
    } else {
        bgColor = ""
        src = add_icon
    }
    
    return (
        <WordItem key={word.id}>
            <Word>
                {word}:
                <MarkStudyingImg 
                    src={src} 
                    alt="mark studying button"
                    onClick={handleMarkStudying}
                    style={{backgroundColor: bgColor}}
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

const MarkStudyingImg = styled.img`
    float: right;
    width: 25px;
    height: 25px;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 50%;
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
    white-space: pre-wrap;
`
