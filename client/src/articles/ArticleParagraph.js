import styled from "styled-components"
import { ArticleWord } from "./ArticleWord"

export function ArticleParagraph({words, onWordClicked}) {

    return (
        <ParagraphContainer>
                {words.map(word => <ArticleWord key={word.id} word={word} onWordClicked={onWordClicked}/>)}
        </ParagraphContainer>
    )
}

const ParagraphContainer = styled.div`
    border-radius: 10px;
    margin: 18px 0;
`
