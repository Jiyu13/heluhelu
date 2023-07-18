import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import apiFetch from "../api/ApiFetch"

export function Vocabulary( {vocab} ) {
    const [dictionaryDefinition, setDefinition] = useState(null)
    const [customDefinition, setCustomDefinition] = useState(null)


    const word = vocab["hawaiian_clean"]
    let tag
    if (vocab["status"] === 2) {
        tag =  "Known"
    } else if (vocab["status"] === 1) {
        tag =  "Studying"
    } else if (vocab["status"] === 3) {
        tag = "Ignored"
    }

    
    useEffect(() => {
        apiFetch(`/search/${word}`)
        .then(res => res.json())
        .then(v => {
            setDefinition(v.dictionary.filter(v => 
                v["hawaiian_clean"] === word
            ))
            setCustomDefinition(v["custom"]["translation"])
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
                    customDefinition ? customDefinition : "-"
                }
            </CustomColumn>

            <MarkTagColumn>
                {tag}
            </MarkTagColumn>
        </VocabContainer>
    )
}

const VocabContainer = styled.div`
    box-sizing: border-box;
    width: 95%;
    display: grid;
    margin: 0.5rem auto;
    grid-template-columns: 0.5fr 1fr 4fr 2fr 0.6fr;
    grid-auto-flow: column;  //makes items flow across columns, ie into a single row
    border: 1px solid #bdc3c7;
    border-radius: 8px;
    grid-gap: 0.25rem;
    padding: 1.5rem 0.5rem 1rem;

    &:hover {
        border: 2px solid #2c3e50;
    }
`
const IdColumn = styled.div`
    // padding-right: 2rem;
`
const WordColumn= styled.div`
    // padding-right: 2rem;
`
const DefinitionColumn = styled.div`
    padding-right: 2rem;
`
const CustomColumn = styled.div`
    // padding-right: 2rem;
`

const MarkTagColumn = styled.div``
