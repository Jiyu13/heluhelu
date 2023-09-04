import { useContext } from "react"
import styled from "styled-components"
import { UserContext } from "../../components/UserContext"

export function ProgressBar({article, getCurtPage}) {

    const { calculatePages, splitText} = useContext(UserContext)

    const total_pages = calculatePages(splitText(article))
    const completed = article["current_page"] + 1

    return (
        <>
            <CompletionBar>
                <CompletionBarProgress style={{width: `${(completed / total_pages) * 100}%`}}/>
            </CompletionBar>
            <CompletionText>
                {total_pages} pgs
            </CompletionText>
        </>
        
    )
}

const CompletionBar = styled.div`
    display: inline-block;
    background-color: rgba(0,0,0,.2);
    border: 1px solid #aaa;

    // control the length of the bar
    width:30%;
    padding: 0;
    margin: 8px 0 0;
    border-radius: 5px;
`

const CompletionBarProgress = styled.div`
    // background-color: rgba(255,255,255,.4);
    background-color: green;
    padding: 0;
    margin: 0;
    border-radius: 5px;
    height: 5px;
`

const CompletionText = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: inherit
    line-weight: 1.6;
    margin: 0 15px;
`