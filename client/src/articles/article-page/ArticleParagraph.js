import styled from "styled-components"
import { ArticleWord } from "./ArticleWord"

export function ArticleParagraph({words, onWordClicked, setWordExistError}) {

    return (
        <ParagraphContainer>
                {words.map((word, index) => 
                    <ArticleWord 
                        key={index} 
                        word={word} 
                        onWordClicked={onWordClicked}
                        setWordExistError={setWordExistError}
                    />
                )}
        </ParagraphContainer>
    )
}

const ParagraphContainer = styled.div`
    border-radius: 10px;
    margin: 18px 0;
`
