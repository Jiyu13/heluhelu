import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import apiFetch from "../api/ApiFetch"
import { CustomWord } from "./CustomWord"

export function CustomWordLists(
    {customWords, setCustomWords}
    ) {

    return  (
        <ContainerBody>
            <VocabHeader>
                <IdColumn>ID</IdColumn>
                <WordColumn>Word</WordColumn>
                <CustomColumn>Custom Definition</CustomColumn>
                {/* <MarkTagColumn>Mark Tag</MarkTagColumn> */}
            </VocabHeader>

            {customWords?.map(c => {
                return <CustomWord key={c.id} word={c}/>
            })}
        </ContainerBody>
    )
}
const MarkTagColumn = styled.div`
    font-weight: bold;
`

const CustomColumn = styled.div`
    font-weight: bold;
    // padding-right: 2rem;
`

const WordColumn= styled.div`
    font-weight: bold;
    // padding-right: 2rem;
`

const IdColumn = styled.div`
    font-weight: bold;
    // padding-right: 2rem;
`

const VocabHeader = styled.div`
    box-sizing: border-box;
    width: 95%;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 0.5fr 1fr 4fr 2fr 0.6fr;
    grid-auto-flow: column;  //makes items flow across columns, into a single row
    grid-gap: 2rem;
    padding: 1.5rem 0.5rem 1rem;
`

const ContainerBody = styled.div`
    box-sizing: border-box;
    width: 90%;
    margin: 0 auto 30px;
    border-radius: 8px;
    padding-bottom: 1rem;
    background-color: #FDF8E8;
`