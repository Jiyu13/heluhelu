import { ContainerBody, VocabHeader } from "../../stats/VocabularyLists"
import styled from "styled-components"
import { ArticlVocabs } from "./UniqueVocabs"

export function ArticleVocabsLists( props ){

    const {filterResults,} = props


    return(
        <Container>
            <Header>
                <NumberColumn>No.</NumberColumn>
                <WordColumn>Word</WordColumn>
                <TimesColumn>Frequency (Times)</TimesColumn>

            </Header>
            {/* 'unknownUnique &&' to handle undefined objects */}
            {filterResults && Object.entries(filterResults).map(([key, value], index) => {
                return <ArticlVocabs key={index} order={index} word={key} times={value}/>
            })}
        </Container>
    )
}


const NumberColumn = styled.div`
    font-weight: bold;
`
const WordColumn = styled.div`
    font-weight: bold;
`
const TimesColumn = styled.div`
    font-weight: bold;
`

const Header = styled(VocabHeader)`
    grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
    text-align: center;
`
const Container = styled(ContainerBody)`
    max-width: 800px;
`