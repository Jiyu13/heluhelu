import styled from "styled-components"

export function CustomWord({ word }) {
    return (
        <WordContainer>
            <IdColumn>{word.id}</IdColumn>
            <WordColumn>{word["word"]}</WordColumn>
            <DefinitionColumn>{word["translation"]}</DefinitionColumn>
            {/* <MarkTagColumn>
                Customized
            </MarkTagColumn> */}
        
        </WordContainer>
    )
}

const WordContainer = styled.div`
    box-sizing: border-box;
    width: 95%;
    display: grid;
    margin: 0.5rem auto;
    grid-template-columns: 0.5fr 1fr 4fr 2fr 0.6fr;
    grid-auto-flow: column;  //makes items flow across columns, ie into a single row
    border: 1px solid #bdc3c7;
    border-radius: 8px;
    grid-gap: 2rem;
    padding: 1.5rem 0.5rem 1rem;

    &:hover {
        border: 2px solid #2c3e50;
    }
`

const IdColumn = styled.div`
`
const WordColumn= styled.div`
`
const DefinitionColumn = styled.div`
`

const MarkTagColumn = styled.div``
