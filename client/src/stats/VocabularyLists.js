import { useState, useEffect } from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { Vocabulary } from "./Vocabulary";
import { StatsNavigation, StatsTitle } from "./MyStats";
import { SubmitButtons } from "../styles/Buttons";
import { VocabInfoTable } from "./VocabInfoTable";

import { DeviceSize } from "../responsive";
import { MobileVocabularyTable } from "./MobileVocabularyTable";

import apiFetch from "../api/ApiFetch";
import { SkeletonVocabStatsList } from "../skeleton-screens/SkeletonVocabStatsList";

export function VocabularyLists() {
    const [isLoading, setLoading] = useState(false)
    const [filterResults, setFilterResult] = useState(null)
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile})


    const [vocabStats, setVocabStats] = useState(null)

    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            try {
                const response = await apiFetch("/vocabularies_translations")
                const data = await response.json()
                setVocabStats(data)
                setFilterResult(data)
                setLoading(false)
            } catch(error) {
                console.log("Error fetching data", error)
            } 

        }
        fetchData()
    }, [])


    function handleFilterKnown() {
        const result = vocabStats?.filter(v => v["vocabulary"]["status"] === 2)
        setFilterResult(result)
    }

    function handleFilterStudying() {
        const result = vocabStats?.filter(v => v["vocabulary"]["status"] === 1)
        setFilterResult(result)
    }

    function handleFilterAll() {
        setFilterResult(vocabStats)
    }


    return (
        <PageContainer>
            {isMobile && (
                <div style={{textAlign: "center"}}>
                    
                        <Link to="/stats">
                            <ReadingStatsPage type="button" value="Reading Stats" />
                        </Link>
                
                </div>
             )}
            

            <VocabStatsNavigation >
                <VocabStatsTitle>Vocabulary Stats</VocabStatsTitle>
                {!isMobile && (
                    <Link to="/stats">
                        <ReadingStatsPage type="button" value="Reading Stats" />
                    </Link>
                )}
                

            </VocabStatsNavigation>

            {isMobile ? 
                <MobileVocabularyTable 
                    handleFilterAll={handleFilterAll}
                    handleFilterKnown={handleFilterKnown}
                    handleFilterStudying={handleFilterStudying}
                />
                :
                <VocabInfoTable 
                    handleFilterAll={handleFilterAll}
                    handleFilterKnown={handleFilterKnown}
                    handleFilterStudying={handleFilterStudying}
                />
            }
    
            <ContainerBody>
                <VocabHeader>
                    <IdColumn>ID</IdColumn>
                    <WordColumn>Word</WordColumn>
                    <DefinitionColumn>Definition</DefinitionColumn>
                    <CustomColumn>{isMobile ? "Custom" : "Custom Definition"}</CustomColumn>
                    <MarkTagColumn>{isMobile ? "Mark" : "Mark Tag"}Mark Tag</MarkTagColumn>
                </VocabHeader>
                {
                    !isLoading && (
                        <>
                            {filterResults?.map((v, index) => {
                                return <Vocabulary key={index} vocab={v}/>
                            })}
                        </>
                    )
                }
                { isLoading && (<SkeletonVocabStatsList />)}
                
            </ContainerBody>        
        </PageContainer>
    )
}

const PageContainer = styled.div`
    box-sizing: border-box;
`

const VocabStatsNavigation = styled(StatsNavigation)``
const VocabStatsTitle = styled(StatsTitle)``
const ReadingStatsPage = styled(SubmitButtons)``


export const ContainerBody = styled.div`
    box-sizing: border-box;
    width: 90%;
    margin: 0 auto;
    border-radius: 8px;
    padding-bottom: 1rem;
    background-color: #FDF8E8;
    color: #000;
`

export const VocabHeader = styled.div`
    box-sizing: border-box;
    width: 95%;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 0.5fr 1fr 4fr 2fr 0.6fr;
    grid-auto-flow: column;  //makes items flow across columns, into a single row
    grid-gap: 0.5rem;
    padding: 1.5rem 0.5rem 1rem;
`

const IdColumn = styled.div`
    font-weight: bold;
    // padding-right: 2rem;
`
const WordColumn= styled.div`
    font-weight: bold;
    // padding-right: 2rem;
`
const DefinitionColumn = styled.div`
    font-weight: bold;
    padding-right: 2rem;
`
const CustomColumn = styled.div`
    font-weight: bold;
    // padding-right: 2rem;
`
const MarkTagColumn = styled.div`
    font-weight: bold;
`
