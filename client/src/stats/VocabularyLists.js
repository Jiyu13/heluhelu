import { useContext, useState, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { Vocabulary } from "./Vocabulary";
import { StatsNavigation, StatsTitle } from "./MyStats";
import { SubmitButtons } from "../components/Buttons";
import { VocabInfoTable } from "./VocabInfoTable";

import { DeviceSize } from "../responsive";
import { MobileVocabularyTable } from "./MobileVocabularyTable";


export function VocabularyLists() {
    const { vocabularies, } = useContext(UserContext)
    const [filterResults, setFilterResult] = useState(vocabularies)
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile})



    useEffect(() => {
          setFilterResult(vocabularies)
    }, [vocabularies])

    function handleFilterKnown() {
        const result = vocabularies?.filter(v => v["status"] === 2)
        setFilterResult(result)
    }

    function handleFilterStudying() {
        const result = vocabularies?.filter(v => v["status"] === 1)
        setFilterResult(result)
    }

    function handleFilterAll() {
        setFilterResult(vocabularies)
    }

    // function handleSelectFilter(tag) {
    //     if (tag === "All Vocabs") {
    //         handleFilterAll()
    //     } else if (tag === "Known") {
    //         handleFilterKnown()
    //     } else if (tag === "Studying") {
    //         handleFilterStudying()
    //     }
    // }

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
                    // handleSelectFilter={handleSelectFilter}
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
                    <CustomColumn>Custom Definition</CustomColumn>
                    <MarkTagColumn>Mark Tag</MarkTagColumn>
                </VocabHeader>

                {filterResults?.map(v => {
                    return <Vocabulary key={v.id} vocab={v}/>
                })}
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
    margin: 0 auto 30px;
    border-radius: 8px;
    padding-bottom: 1rem;
    background-color: #FDF8E8;
`

export const VocabHeader = styled.div`
    box-sizing: border-box;
    width: 95%;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 0.5fr 1fr 4fr 2fr 0.6fr;
    grid-auto-flow: column;  //makes items flow across columns, into a single row
    grid-gap: 0.25rem;
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
