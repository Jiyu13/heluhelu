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

            <ContainerBody>
                <ArticleStats>
                    <TotalContainer>
                        <TotalWords style={{backgroundColor: "#b9d7e3"}}>{totalWords?.length} Total Words</TotalWords>
                        {/* <TotalWords>|</TotalWords> */}
                        <UniquelWords style={{backgroundColor: "#4ba67f"}}>{uniqueWords?.length} Unique Words</UniquelWords>
                    </TotalContainer>
                    
                    <NewWordsContainer>
                        <NewWords>New words ({Math.floor((newWords / totalWords?.length) * 100) }%): </NewWords>
                        <WordNumber>{newWords}</WordNumber>
                    </NewWordsContainer>

                    <KnownWordsContainer>
                        <KnownWords>Known words: </KnownWords>
                        <WordNumber>{totalKnowns?.length}</WordNumber>
                    </KnownWordsContainer>
                    

                    <StudyingWordsContainer>
                        <StudyingWords>Studying words: </StudyingWords>
                        <WordNumber>{totalStudyings?.length}</WordNumber>
                    </StudyingWordsContainer>

                    <IgnoredWordsContainer>
                        <IgnoredWords>Ignored words: </IgnoredWords>
                        <WordNumber>{totalIgnoreds?.length}</WordNumber>
                    </IgnoredWordsContainer>

                    <CustomWordsContainer>
                        <CustomWords>Custom words: </CustomWords>
                        <WordNumber>{totalCustoms?.length}</WordNumber>
                    </CustomWordsContainer>

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
    width: 300px;
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

const ButtonImage = styled.img`
    width: 20px;
    height: 20px;
`

const ContainerBody = styled.div`
    padding: 0 10px 20px;
`

const ArticleStats = styled.div``

const TotalContainer = styled.div`
    display: flex;
    width: 90%;
    margin: auto;
`

// const InfoContainer = styled.div``
// const ArticleTitle = styled.div``
const TotalWords = styled.div`
    padding: 10px 0;
    margin: 0 5px;
    text-align: center;
    width: 50%;
    border-radius: 8px;
`
const UniquelWords = styled.div`
    padding: 10px 0;
    margin: 0 5px;
    text-align: center;
    width: 50%;
    border-radius: 8px;

`
const WordNumber = styled(UniquelWords)`
    text-align: left;
`
const NewWordsContainer = styled(TotalContainer)`
`
const NewWords = styled(TotalWords)`
    text-align: right;
`

const KnownWordsContainer = styled(TotalContainer)``
const KnownWords = styled(TotalWords)`
    text-align: right;
`
const StudyingWordsContainer = styled(TotalContainer)``
const StudyingWords = styled(TotalWords)`
    text-align: right;
`
const IgnoredWordsContainer = styled(TotalContainer)``
const IgnoredWords = styled(TotalWords)`
    text-align: right;
`
const CustomWordsContainer = styled(TotalContainer)`
    border: none;
`
const CustomWords = styled(TotalWords)`
    text-align: right;
`





