import styled from "styled-components"


export function TranslationWord( {word} ) {

    // console.log(word)
    return (
        <WordItem key={word.id}>
            <Word>{word.hawaiian} :</Word>
            <Translation>{word.translation}</Translation>
            <hr/>
        </WordItem>
    )
}

const WordItem = styled.div``

const Word = styled.div`
    font-weight: bold;
    color: rgb(255, 255, 255);
`

const Translation = styled.div``
