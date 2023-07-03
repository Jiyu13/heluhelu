import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import styled from "styled-components";
import { Vocabulary } from "./Vocabulary";
import { Link } from "react-router-dom";
import { StatsNavigation, StatsTitle } from "./MyStats";
import { SubmitButtons } from "../components/Buttons";

export function VocabularyLists() {
    const { vocabularies } = useContext(UserContext)

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
            
            <ContainerBody>
                <VocabHeader>
                    <IdColumn>ID</IdColumn>
                    <WordColumn>Word</WordColumn>
                    <DefinitionColumn>Definition</DefinitionColumn>
                    <CustomColumn>Custom Definition</CustomColumn>
                </VocabHeader>

                {vocabularies?.map(v => {
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
    border: 1px solid #bdc3c7;
    border-radius: 8px;
    padding-bottom: 1rem;
    // background-color: #ecf0f1;
`

const VocabHeader = styled.div`
    box-sizing: border-box;
    width: 95%;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 0.5fr 1fr 4fr 2fr;
    grid-auto-flow: column;  //makes items flow across columns, ie into a single row
    grid-gap: 0.25rem;
    padding: 1.5rem 1rem 1rem;
    // border-top: none;
    // border: 1px solid #bdc3c7;

`

const IdColumn = styled.div``
const WordColumn= styled.div``
const DefinitionColumn = styled.div``
const CustomColumn = styled.div``


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