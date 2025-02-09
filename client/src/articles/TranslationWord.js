import { useState } from "react"
import styled from "styled-components"
import anki_logo from "../assets/images/logo/anki.svg"
import add_icon_white from "../assets/images/white/add_icon_white.svg"
import check_circle_icon_white from "../assets/images/white/check_circle_icon_white.svg"
import { closeMobileDictionary } from "./dictionary-area/closeMobileDictionary"
import { AnkiImg } from "../anki/promptStyles"
// import AddAnkiSuccessPrompt from "../anki/AddAnkiSuccessPrompt"
import AnkiErrorPrompt from "../anki/AnkiErrorPrompt"
import addToAnki from "../utils/addToAnki"



export function TranslationWord( {
    word, translation, hawaiian_clean, PostAndDelete, checkStatus,
    isMobile, isDictionaryOpen, setDictionaryOpen, 
    addAnkiSucceed, setAddAnkiSucceed, ankiError, setAnkiError
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

    function handleAnkiClick() {
        addToAnki( hawaiian_clean, translation, setAnkiError, setAddAnkiSucceed, addAnkiSucceed)
        // console.log(word, hawaiian_clean, translation)
    }

    
    let src
    let bgColor
    if (checkStatus(hawaiian_clean) === 1) {
        bgColor = "#2ecc71"
        src = check_circle_icon_white 
    } else {
        bgColor = ""
        src = add_icon_white
    }
    
    return (
        <>
            <WordItem key={word.id}>
                <Word>
                    <div>{word}:</div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    
                        <AnkiImg src={anki_logo} alt="open anki" onClick={handleAnkiClick}/>

                        <MarkStudyingImg 
                            src={src} 
                            alt="mark studying button"
                            onClick={handleMarkStudying}
                            style={{backgroundColor: bgColor}}
                        />
                    </div>
                    
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


        {/* {addAnkiSucceed && (
            <AddAnkiSuccessPrompt 
                word={hawaiian_clean}
                setAddAnkiSucceed={setAddAnkiSucceed}

            />
        )} */}

        {ankiError && (
            <AnkiErrorPrompt 
                ankiError={ankiError}
                setAnkiError={setAnkiError}
            />
        )}
        </>

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
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color: rgb(255, 255, 255);
`

const Translation = styled.div`
    display: inline;
    width: 100%;
    white-space: pre-wrap;
`
