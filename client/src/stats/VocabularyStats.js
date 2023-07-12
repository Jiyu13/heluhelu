import styled from "styled-components";


import { VocabularyLists } from "./VocabularyLists";

export function VocabularyStats() {

    return (
        <StatsContainer>
            <VocabularyLists/>      
        </StatsContainer>
    )
}

const StatsContainer = styled.div`
    margin: 90px auto 0;
`