import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"

export function ArticleUUID() {


    let { id} = useParams()
    const [sharedArticle, setSharedArticle] = useState("")

    useEffect(() => {
        fetch(`/article/share/${id}`)
        .then(res => res.json())
        .then(data => setSharedArticle(data))
    }, [id])
    
    
    return(
        <ShareContainer>
            <SharePageTitle>Share Article</SharePageTitle>
            <SharedArticleTitle>{sharedArticle.title}</SharedArticleTitle>
            <br/>
            <>Share this article with others!</>

            <ShareOption></ShareOption>
            <>Send direct link to share:</>
            <br/>
            <SharedLink type="text" value={`http://localhost:3000/article/share_receive/${sharedArticle.uuid}`}/>

        </ShareContainer>
    )
}


const ShareContainer = styled.div`
    text-align: center;
    margin: 0 auto;
    max-width: 800px;
    font-size: 20px;
    line-weight: 1.6;
    display: block;
`

const SharePageTitle = styled.h1`
    color: #222;
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