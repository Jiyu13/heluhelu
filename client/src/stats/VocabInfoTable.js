import styled from "styled-components"
import filter_24dp from "../assets/images/filter_24dp.svg"
import { useContext } from "react"
import { UserContext } from "../components/UserContext"
// import { useEffect } from "react"
// import apiFetch from "../api/ApiFetch"
// import { useState } from "react"



export function VocabInfoTable( props ) {

    const {
        handleFilterAll, handleFilterKnown, handleFilterStudying, customWords, 
        // setCustomWords, handleGetCustomWords
    } = props
    
    const { vocabularies } = useContext(UserContext)

    // useEffect(() => {
    //     apiFetch("/user_words")
    //     .then(res => res.json())
    //     .then(data => setCustomWords(data))
    // }, [])

    function searchVocabs(status) {
        return vocabularies?.filter(v => v["status"] === status).map(v => v["hawaiian_clean"].toLowerCase())
    }

    console.log(customWords)
    const knownVocab = searchVocabs(2)?.length
    const studyingvocab = searchVocabs(1)?.length
    return  (
        <InfoContainer>
            <FilterBy>
                <img src={filter_24dp} alt="filter icon"/>
                <FilterByText style={{fontSize: "3px"}}>
                    Filter By:
                </FilterByText>
                
            </FilterBy>
            <InfoItem href="#" onClick={handleFilterAll}>
                <AllWordIndicator/>
                <WordText>All Vocabs</WordText>
                <WordCount>{vocabularies?.length}</WordCount>
            </InfoItem>
            <InfoItem href="#" onClick={handleFilterKnown}>
                <KnownWordIndicator/>
                <WordText>Known</WordText>
                <WordCount>{knownVocab}</WordCount>
            </InfoItem>
            <InfoItem href="#" onClick={handleFilterStudying}>
                <StudyingdIndicator/>
                <WordText>Studying</WordText>
                <WordCount>{studyingvocab}</WordCount>
            </InfoItem>

            {/* <InfoItem onClick={handleGetCustomWords}>
                <CustomWordsIndicator/>
                <WordText>Custom Words</WordText>
                <WordCount>{customWords?.length}</WordCount>
            </InfoItem> */}
        </InfoContainer>

    )
}

const InfoContainer = styled.div`
    box-sizing: border-box;
    width: 90%;
    margin: 15px auto 0px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    background-image:  linear-gradient(to right, #FDAB73, #AEC28F);
    border-radius: 8px;
`
const FilterBy = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const FilterByText = styled.span`
    margin-left: 5px;
    justify-content: center;
    font-size: .875rem !important;
    font-weight: bold;
    white-space: nowrap; // make "All Words" stay in the same line
`

const InfoItem = styled.a`
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    grid-column-gap: 5px;
    justify-content: center;
    align-items: center;
    margin: 0px auto;
    color: grey;
    cursor: pointer;
    text-decoration: none;
    height: 60px;

    &:focus {
        color: black; 
        border-top: 3px solid black;
    }
` 

const WordCount = styled.div`
    margin-left: 10px;
`

const WordText = styled.span`
    justify-content: center;
    font-size: .875rem !important;
    font-weight: bold;
    white-space: nowrap; // make "All Words" stay in the same line
`

const AllWordIndicator  = styled.div`
    width: 2rem;
    height: 1.15rem;
    background-color: #409078;
    border-color: #338fff;
    border-radius: 10px;
`

const KnownWordIndicator = styled.div`
    width: 2rem;
    height: 1.15rem;
    background-color: #fff; // rgba(112, 161, 255, 0.5)
    border-color: #338fff;
    border-radius: 10px;
`

const StudyingdIndicator = styled.div`
    width: 2rem;
    height: 1.15rem;
    background-color: rgba(255, 221, 89, 0.5);
    border-color: #338fff;
    border-radius: 10px;
`

const CustomWordsIndicator = styled.div`
    width: 2rem;
    height: 1.15rem;
    background-color: rgba(255, 221, 89, 0.5);
    border-color: #338fff;
    border-radius: 10px;
`