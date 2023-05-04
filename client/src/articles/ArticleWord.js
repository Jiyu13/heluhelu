import { useContext } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"

export function ArticleWord({ word, onWordClicked, setWordExistError }) {
    const {vocabularies} = useContext(UserContext)

    function handleClick(e) {
        setWordExistError(null)
        onWordClicked(e.target.innerHTML)
    }    

    const word_clean = word.toLowerCase().replace(/[^a-zā-ūʻ]+/g, "")       // replace all that's not [a-zā-ūʻ]
    const match = vocabularies?.filter((v) => v.hawaiian_clean.toLowerCase() === word_clean)[0]
    
    
    let styling = "rgba(112, 161, 255, 0.5)"
    if (match) {
        switch(match.status) {
            // studying
            case 1:
                styling = "rgba(255, 221, 89, 0.5)"
                break;
            // known
            case 2:
                styling = ""
                break;
            // ignored
            case 3:
                styling = ""
                break;
            default:
                styling = "rgba(112, 161, 255, 0.5)"
        }
    }

    return (
        <WordContainer onClick={handleClick} style={{backgroundColor: styling}}>
            {word}
        </WordContainer>
    )
}

const WordContainer = styled.div`
    border-radius: 5px;
    margin-right: 10px;
    padding: 2px 4px;
    display: inline-block;
    // background: rgba(50,100,150,.6)!important;
    vertical-align: top;
    font-size: 20px;
    &:hover {
        color: #fff;
        background-color: #bdc3c7;
        cursor: pointer;
    }
`
