import styled from "styled-components"
import { ArticleWord } from "./ArticleWord"

export function ArticleParagraph({words}) {

    console.log(words)
    return (
        <ParagraphContainer>
                {words.map(word => <ArticleWord word={word}/>)}
        </ParagraphContainer>

    )
}

const ParagraphContainer = styled.div`
    border-radius: 10px;
    margin: 18px 0;
`
