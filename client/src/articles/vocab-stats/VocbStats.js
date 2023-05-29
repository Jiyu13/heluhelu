import { useContext } from "react"
import { UserContext } from "../../components/UserContext"
import styled from "styled-components"

export function VocabStats( {article} ) {

    const {splitText, vocabularies } = useContext(UserContext)

    const pattern = /["'.,/#!?$%^&*;:{}=\-_`~()\r]/g
    const all_word = splitText(article).map(w => w.replace(pattern, "").toLowerCase()).filter(w=>w.length > 0)


    function searchVocabs(status) {
        return vocabularies?.filter(v => v["status"] === status).map(v => v["hawaiian_clean"].toLowerCase())
    }


    function countWords(saveVocabs) {
        return all_word?.filter(w => saveVocabs.includes(w)).length
    }

    const knownVocab = searchVocabs(2)
    const studyingvocab = searchVocabs(1)
    const igonredVocab = searchVocabs(3)

    const known = countWords(knownVocab)
    const studying = countWords(studyingvocab)
    const ignored = countWords(igonredVocab)
    const newWords = all_word.length - (known + studying + ignored)
    
    return (
        <WordStatsContainer>
            <WordContainer>
                <NewWordIndicator/>
                <WordText>{newWords}</WordText>
            </WordContainer>
            <WordContainer>
                <StudyingdIndicator/>
                <WordText>{studying}</WordText>
            </WordContainer>
            <WordContainer>
                <KnownWordIndicator/>
                <WordText>{known}</WordText>
            </WordContainer>
        </WordStatsContainer>
    )
}

const WordStatsContainer = styled.div`
   
`

const WordContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: flex-start;
    grid-column-gap: 5px;
` 

const NewWordIndicator = styled.div`
    width: 2rem;
    height: 1.15rem;
    background-color: rgba(112, 161, 255, 0.5);
    border-color: #338fff;
    border-radius: 10px;
`

const WordText = styled.span`
    justify-content: center;
    font-size: .875rem !important;
`

const StudyingdIndicator = styled.div`
    width: 2rem;
    height: 1.15rem;
    background-color: rgba(255, 221, 89, 0.5);
    border-color: #338fff;
    border-radius: 10px;
`

const KnownWordIndicator = styled.div`
    width: 2rem;
    height: 1.15rem;
    background-color: white;
    border-color: #338fff;
    border-radius: 10px;
`