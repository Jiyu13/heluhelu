import { useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"

export function ArticleUUID() {

    const [copied, setCopied] = useState(false)

    let { article_title, uuid } = useParams()

    const url = window.location.protocol + "//" + window.location.host + `/article/share_receive/${uuid}`
    
    console.log(uuid)

    const handleFocus = (e) => {
        e.target.select();
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(function() {
            setCopied(false)
        }, 1000)
    }
    
    return(
        <ShareContainer>
            <SharePageTitle>Share Article</SharePageTitle>
            <SharedArticleTitle>{article_title}</SharedArticleTitle>
            <br/>
            <>Share this article with others!</>

            <ShareOption></ShareOption>
            <>Send direct link to share:</>
            <br/>
            <SharedLink type="text" value={url} onFocus={ handleFocus} readOnly/>
            <>{copied ? "Copied!" : ""}</>

        </ShareContainer>
    )
}


const ShareContainer = styled.div`
    text-align: center;
    // margin: 90px auto 0;
    max-width: 800px;
    font-size: 20px;
    line-weight: 1.6;
    display: block;
    height: 100vh;
    margin: 0 auto;
    padding-top: 90px;
    width: 95%;
`

const SharePageTitle = styled.h1`
    color: inherit;
    margin-top: 36px;
    margin-bottom: 36px;
    font-family: readex pro, arial, sans-serifs;
    font-size: 48px;
    text-align: center;
    display: block;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
`

const SharedArticleTitle = styled.h2`
`

const ShareOption = styled.h2`
    border-top: 4px solid rgb(204, 204, 204);
    padding-top: 28px;
`

const SharedLink = styled.input`
    width: 95%;
    max-width: 400px;
`