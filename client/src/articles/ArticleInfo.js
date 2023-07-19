import { useState, useEffect } from "react"

import styled from "styled-components"
import apiFetch from "../api/ApiFetch"

import close_btn from "../assets/images/close_btn.svg"


export function ArticleInfo( {article, setShowInfo, showInfo} ) {

    const [totalWords, setTotalWords] = useState(null)
    const [uniqueWords, setUniqueWords] = useState(null)
    const [totalCustoms, setTotalCustoms] = useState(null)
    const [totalStudyings, setTotalStudyings] = useState(null)
    const [totalKnowns, setTotalKnowns] = useState(null)
    const [totalIgnoreds, setTotalIgnoreds] = useState(null)

    useEffect(() => {
        apiFetch(`/articles/${article.id}/info`)
        .then(res => res.json())
        .then(data => {
            setTotalWords(data["total_words"])
            setUniqueWords(data["unique_words"])
            setTotalCustoms(data["total_custom"])
            setTotalStudyings(data["studying_total"])
            setTotalKnowns(data["known_total"])
            setTotalIgnoreds(data["ingored_total"])
        
        })
    }, [article])

    function handleClose() {
        setShowInfo(!showInfo)
    }
    const newWords = totalWords?.length - totalKnowns?.length - totalStudyings?.length - totalIgnoreds?.length
    
    return (
        <PopupContainer>
            <ContainerHeader>
                <Title>
                    {article?.title}
                </Title>

                <CloseButton onClick={handleClose}>
                    <ButtonImage src={close_btn} alt="close icon"/>
                </CloseButton>
            </ContainerHeader>

            <Divider/>

            <ContainerBody>
                <ArticleStats>
                    <TotalWords>Total words: {totalWords?.length}</TotalWords>
                    <TotalWords>Unique words: {uniqueWords?.length}</TotalWords>
                    <NewWords>New Words: {newWords}</NewWords>
                    <KnownWords>Known words: {totalKnowns?.length}</KnownWords>
                    <StudyingWords>Studying Words: {totalStudyings?.length}</StudyingWords>
                    <IgnoredWords>Ignored Words: {totalIgnoreds?.length}</IgnoredWords>
                    <CustomWords>Custom Words: {totalCustoms?.length}</CustomWords>
                </ArticleStats>
            </ContainerBody>
        </PopupContainer>
    
    // <InfoContainer>
    //     <ArticleTitle></ArticleTitle>
    //     <TotalWords></TotalWords>
    //     <NewWords></NewWords>
    //     <KnownWords></KnownWords>
    //     <StudyingWords></StudyingWords>
    //     <CustomWords></CustomWords>
    // </InfoContainer>
    )
}

const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    z-index: 10;
    width: 350px;
    max-width: 80%;
`
const ContainerHeader = styled.div`
    padding: 20px 20px;
    display: flex;
    justify-content: space-between;
    align-item: center;

`
const Title = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin: auto;
`
const CloseButton = styled.button`
    cursor: pointer;    
    float: right;
    border: none;
    background-color: transparent;
`

const Divider = styled.hr`
    width: 90%;
    text-align: center;
    background-color: black;
    height: 1px;
`

const ButtonImage = styled.img`
    width: 20px;
    height: 20px;
`

const ContainerBody = styled.div`
    padding: 10px 20px;
`

const ArticleStats = styled.div``

// const InfoContainer = styled.div``
// const ArticleTitle = styled.div``
const TotalWords = styled.div``
const NewWords = styled.div``
const KnownWords = styled.div``
const StudyingWords = styled.div``
const IgnoredWords = styled.div``
const CustomWords = styled.div``





