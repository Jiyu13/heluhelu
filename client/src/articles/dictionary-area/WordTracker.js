import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../../components/UserContext"

export function WordTracker( {word} ) {

    const vocabStatus = {
        Unknown: 0, 
        Studying: 1,
        Known: 2,
        Ignored: 3,
    }

    const {user, vocabularies, setVocabularies} = useContext(UserContext)    


    let trackWord 
    if ((word.length) !== 0) {
        trackWord = word[0]["hawaiian_clean"]
    }

    function checkStatus() {
        let result = vocabularies?.filter(vocab => vocab.hawaiian_clean === trackWord)
        if (result.length !== 0) {
            const statusNumber = result[0]["status"]
            return statusNumber
        } else {
            return 0
        }
    }
    

    function onDeleteVocab(deletedWord) {
        const updatedVocabs = vocabularies?.filter(vocab => vocab.hawaiian_clean != deletedWord)
        setVocabularies(updatedVocabs)
    }

    function handleChangeToKnown() {
        // check if trackWord already exists
        if (!vocabularies?.some(vocab => vocab.hawaiian_clean === trackWord)) {
            const newVocab= {
                user_id: user.id,
                hawaiian_clean: trackWord,
                status: 2   // post a word with status "known - 2"
            }

            fetch(`/vocabulary/${trackWord}/${2}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newVocab)
            })
            .then(res => res.json())
            .then(data => setVocabularies([...vocabularies, data]))
        } else {
            fetch(`/vocabularies/${trackWord}`, {
                method: "DELETE",
            })
            .then(onDeleteVocab(trackWord))
        }
    }

    return (
        <WordTrackerBox>
            <TrackerContainer>
                Word Status: 
                <ShowStatus>{Object.keys(vocabStatus).find(key => vocabStatus[key] === checkStatus())}</ShowStatus>
                <br/>
                <Mark onClick={handleChangeToKnown}>{checkStatus() === 0 ? "Mark Known" : "Mark Not-Known"}</Mark>
                <Mark>Exclude Word</Mark>
            </TrackerContainer>
        </WordTrackerBox>
    )
}



const Mark = styled.span`
    width: 146px;
    font-size: 14px;
    display: inline-block;
    color: inherit;
    margin-top: 3px;
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

const ShowStatus = styled.span`
    display: inline-block;
    border: 2px solid transparent;
    cursor: pointer;
    font-size: inherit;
    background-color: rgba(50,100,150,.6)!important;
    line-height: 1.6;
    padding: 2px 6px;
    &:hover {
        background-color: rgba(50,100,150, 1)!important;
    }
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


