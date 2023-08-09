import { useState, useEffect } from "react"

import styled from "styled-components"
import apiFetch from "../../api/ApiFetch"

import close_btn from "../../assets/images/close_btn.svg"
import {DoughnutRecharts} from "./DoughnutRecharts"


export function ArticleInfo( {article, setShowInfo, showInfo} ) {

    const [totalWords, setTotalWords] = useState(null)
    const [uniqueWords, setUniqueWords] = useState(null)
    // eslint-disable-next-line
    const [totalCustoms, setTotalCustoms] = useState(null)
    const [totalStudyings, setTotalStudyings] = useState(null)
    const [totalKnowns, setTotalKnowns] = useState(null)
    const [totalIgnoreds, setTotalIgnoreds] = useState(null)

    const [studyingUnique, setStudyingUnique] = useState(null)
    const [knownUnique, setKnownUnique] = useState(null)
    const [ignoredUnique, setIgnoredUnique] = useState(null)

    const [newWords, setNewWords] = useState(null)
    const [newUnique, setNewUnique] = useState(null)

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

            setStudyingUnique(data["studying_unique"])
            setKnownUnique(data["known_unique"])
            setIgnoredUnique(data["ignored_unique"])
            
            setNewWords(data["new_words"])
            setNewUnique(data["new_unique"])
        })
    }, [article])

    function handleClose() {
        setShowInfo(!showInfo)
    }
    
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

            <ChartContainer>
                <DoughnutRecharts
                    totalWords={totalWords}
                    totalKnowns={totalKnowns}
                    totalStudyings={totalStudyings}
                    totalIgnoreds={totalIgnoreds}
                    newWords={newWords}
                    newUnique={newUnique}
                    uniqueWords={uniqueWords}
                    studyingUnique={studyingUnique}
                    knownUnique={knownUnique}
                    ignoredUnique={ignoredUnique}
                />
            </ChartContainer>

            {/* <CustomWordsContainer>
                <CustomWords>Custom words: </CustomWords>
                <WordNumber>{totalCustoms?.length}</WordNumber>
            </CustomWordsContainer> */}
        </PopupContainer>
    )
}
const ChartContainer = styled.div`
    width: 300px;
    height: 200px;
    display: flex;
    margin: 0px auto 20px;

`
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
    padding: 20px;
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

// const CustomWordsContainer = styled(TotalContainer)`
//     border: none;
//     margin: 5px auto;
// `
// const CustomWords = styled(TotalWords)`
//     text-align: right;
// `





