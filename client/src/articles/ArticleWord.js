import styled from "styled-components"

export function ArticleWord({ word, onWordClicked, setWordExistError }) {

    // console.log(word)
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
    border-radius: 5px;
    margin-right: 10px;
    padding: 2px 4px;
    display: inline-block;
    background: rgba(50,100,150,.6)!important;
    vertical-align: top;
    font-size: 20px;
    &:hover {
        color: #fff;
        background-color: #bdc3c7;
        cursor: pointer;
    }
`
