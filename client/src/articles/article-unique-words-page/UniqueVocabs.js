import styled from "styled-components"

export function ArticlVocabs( {order, word, times } ) {
    return (
        <VocabContainer>
            <NumberColumn>{order+1}</NumberColumn>
            <WordColumn>{word}</WordColumn>
            <TimesColumn>{times}</TimesColumn>
        </VocabContainer>
    )
}

const VocabContainer = styled.div`
    box-sizing: border-box;
    width: 95%;
    max-width: 800px;
    display: grid;
    margin: 0.5rem auto;
    grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
    grid-auto-flow: column;  //makes items flow across columns, ie into a single row
    border: 1px solid #bdc3c7;
    border-radius: 8px;
    grid-gap: 0.25rem;
    padding: 1.5rem 0.5rem 1rem;
    text-align: center;

    &:hover {
        border: 2px solid #2c3e50;
    }

`
const NumberColumn = styled.div``
const WordColumn = styled.div``
const TimesColumn = styled.div``