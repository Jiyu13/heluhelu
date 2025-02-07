import styled from "styled-components"
import { closeMobileDictionary } from "./closeMobileDictionary"
import g_translate_white_24dp from "../../assets/images/white/g_translate_white_24dp.svg"
import anki_logo from "../../assets/images/logo/anki.svg"
import { useState } from "react"
import AddAnkiPrompt from "../../anki/AddAnkiPrompt"
import AnkiErrorPrompt from "../../anki/AnkiErrorPrompt"
import AddAnkiSuccessPrompt from "../../anki/AddAnkiSuccessPrompt"
import { AnkiButton, AnkiImg } from "../../anki/promptStyles"

export function WordTracker( {
    target, word, PostAndDelete, checkStatus,
    isMobile, isDictionaryOpen, setDictionaryOpen,
    sentence
    } 
) {
    const [ankiError, setAnkiError] = useState("")
    const [isSucceed, setIsSucceed] = useState(false)
    const [addToAnkiPrompt, setAddToAnkiPrompt] = useState(false)
    // word is an array (empty array/object/function is truthy in js)
    const vocabStatusType = {
        Unknown: 0, 
        Studying: 1,
        Known: 2,
        Ignored: 3,
    }


    let trackWord
    if (word && (word?.length) !== 0) {
        // might need to compare it to word(array from dictionary words) if the 1st !== readable word
        const wordToTrack = word.filter(w => 
            w["hawaiian_clean"].toLowerCase() === target.toLowerCase()
        )
        if (wordToTrack.length > 0) {
            trackWord = wordToTrack[0]["hawaiian_clean"]
        } else {
            trackWord = target
        }
    } 
    else {trackWord = target}
    
    function handleChangeToKnown() {
        PostAndDelete(trackWord, 2)
        closeMobileDictionary(
            isMobile,
            isDictionaryOpen,
            setDictionaryOpen
        )
    }

    function handleIgnoredWord() {
        PostAndDelete(trackWord, 3)
        closeMobileDictionary(
            isMobile,
            isDictionaryOpen,
            setDictionaryOpen
        )
    }

    function handleAnkiClick() {
        console.log("clicked")
        setAddToAnkiPrompt(true)
    }

    
    const vocabStatus = Object.keys(vocabStatusType)
                              .find(key => vocabStatusType[key] === checkStatus(trackWord))

    let styling
    switch(vocabStatus) {
        case "Studying":
            styling = "rgba(255, 221, 89, 0.5)"
            break;
        case "Known":
            styling = ""
            break;
        case "Ignored":
            styling = ""
            break;
        default:
            styling = "rgba(112, 161, 255, 0.5)"
    }
    
    return (
        <>
            <WordTrackerBox>
                <TrackerContainer>
                    Word Status: 
                    <ShowStatus style={{backgroundColor: styling}}>{vocabStatus}</ShowStatus>
                    <br/>
                    <Mark onClick={handleChangeToKnown}>{checkStatus(trackWord) === 2 ? "Mark Not-Known" : "Mark Known"}</Mark>
                    <Mark onClick={handleIgnoredWord}>{checkStatus(trackWord) === 3 ? "Undo Ignored": "Mark Ignore"}</Mark>        
                    <a 
                        href={`https://hilo.hawaii.edu/wehe/?q=${trackWord}`} 
                        target="_blank" 
                        rel='noreferrer noopener'
                    >
                        <WeheSearch>Wehe²Wiki²</WeheSearch>
                    </a>

                    <a 
                        href={`https://translate.google.com/?sl=haw&tl=en&text=${sentence}&op=translate`} 
                        target="_blank" 
                        rel='noreferrer noopener'
                        style={{ textDecoration: "none" }}
                    >
                        <GoogleSearch>
                            <GTranslateImg src={g_translate_white_24dp} alt="google translate"/>
                        </GoogleSearch>
                    </a>

                    <br></br>
                    {/* {checkStatus(trackWord) === 2 && ( */}
                        <AnkiButton
                            onClick={handleAnkiClick}
                            
                        >
                            <Anki className="anki-container">
                                <AnkiImg src={anki_logo} alt="open anki"/>
                            </Anki>
                        </AnkiButton>
                    {/* )} */}
                    
                </TrackerContainer>
            </WordTrackerBox>

            {addToAnkiPrompt && (
                <AddAnkiPrompt 
                    words={word}
                    trackWord={trackWord}
                    sentence={sentence}
                    setAddToAnkiPrompt={setAddToAnkiPrompt} 
                    setAnkiError={setAnkiError}
                    setIsSucceed={setIsSucceed}
                /> 
            )}

            {isSucceed && (
                <AddAnkiSuccessPrompt 
                    trackWord={trackWord}
                    setIsSucceed={setIsSucceed}

                />
            )}

            {ankiError && (
                <AnkiErrorPrompt 
                    ankiError={ankiError}
                    setAnkiError={setAnkiError}
                />
            )}
        </>
    )
}


const Mark = styled.span`
    font-size: 16px;
    display: inline-block;
    color: inherit;
    margin: 3px;
    margin-right: 4px;
    padding: 8px 6px;
    box-sizing: border-box;
    border: 1px solid transparent;
    border-radius: 5px;
    vertical-align: top;
    background-color: rgba(63, 158, 66, .2);
    cursor: pointer;

    &:hover {
        background-color: rgba(63, 158, 66,.6)!important;
    }
`
const WeheSearch = styled(Mark)`
    color: rgb(221, 221, 221);
    background-color: rgba(255,188,62, 0.5);

    &:hover {
        background-color: rgba(255,188,62, 0.7)!important;
    }
`

const GoogleSearch = styled(WeheSearch)`
    padding: 0;
`
const GTranslateImg = styled.img`
    width: 39px;

    display: inline-block;
    vertical-align: middle;
`

const Anki = styled(WeheSearch)`
    padding: 0px;
    background:none;
    border: none;
    margin: 0px;
`
// const AnkiImg = styled.img`
//     // width: 39px;
//     display: inline-block;
//     vertical-align: middle;
// `

const ShowStatus = styled.span`
    display: inline-block;
    border: 2px solid transparent;
    font-size: inherit;
    font-weight: bold;
    color: rgb(255, 255, 255);
    line-height: 1.6;
    padding: 2px 6px;
`

const TrackerContainer = styled.div`
    padding: 12px 4px 2px 4px;
    margin-bottom: 6px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 15px;
    background-color: rgba(255, 255, 255, 0.1);
`

const WordTrackerBox = styled.div``


