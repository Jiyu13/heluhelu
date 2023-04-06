import styled from "styled-components"

export function ArticleWord({word}) {

    console.log(word)
    return (
        <WordContainer>
            {word}            
        </WordContainer>

    )
}

const WordContainer = styled.div`
    border-radius: 10px;
    padding: 4px;
    display: inline-block;
    &:hover {
        color: #fff;
        background-color: #bdc3c7;
    }
`
