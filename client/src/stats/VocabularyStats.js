import { Link } from "react-router-dom";
import styled from "styled-components";


import { StatsTitle } from "./MyStats";
import { VocabularyLists } from "./VocabularyLists";

export function VocabularyStats() {

    return (
        <StatsContainer>  
            <Header>
                <VocabStatsTitle>Vocabulary Stats</VocabStatsTitle>
            </Header>
            {/* <VocabStatsTitle>Vocabulary Stats</VocabStatsTitle>
            <Link to="/stats">Reading Stats</Link> */}
            <VocabularyLists/>
            
        </StatsContainer>
    )
}

const Header = styled.div`
    // display: flex;
    
`

const VocabStatsTitle = styled(StatsTitle)``

const StatsContainer = styled.div`
    // display: block;
    // justify-content:center;/]
`