import styled from "styled-components"
import { TranslationSentences } from "./TranslationSentences"

export function Vocabulary( {vocab} ) {
    const translations = vocab["translation"].split("\n").filter(t => t !== "")
    const customs = vocab["custom"].split(';')
    console.log(customs)
    let tag
    if (vocab["vocabulary"]["status"] === 2) {
        tag =  "Known"
    } else if (vocab["vocabulary"]["status"] === 1) {
        tag =  "Studying"
    } else if (vocab["vocabulary"]["status"] === 3) {
        tag = "Ignored"
    }

    return (
        <VocabContainer>
            <IdColumn>{vocab["vocabulary"].id}</IdColumn>
            <WordColumn>{vocab["vocabulary"]["hawaiian_clean"]}</WordColumn>
            <DefinitionColumn>
            
                <div>
                    {translations?.map((sentence, index) => {
                            return <TranslationSentences key={index} sentence={sentence}/>
                        }
                    )} 
                </div>
            </DefinitionColumn>
            <CustomColumn>
                {customs?.map((custom, index) => {
                    return <div key={index}>{custom};</div>
                })}
            </CustomColumn>

            <MarkTagColumn>
                {tag}
            </MarkTagColumn>
        </VocabContainer>
    )
}

const VocabContainer = styled.div`
    box-sizing: border-box;
    width: 95%;
    display: grid;
    margin: 0.5rem auto;
    grid-template-columns: 0.5fr 1fr 4fr 2fr 0.6fr;
    grid-auto-flow: column;  //makes items flow across columns, ie into a single row
    border: 1px solid #bdc3c7;
    border-radius: 8px;
    grid-gap: 0.25rem;
    padding: 1.5rem 0.5rem 1rem;

    &:hover {
        border: 2px solid #2c3e50;
    }
`
const IdColumn = styled.div`
`
const WordColumn= styled.div`
`
const DefinitionColumn = styled.div`
    padding-right: 2rem;
`
const CustomColumn = styled.div`
`

const MarkTagColumn = styled.div``
