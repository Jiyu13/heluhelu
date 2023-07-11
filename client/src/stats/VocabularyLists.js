import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import styled from "styled-components";
import { Vocabulary } from "./Vocabulary";
import { Link } from "react-router-dom";
import { StatsNavigation, StatsTitle } from "./MyStats";
import { SubmitButtons } from "../components/Buttons";
import { VocabInfoTable } from "./VocabInfoTable";
import { useState } from "react";
import { useEffect } from "react";


export function VocabularyLists() {
    const { vocabularies } = useContext(UserContext)
    
    const [filterResults, setFilterResult] = useState(vocabularies)

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

    return (
        <PageContainer>
            {/* <VocabNavigation>
                <NavUnorderList>
                    <NavList>
                        <ListLink href="/stats">Reading Stats</ListLink>
                    </NavList>
                    <NavList>
                        <ListLink href="/stats/vocabularies">Vocabulary Stats</ListLink>
                    </NavList>
                </NavUnorderList>
            </VocabNavigation> */}
            <VocabStatsNavigation >
                <VocabStatsTitle>Vocabulary Stats</VocabStatsTitle>
                {/* <Link to="/stats">Reading Stats</Link> */}
                <Link to="/stats">
                    <ReadingStatsPage type="button" value="Reading Stats" />
                </Link>

            </VocabStatsNavigation>

            <VocabInfoTable 
                handleFilterAll={handleFilterAll}
                handleFilterKnown={handleFilterKnown}
                handleFilterStudying={handleFilterStudying}
            />
            
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


const ContainerBody = styled.div`
    box-sizing: border-box;
    width: 75%;
    margin: 0 auto 30px;
    border-radius: 8px;
    padding-bottom: 1rem;
    background-color: #FDF8E8;
`

const VocabHeader = styled.div`
    box-sizing: border-box;
    width: 95%;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 0.5fr 1fr 4fr 2fr 0.6fr;
    grid-auto-flow: column;  //makes items flow across columns, ie into a single row
    grid-gap: 0.25rem;
    padding: 1.5rem 1rem 1rem;
`

const IdColumn = styled.div`font-weight: bold;`
const WordColumn= styled.div`font-weight: bold;`
const DefinitionColumn = styled.div`font-weight: bold;`
const CustomColumn = styled.div`font-weight: bold;`
const MarkTagColumn = styled.div`font-weight: bold;`


// const VocabNavigation = styled.div`
//     box-sizing: border-box;
//     width: 75%;
//     margin 0 auto -1rem;
//     // border-bottom: 1px solid #bdc3c7;
// `

// const NavUnorderList = styled.ul`
//     list-style-position: inside;
//     padding-left: 0;
// `
// const NavList = styled.li`
//     border-sizing: border-box;
//     display: inline-block;
// `
// const ListLink = styled.a`
//     padding: 0.5rem 1.5rem;
//     border: 1px solid #bdc3c7;
//     text-decoration: none;
//     border-top-left-radius: 0.5rem;
//     border-top-right-radius: 0.5rem;
//     // margin-bottom: -1px;
// `