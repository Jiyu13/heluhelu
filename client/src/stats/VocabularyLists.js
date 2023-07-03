import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import styled from "styled-components";
import { Vocabulary } from "./Vocabulary";

export function VocabularyLists() {
    const { vocabularies } = useContext(UserContext)

    return (
        <VocabListContainer>
            <VocabHeader>
                <IdColumn>ID</IdColumn>
                <WordColumn>Word</WordColumn>
                <DefinitionColumn>Definition</DefinitionColumn>
                <CustomColumn>Custom Definition</CustomColumn>
            </VocabHeader>

            {vocabularies?.map(v => {
                return <Vocabulary key={v.id} vocab={v}/>
            })}
        </VocabListContainer>
    )
}

const VocabListContainer = styled.div`
`

const VocabHeader = styled.div`
    box-sizing: border-box;
    width: 70%;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 0.5fr 1fr 4fr 2fr;
    grid-auto-flow: column;  //makes items flow across columns, ie into a single row
    border: 1px solid black;
    grid-gap: 0.25rem;
    padding: 1.5rem 1rem 1rem;

`

const IdColumn = styled.div``
const WordColumn= styled.div``
const DefinitionColumn = styled.div``
const CustomColumn = styled.div``
