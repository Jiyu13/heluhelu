import { useContext } from "react"
import styled from "styled-components"
import { UserContext } from "../../components/UserContext"

export function ProgressBar({article, getCurrentPage}) {

    const { calculatePages, splitText} = useContext(UserContext)

    return (
        <>
            <CompletionBar>
                <CompletionBarProgress style={{width: `${getCurrentPage(article) * 100 }%`}}/>
            </CompletionBar>
            <CompletionText>
                {calculatePages(splitText(article))} pgs
            </CompletionText>
        </>
        
    )
}

const CompletionBar = styled.div`
    display: inline-block;
    backgoround-color: rgba(0,0,0,.2);
    border: 1px solid #aaa;

    // control the length of the bar
    width: 100%;
    max-width: 150px;
    padding: 0;
    margin: 8px 0 0;
    border-radius: 5px;
`

const CompletionBarProgress = styled.div`
    width: 1%;
    background-color: rgba(255,255,255,.4);
    max-width: 150px;
    padding: 0;
    margin: 0;
    border-radius: 5px;
    height: 5px;
`

const CompletionText = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: #aaa!important;
    line-weight: 1.6;
    margin: 0 15px;
`