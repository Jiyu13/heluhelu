import styled from "styled-components"

export function ArticleWord({ word, onWordClicked, setWordExistError }) {


    function handleClick(e) {
        setWordExistError(null)
        onWordClicked(e.target.id)
    }    

    return (
        <WordContainer id={word} onClick={handleClick}>
            {word}
        </WordContainer>

    )
}

const WordContainer = styled.div`
    border-radius: 10px;
    padding: 8px;
    display: inline-block;
    &:hover {
        color: #fff;
        background-color: #bdc3c7;
        cursor: pointer;
    }
`
