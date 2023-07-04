import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import apiFetch from "../api/ApiFetch"

export function Vocabulary( {vocab} ) {
    const [dictionaryDefinition, setDefinition] = useState(null)
    const [customDefinition, setCcustomDefinition] = useState(null)


    const word = vocab["hawaiian_clean"]

    useEffect(() => {
        apiFetch(`/search/${word}`)
        .then(res => res.json())
        .then(v => {
            setDefinition(v.dictionary.filter(v => 
                v["hawaiian_clean"] === word
            ))
            setCcustomDefinition(v["custom"])
        })
    }, [word])


    return (
        <VocabContainer>
            <IdColumn>{vocab.id}</IdColumn>
            <WordColumn>{vocab["hawaiian_clean"]}</WordColumn>
            <DefinitionColumn>
                {
                    dictionaryDefinition?.map((d, idx) => {
                        return (
                            <div key={idx}>
                                <div>{d["translation"]}</div>
                                <br/>
                            </div>
                            
                        )
                    })
                }
            </DefinitionColumn>
            <CustomColumn>
                {
                    customDefinition ? customDefinition["word"] : "-"
                }
            </CustomColumn>
        </VocabContainer>
    )
}

const VocabContainer = styled.div`
    box-sizing: border-box;
    width: 95%;
    display: grid;
    margin: 0.5rem auto;
    grid-template-columns: 0.5fr 1fr 4fr 2fr;
    grid-auto-flow: column;  //makes items flow across columns, ie into a single row
    border: 1px solid #bdc3c7;
    border-radius: 8px;
    grid-gap: 0.25rem;
    padding: 1.5rem 1rem 1rem;

    &:hover {
        border: 2px solid #2c3e50;
    }
`
const IdColumn = styled.div`
    padding-right: 2rem;
`
const WordColumn= styled.div`
    padding-right: 2rem;
`
const DefinitionColumn = styled.div`
    padding-right: 2rem;
`
const CustomColumn = styled.div`
    padding-right: 2rem;
`
