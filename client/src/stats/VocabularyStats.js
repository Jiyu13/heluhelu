import styled from "styled-components";


import { VocabularyLists } from "./VocabularyLists";
import { PageContainer } from "../styles/Container";

export function VocabularyStats() {

    return (
        <StatsContainer>
            <VocabularyLists/>      
        </StatsContainer>
    )
}

const StatsContainer = styled(PageContainer)`
    // margin: 90px auto 0;
    // margin: 0 auto;
    // padding-top: 90px;
`